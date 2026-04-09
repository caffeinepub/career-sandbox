import type { backendInterface, CareerStream, UserRole, SubscriptionTier, UserProfilePublic, SubscriptionStatusPublic, StreamProgressPublic, RoadmapPublic, StripeSessionStatus, StripeConfiguration, ShoppingItem, QuizResult, Milestone, TransformationInput, TransformationOutput } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined,
  activatePremiumSubscription: async (_stripeCustomerId: string, _stripeSubscriptionId: string) => undefined,
  assignCallerUserRole: async (_user: Principal, _role: UserRole) => undefined,
  cancelMySubscription: async () => undefined,
  checkIsPremium: async () => false,
  createCheckoutSession: async (_items: Array<ShoppingItem>, _successUrl: string, _cancelUrl: string) => "mock-session-id",
  createSubscriptionCheckout: async (_successUrl: string, _cancelUrl: string) => "mock-subscription-session-id",
  generateDefaultRoadmap: async (_stream: CareerStream) => undefined,
  getAllMyProgress: async () => [],
  getCallerUserProfile: async (): Promise<UserProfilePublic | null> => null,
  getCallerUserRole: async (): Promise<UserRole> => "user" as UserRole,
  getMyProgress: async (_stream: CareerStream): Promise<StreamProgressPublic | null> => null,
  getMyRoadmap: async (): Promise<RoadmapPublic | null> => null,
  getMySubscriptionStatus: async (): Promise<SubscriptionStatusPublic> => ({
    userId: {} as Principal,
    tier: "free" as SubscriptionTier,
    updatedAt: BigInt(Date.now()),
  }),
  getStripeSessionStatus: async (_sessionId: string): Promise<StripeSessionStatus> => ({
    __kind__: "failed",
    failed: { error: "mock" },
  }),
  isCallerAdmin: async () => false,
  isStripeConfigured: async () => false,
  markMicroProjectCompleted: async (_stream: CareerStream, _projectId: bigint) => undefined,
  markQuizCompleted: async (_stream: CareerStream, _quizId: bigint) => undefined,
  saveCallerUserProfile: async (_name: string) => undefined,
  saveQuizResult: async (_result: QuizResult) => undefined,
  saveRoadmap: async (_stream: CareerStream, _milestones: Array<Milestone>) => undefined,
  setActiveStream: async (_stream: CareerStream) => undefined,
  setStripeConfiguration: async (_config: StripeConfiguration) => undefined,
  transform: async (_input: TransformationInput): Promise<TransformationOutput> => ({
    status: BigInt(200),
    body: new Uint8Array(),
    headers: [],
  }),
  updateRoadmapMilestones: async (_milestones: Array<Milestone>) => undefined,
};
