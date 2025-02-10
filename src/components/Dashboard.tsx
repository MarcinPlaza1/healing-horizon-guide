
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

interface DashboardPreferences {
  widget_order: string[];
  favorite_widgets: string[];
  expanded_widgets: string[];
}

const widgetComponents: { [key: string]: React.ComponentType } = {
  health_summary: HealthSummary,
  daily_inspiration: DailyInspiration,
  progress: ProgressPreview,
  daily_checkin: DailyCheckin,
  mood_chart: MoodChart,
  mindfulness: MindfulnessTracker,
};

const Dashboard = () => {
  const [preferences, setPreferences] = useState<DashboardPreferences | null>(null);
  const { toast } = useToast();

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
        setPreferences(data.dashboard_preferences);
      }
    };

    fetchPreferences();
  }, []);

  const handleDragEnd = async (result: any) => {
    if (!result.destination || !preferences) return;

    const newOrder = Array.from(preferences.widget_order);
    const [reorderedItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, reorderedItem);

    const newPreferences = {
      ...preferences,
      widget_order: newOrder,
    };

    setPreferences(newPreferences);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({ dashboard_preferences: newPreferences })
      .eq('id', user.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error saving preferences",
        description: "Your widget order couldn't be saved.",
      });
    }
  };

  if (!preferences) return null;

  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="widgets">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {preferences.widget_order.map((widgetId, index) => {
                  const Widget = widgetComponents[widgetId];
                  if (!Widget) return null;

                  return (
                    <Draggable key={widgetId} draggableId={widgetId} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
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
