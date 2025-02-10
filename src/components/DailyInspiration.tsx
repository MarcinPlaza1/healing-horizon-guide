
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Sun } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Quote {
  quote: string;
  author: string;
  category: string;
}

const DailyInspiration = () => {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      const { data, error } = await supabase
        .from('inspirational_quotes')
        .select('*')
        .limit(1)
        .order('RANDOM()');

      if (data && data.length > 0) {
        setQuote(data[0]);
      }
    };

    fetchQuote();
  }, []);

  return (
    <Card className="p-6 glass-card text-center fade-in">
      <div className="flex justify-center mb-4">
        <Sun className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Today's Inspiration</h3>
      {quote && (
        <>
          <p className="text-muted-foreground italic mb-2">"{quote.quote}"</p>
          <p className="text-sm text-primary">- {quote.author}</p>
        </>
      )}
    </Card>
  );
};

export default DailyInspiration;
