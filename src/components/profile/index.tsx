
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import ProfileBasicInfo from "./ProfileBasicInfo";
import ProfileSocialLinks from "./ProfileSocialLinks";
import ProfilePrivacySettings from "./ProfilePrivacySettings";
import ProfilePreferences from "./ProfilePreferences";

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

interface ProfileSettingsProps {
  profile: Profile | null;
}

const ProfileSettings = ({ profile }: ProfileSettingsProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [website, setWebsite] = useState(profile?.website || "");
  const [recoveryDate, setRecoveryDate] = useState<Date | undefined>(
    profile?.recovery_start_date ? new Date(profile.recovery_start_date) : undefined
  );
  const [privacySettings, setPrivacySettings] = useState(profile?.privacy_settings || {
    email_visible: false,
    profile_public: false,
  });
  const [preferences, setPreferences] = useState(profile?.preferences || {
    notifications: true,
    theme: 'light' as const,
  });
  const [socialLinks, setSocialLinks] = useState(profile?.social_links || {
    twitter: null,
    linkedin: null,
    instagram: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.id) return;
    
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          username: username,
          bio: bio,
          website: website,
          recovery_start_date: recoveryDate?.toISOString(),
          privacy_settings: privacySettings,
          preferences: preferences,
          social_links: socialLinks,
        })
        .eq('id', profile.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating profile",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile not found</CardTitle>
          <CardDescription>
            Unable to load profile information
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto fade-in">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Update your profile information and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileBasicInfo
              fullName={fullName}
              setFullName={setFullName}
              username={username}
              setUsername={setUsername}
              bio={bio}
              setBio={setBio}
              website={website}
              setWebsite={setWebsite}
              recoveryDate={recoveryDate}
              setRecoveryDate={setRecoveryDate}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </TabsContent>

          <TabsContent value="social">
            <ProfileSocialLinks
              socialLinks={socialLinks}
              setSocialLinks={setSocialLinks}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </TabsContent>

          <TabsContent value="privacy">
            <ProfilePrivacySettings
              privacySettings={privacySettings}
              setPrivacySettings={setPrivacySettings}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </TabsContent>

          <TabsContent value="preferences">
            <ProfilePreferences
              preferences={preferences}
              setPreferences={setPreferences}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
