
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Sun, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

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
    <Card className="p-6 h-full bg-gradient-to-br from-background via-background to-primary/5 border-primary/10 hover:shadow-lg transition-all duration-300">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-6"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group hover:bg-primary/20 transition-colors cursor-pointer relative">
            <Sun className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </motion.div>
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
      >
        Today's Inspiration
      </motion.h3>
      {quote ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="relative">
            <Quote className="h-6 w-6 text-primary/20 absolute -top-3 -left-2" />
            <p className="text-primary/80 italic text-lg leading-relaxed text-center px-4">
              {quote.quote}
            </p>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center"
          >
            <p className="text-sm font-medium text-primary">
              {quote.author}
            </p>
            {quote.category && (
              <span className="text-xs text-muted-foreground mt-1">
                {quote.category}
              </span>
            )}
          </motion.div>
        </motion.div>
      ) : (
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-primary/10 rounded w-3/4 mx-auto" />
          <div className="h-4 bg-primary/10 rounded w-1/2 mx-auto" />
          <div className="h-4 bg-primary/5 rounded w-1/4 mx-auto" />
        </div>
      )}
    </Card>
  );
};

export default DailyInspiration;
