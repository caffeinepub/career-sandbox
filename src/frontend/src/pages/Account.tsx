import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Crown, Edit3, LogOut, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import CTAButton from "../components/CTAButton";
import PageHeader from "../components/PageHeader";
import ProgressBadge from "../components/ProgressBadge";
import { useAuth } from "../hooks/use-auth";
import { useSubscription } from "../hooks/use-subscription";
import { STREAM_META } from "../types";
import type { UserProfilePublic } from "../types";

export default function AccountPage() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated, logout } = useAuth();
  const { isPremium } = useSubscription();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const { data: profile, isLoading } = useQuery<UserProfilePublic | null>({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
  });

  const saveMutation = useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error("Actor not available");
      await actor.saveCallerUserProfile(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerProfile"] });
      setEditing(false);
      toast.success("Profile updated!");
    },
    onError: () => toast.error("Failed to update profile."),
  });

  const handleEditStart = () => {
    setNameInput(profile?.name ?? "");
    setEditing(true);
  };

  const handleSave = async () => {
    if (!nameInput.trim()) return;
    await saveMutation.mutateAsync(nameInput.trim());
  };

  const activeStream = profile?.activeStream
    ? STREAM_META.find((s) => s.id === profile.activeStream)
    : null;

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pb-12">
      <PageHeader
        title="My Account"
        subtitle="Manage your profile and subscription."
      />

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-6 mb-6" data-ocid="account-profile-card">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14">
                <AvatarFallback className="bg-primary/20 text-primary font-bold text-xl">
                  {profile?.name ? (
                    profile.name[0].toUpperCase()
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div>
                {editing ? (
                  <div className="flex items-center gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="name-input" className="text-xs">
                        Display Name
                      </Label>
                      <Input
                        id="name-input"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="h-8 text-sm w-48"
                        placeholder="Your name"
                        data-ocid="account-name-input"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-display font-bold text-foreground">
                      {profile?.name ?? "Anonymous Explorer"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Career Sandbox Member
                    </p>
                  </>
                )}
              </div>
            </div>

            {editing ? (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </Button>
                <CTAButton
                  size="sm"
                  loading={saveMutation.isPending}
                  onClick={handleSave}
                  data-ocid="account-save-btn"
                >
                  Save
                </CTAButton>
              </div>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleEditStart}
                className="flex items-center gap-1.5 touch-target"
                data-ocid="account-edit-btn"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit
              </Button>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Subscription */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 mb-6" data-ocid="account-subscription-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-500" />
              <h2 className="font-display font-bold text-foreground">
                Subscription
              </h2>
            </div>
            <ProgressBadge
              variant={isPremium ? "premium" : "new"}
              label={isPremium ? "Premium" : "Free"}
            />
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {isPremium
              ? "You have full access to all quizzes, projects, and roadmap features."
              : "Upgrade to Premium to unlock all content and your personalised roadmap."}
          </p>
          {!isPremium && (
            <a href="/pricing">
              <CTAButton
                variant="primary"
                size="sm"
                data-ocid="account-upgrade-btn"
              >
                Upgrade to Premium
              </CTAButton>
            </a>
          )}
          {isPremium && (
            <p className="text-xs text-muted-foreground">
              Manage billing and cancellation on the{" "}
              <a href="/pricing" className="text-primary hover:underline">
                Pricing page
              </a>
              .
            </p>
          )}
        </Card>
      </motion.div>

      {/* Active Stream */}
      {activeStream && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 mb-6" data-ocid="account-stream-card">
            <h2 className="font-display font-bold text-foreground mb-3">
              Active Stream
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{activeStream.icon}</span>
              <div>
                <p className="font-medium text-foreground">
                  {activeStream.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activeStream.tagline}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          variant="outline"
          className="w-full touch-target flex items-center gap-2 text-destructive border-destructive/30 hover:bg-destructive/5"
          onClick={logout}
          data-ocid="account-logout-btn"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </motion.div>
    </div>
  );
}
