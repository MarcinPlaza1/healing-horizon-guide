
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import DailyInspiration from "@/components/DailyInspiration";
import ProgressPreview from "@/components/ProgressPreview";
import DailyCheckin from "@/components/DailyCheckin";
import MoodChart from "@/components/MoodChart";
import MindfulnessTracker from "@/components/MindfulnessTracker";
import HealthSummary from "@/components/HealthSummary";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Json } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Settings2, Grip } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardPreferences {
  widget_order: string[];
  favorite_widgets: string[];
  expanded_widgets: string[];
}

const DEFAULT_PREFERENCES: DashboardPreferences = {
  widget_order: ["health_summary", "daily_inspiration", "progress", "daily_checkin", "mood_chart", "mindfulness"],
  favorite_widgets: ["health_summary", "mood_chart", "mindfulness"],
  expanded_widgets: ["health_summary"]
};

interface WidgetConfig {
  id: string;
  title: string;
  component: React.ComponentType;
  section: "progress" | "learning" | "notifications";
}

const widgetConfigs: WidgetConfig[] = [
  { id: "health_summary", title: "Health Overview", component: HealthSummary, section: "progress" },
  { id: "daily_inspiration", title: "Daily Inspiration", component: DailyInspiration, section: "learning" },
  { id: "progress", title: "Progress Tracker", component: ProgressPreview, section: "progress" },
  { id: "daily_checkin", title: "Daily Check-in", component: DailyCheckin, section: "notifications" },
  { id: "mood_chart", title: "Mood Tracker", component: MoodChart, section: "progress" },
  { id: "mindfulness", title: "Mindfulness Session", component: MindfulnessTracker, section: "learning" },
];

const Dashboard = () => {
  const [preferences, setPreferences] = useState<DashboardPreferences>(DEFAULT_PREFERENCES);
  const [activeSection, setActiveSection] = useState<string>("progress");
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchPreferences = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('dashboard_preferences')
        .eq('id', user.id)
        .single();

      if (data?.dashboard_preferences) {
        const prefs = data.dashboard_preferences as unknown as DashboardPreferences;
        if (
          Array.isArray(prefs.widget_order) &&
          Array.isArray(prefs.favorite_widgets) &&
          Array.isArray(prefs.expanded_widgets)
        ) {
          setPreferences(prefs);
        }
      }
    };

    fetchPreferences();
  }, []);

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const newOrder = Array.from(preferences.widget_order);
    const [reorderedItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, reorderedItem);

    const newPreferences: DashboardPreferences = {
      ...preferences,
      widget_order: newOrder,
    };

    setPreferences(newPreferences);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const jsonPreferences = newPreferences as unknown as Json;

    const { error } = await supabase
      .from('profiles')
      .update({ dashboard_preferences: jsonPreferences })
      .eq('id', user.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error saving preferences",
        description: "Your widget order couldn't be saved. Please try again.",
      });
    }
  };

  const toggleFavorite = async (widgetId: string) => {
    const newFavorites = preferences.favorite_widgets.includes(widgetId)
      ? preferences.favorite_widgets.filter(id => id !== widgetId)
      : [...preferences.favorite_widgets, widgetId];

    const newPreferences = {
      ...preferences,
      favorite_widgets: newFavorites,
    };

    setPreferences(newPreferences);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const jsonPreferences = newPreferences as unknown as Json;

    const { error } = await supabase
      .from('profiles')
      .update({ dashboard_preferences: jsonPreferences })
      .eq('id', user.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error saving preferences",
        description: "Your widget preferences couldn't be saved. Please try again.",
      });
    }
  };

  const filteredWidgets = preferences.widget_order
    .map(id => widgetConfigs.find(config => config.id === id))
    .filter(widget => widget && (
      activeSection === "all" || 
      widget.section === activeSection
    ));

  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground/90 mb-4 md:mb-0">
            Your Wellness Dashboard
          </h1>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {["progress", "learning", "notifications"].map((section) => (
              <Button
                key={section}
                variant={activeSection === section ? "default" : "outline"}
                onClick={() => setActiveSection(section)}
                className="capitalize whitespace-nowrap"
              >
                {section}
              </Button>
            ))}
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="widgets">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredWidgets.map((widget, index) => {
                  if (!widget) return null;
                  const Widget = widget.component;

                  return (
                    <Draggable 
                      key={widget.id} 
                      draggableId={widget.id} 
                      index={index}
                      isDragDisabled={isMobile}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`
                            group relative rounded-lg transition-all duration-200
                            ${snapshot.isDragging ? "scale-102 shadow-lg" : ""}
                          `}
                        >
                          <div 
                            {...provided.dragHandleProps}
                            className="absolute right-2 top-2 p-1.5 rounded-md bg-background/50 backdrop-blur-sm 
                              opacity-0 group-hover:opacity-100 transition-opacity cursor-grab z-10"
                          >
                            <Grip className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            onClick={() => toggleFavorite(widget.id)}
                          >
                            <Settings2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Widget />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </section>
  );
};

export default Dashboard;
