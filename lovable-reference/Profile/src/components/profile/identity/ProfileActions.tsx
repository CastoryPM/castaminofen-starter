import { MessageCircle, Pencil, Settings, Share2, UserPlus, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ActionButton } from "../shared/ActionButton";
import type { ProfileMode } from "@/lib/profile-data";

export function ProfileActions({ mode, name }: { mode: ProfileMode; name: string }) {
  const [following, setFollowing] = useState(false);

  if (mode === "personal") {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <ActionButton variant="ember">
          <Pencil className="h-4 w-4" /> Edit profile
        </ActionButton>
        <ActionButton onClick={() => toast.success("Profile link copied")}>
          <Share2 className="h-4 w-4" /> Share
        </ActionButton>
        <ActionButton variant="outline" size="icon" aria-label="Settings">
          <Settings className="h-4 w-4" />
        </ActionButton>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <ActionButton
        variant={following ? "quiet" : "ember"}
        onClick={() => {
          setFollowing((v) => !v);
          toast.success(following ? `Unfollowed ${name}` : `Following ${name}`);
        }}
      >
        {following ? <Check className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
        {following ? "Following" : "Follow"}
      </ActionButton>
      <ActionButton onClick={() => toast("Messaging opens from the Connect surface")}>
        <MessageCircle className="h-4 w-4" /> Connect
      </ActionButton>
      <ActionButton variant="outline" size="icon" aria-label="Share profile" onClick={() => toast.success("Profile link copied")}>
        <Share2 className="h-4 w-4" />
      </ActionButton>
    </div>
  );
}