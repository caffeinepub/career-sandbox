import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StreamProgressPublic {
    completedQuizzes: Array<bigint>;
    stream: CareerStream;
    completedMicroProjects: Array<bigint>;
    lastUpdated: Timestamp;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface RoadmapPublic {
    stream: CareerStream;
    userId: UserId;
    updatedAt: Timestamp;
    milestones: Array<Milestone>;
}
export interface QuizAnswer {
    questionId: bigint;
    selectedOption: bigint;
}
export interface QuizResult {
    completedAt: Timestamp;
    answers: Array<QuizAnswer>;
    recommendedStream: CareerStream;
}
export interface SubscriptionStatusPublic {
    expiresAt?: Timestamp;
    stripeSubscriptionId?: string;
    userId: UserId;
    tier: SubscriptionTier;
    updatedAt: Timestamp;
    stripeCustomerId?: string;
}
export interface Milestone {
    title: string;
    year: bigint;
    description: string;
    actions: Array<string>;
    skills: Array<string>;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface UserProfilePublic {
    userId: UserId;
    name: string;
    createdAt: Timestamp;
    activeStream?: CareerStream;
    quizResult?: QuizResult;
}
export type UserId = Principal;
export interface http_header {
    value: string;
    name: string;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export enum CareerStream {
    contentGaming = "contentGaming",
    arts = "arts",
    commerce = "commerce",
    science = "science"
}
export enum SubscriptionTier {
    premium = "premium",
    free = "free"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    activatePremiumSubscription(stripeCustomerId: string, stripeSubscriptionId: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    cancelMySubscription(): Promise<void>;
    checkIsPremium(): Promise<boolean>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createSubscriptionCheckout(successUrl: string, cancelUrl: string): Promise<string>;
    generateDefaultRoadmap(stream: CareerStream): Promise<void>;
    getAllMyProgress(): Promise<Array<StreamProgressPublic>>;
    getCallerUserProfile(): Promise<UserProfilePublic | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyProgress(stream: CareerStream): Promise<StreamProgressPublic | null>;
    getMyRoadmap(): Promise<RoadmapPublic | null>;
    getMySubscriptionStatus(): Promise<SubscriptionStatusPublic>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    markMicroProjectCompleted(stream: CareerStream, projectId: bigint): Promise<void>;
    markQuizCompleted(stream: CareerStream, quizId: bigint): Promise<void>;
    saveCallerUserProfile(name: string): Promise<void>;
    saveQuizResult(result: QuizResult): Promise<void>;
    saveRoadmap(stream: CareerStream, milestones: Array<Milestone>): Promise<void>;
    setActiveStream(stream: CareerStream): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateRoadmapMilestones(milestones: Array<Milestone>): Promise<void>;
}
