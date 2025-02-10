
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SocialLinks {
  twitter: string | null;
  linkedin: string | null;
  instagram: string | null;
}

interface ProfileSocialLinksProps {
  socialLinks: SocialLinks;
  setSocialLinks: (links: SocialLinks) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const ProfileSocialLinks = ({
  socialLinks,
  setSocialLinks,
  onSubmit,
  loading,
}: ProfileSocialLinksProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <Label>Social Links</Label>
        <div className="space-y-2">
          <Input
            placeholder="Twitter profile"
            value={socialLinks.twitter || ""}
            onChange={(e) =>
              setSocialLinks({ ...socialLinks, twitter: e.target.value })
            }
          />
          <Input
            placeholder="LinkedIn profile"
            value={socialLinks.linkedin || ""}
            onChange={(e) =>
              setSocialLinks({ ...socialLinks, linkedin: e.target.value })
            }
          />
          <Input
            placeholder="Instagram profile"
            value={socialLinks.instagram || ""}
            onChange={(e) =>
              setSocialLinks({ ...socialLinks, instagram: e.target.value })
            }
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Saving..." : "Save Social Links"}
      </Button>
    </form>
  );
};

export default ProfileSocialLinks;
