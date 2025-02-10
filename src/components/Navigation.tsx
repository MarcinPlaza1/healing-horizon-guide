
import { Link } from "react-router-dom";
import { Heart, Users, Calendar } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold">MindfulRecovery</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
              <Users className="w-4 h-4" />
              <span>Community</span>
            </Link>
            <Link to="/" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Progress</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
