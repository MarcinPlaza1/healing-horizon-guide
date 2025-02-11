
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
        .select('*');

      if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuote(data[randomIndex]);
      }
    };

    fetchQuote();
  }, []);

  return (
    <Card className="p-6 text-center h-full bg-background/50 backdrop-blur-lg border border-primary/10">
      <div className="flex justify-center mb-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Sun className="h-6 w-6 text-primary" />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
        Today's Inspiration
      </h3>
      {quote && (
        <div className="space-y-4">
          <p className="text-primary/80 italic text-lg leading-relaxed">"{quote.quote}"</p>
          <p className="text-sm font-medium text-primary">- {quote.author}</p>
        </div>
      )}
    </Card>
  );
};

export default DailyInspiration;
