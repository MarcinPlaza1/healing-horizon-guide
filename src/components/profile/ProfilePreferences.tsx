
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Preferences {
  notifications: boolean;
  theme: 'light' | 'dark';
}

interface ProfilePreferencesProps {
  preferences: Preferences;
  setPreferences: (prefs: Preferences) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const ProfilePreferences = ({
  preferences,
  setPreferences,
  onSubmit,
  loading,
}: ProfilePreferencesProps) => {
  return (
    <div className="space-y-6">
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
      <Button onClick={onSubmit} className="w-full" disabled={loading}>
        {loading ? "Saving..." : "Save Preferences"}
      </Button>
    </div>
  );
};

export default ProfilePreferences;
