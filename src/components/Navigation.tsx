
import { Link, useNavigate } from "react-router-dom";
import { Heart, Users, Calendar, LogOut, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Navigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/auth");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold">MindfulRecovery</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link to="/dashboard" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
              <Users className="w-4 h-4" />
              <span>Community</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
              <UserCircle className="w-4 h-4" />
              <span>Profile</span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
