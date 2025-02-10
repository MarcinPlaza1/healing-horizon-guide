
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
}

const widgetConfigs: WidgetConfig[] = [
  { id: "health_summary", title: "Health Overview", component: HealthSummary },
  { id: "daily_inspiration", title: "Daily Inspiration", component: DailyInspiration },
  { id: "progress", title: "Progress Tracker", component: ProgressPreview },
  { id: "daily_checkin", title: "Daily Check-in", component: DailyCheckin },
  { id: "mood_chart", title: "Mood Tracker", component: MoodChart },
  { id: "mindfulness", title: "Mindfulness Session", component: MindfulnessTracker },
];

const Dashboard = () => {
  const [preferences, setPreferences] = useState<DashboardPreferences>(DEFAULT_PREFERENCES);
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
    .filter(widget => widget);

  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-2">
              Your Wellness Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your progress and maintain your well-being journey
            </p>
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
                            group relative rounded-xl transition-all duration-300 
                            hover:shadow-lg hover:shadow-primary/5
                            ${snapshot.isDragging ? "scale-102 shadow-xl ring-2 ring-primary/20" : ""}
                          `}
                        >
                          <div 
                            {...provided.dragHandleProps}
                            className="absolute right-2 top-2 p-1.5 rounded-md bg-background/80 backdrop-blur-sm 
                              opacity-0 group-hover:opacity-100 transition-opacity cursor-grab z-10
                              hover:bg-secondary"
                          >
                            <Grip className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10
                              hover:bg-secondary"
                            onClick={() => toggleFavorite(widget.id)}
                          >
                            <Settings2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <div className="transform transition-transform duration-300 hover:scale-[1.02]">
                            <Widget />
                          </div>
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
