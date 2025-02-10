
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself"
                  className="resize-none"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://your-website.com"
                />
              </div>

              <div className="space-y-2">
                <Label>Recovery Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !recoveryDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {recoveryDate ? format(recoveryDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={recoveryDate}
                      onSelect={setRecoveryDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-4">
                <Label>Social Links</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Twitter profile"
                    value={socialLinks.twitter || ""}
                    onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                  />
                  <Input
                    placeholder="LinkedIn profile"
                    value={socialLinks.linkedin || ""}
                    onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                  />
                  <Input
                    placeholder="Instagram profile"
                    value={socialLinks.instagram || ""}
                    onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Profile</Label>
                  <div className="text-sm text-muted-foreground">
                    Make your profile visible to others
                  </div>
                </div>
                <Switch
                  checked={privacySettings.profile_public}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({ ...privacySettings, profile_public: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Email</Label>
                  <div className="text-sm text-muted-foreground">
                    Display your email on your public profile
                  </div>
                </div>
                <Switch
                  checked={privacySettings.email_visible}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({ ...privacySettings, email_visible: checked })
                  }
                />
              </div>
            </div>
            <Button onClick={handleSubmit} className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Save Privacy Settings"}
            </Button>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications about your progress
                  </div>
                </div>
                <Switch
                  checked={preferences.notifications}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, notifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Theme</Label>
                  <div className="text-sm text-muted-foreground">
                    Choose your preferred theme
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant={preferences.theme === 'light' ? 'default' : 'outline'}
                    onClick={() => setPreferences({ ...preferences, theme: 'light' })}
                  >
                    Light
                  </Button>
                  <Button
                    size="sm"
                    variant={preferences.theme === 'dark' ? 'default' : 'outline'}
                    onClick={() => setPreferences({ ...preferences, theme: 'dark' })}
                  >
                    Dark
                  </Button>
                </div>
              </div>
            </div>
            <Button onClick={handleSubmit} className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Save Preferences"}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
