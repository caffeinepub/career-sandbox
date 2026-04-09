import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { SubscriptionTier, createActor } from "../backend";
import type { SubscriptionStatusPublic } from "../types";
import { useAuth } from "./use-auth";

export function useSubscription() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();

  const query = useQuery<SubscriptionStatusPublic>({
    queryKey: ["subscriptionStatus"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getMySubscriptionStatus();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    refetchInterval: 30_000,
    retry: false,
  });

  const isPremium = query.data?.tier === SubscriptionTier.premium;

  return {
    ...query,
    isPremium,
    tier: query.data?.tier ?? SubscriptionTier.free,
    isLoading: actorFetching || query.isLoading,
  };
}
