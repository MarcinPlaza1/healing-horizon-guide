
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Navigation from "@/components/Navigation";
import ProfileSettings from "@/components/ProfileSettings";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Profile {
  id: string;
  created_at: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  recovery_start_date: string | null;
  bio: string | null;
  website: string | null;
  privacy_settings: {
    email_visible: boolean;
    profile_public: boolean;
  };
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark';
  };
  social_links: {
    twitter: string | null;
    linkedin: string | null;
    instagram: string | null;
  };
}

const Profile = () => {
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getUserId();
  }, []);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error loading profile",
          description: error.message,
        });
        return null;
      }
      return data as Profile;
    },
    enabled: !!userId,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <ProfileSettings profile={profile} />
        )}
      </main>
    </div>
  );
};

export default Profile;
