
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface PrivacySettings {
  email_visible: boolean;
  profile_public: boolean;
}

interface ProfilePrivacySettingsProps {
  privacySettings: PrivacySettings;
  setPrivacySettings: (settings: PrivacySettings) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const ProfilePrivacySettings = ({
  privacySettings,
  setPrivacySettings,
  onSubmit,
  loading,
}: ProfilePrivacySettingsProps) => {
  return (
    <div className="space-y-6">
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
      <Button onClick={onSubmit} className="w-full" disabled={loading}>
        {loading ? "Saving..." : "Save Privacy Settings"}
      </Button>
    </div>
  );
};

export default ProfilePrivacySettings;
