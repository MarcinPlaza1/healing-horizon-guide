
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Sun } from "lucide-react";
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
    <Card className="p-6 text-center h-full bg-background/50 backdrop-blur-lg border border-primary/10 hover:shadow-lg transition-all duration-300">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-4"
      >
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group hover:bg-primary/20 transition-colors cursor-pointer">
          <Sun className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
        </div>
      </motion.div>
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
      >
        Today's Inspiration
      </motion.h3>
      {quote && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <p className="text-primary/80 italic text-lg leading-relaxed hover:scale-102 transition-transform cursor-default">
            "{quote.quote}"
          </p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm font-medium text-primary"
          >
            - {quote.author}
          </motion.p>
        </motion.div>
      )}
    </Card>
  );
};

export default DailyInspiration;
