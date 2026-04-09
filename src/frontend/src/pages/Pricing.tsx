import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CheckCircle2,
  Crown,
  Download,
  FileText,
  Lock,
  MapPin,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import CTAButton from "../components/CTAButton";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../hooks/use-auth";
import { useSubscription } from "../hooks/use-subscription";

// ─── Plan definitions ────────────────────────────────────────────────────────

interface PlanFeature {
  text: string;
  icon: React.ReactNode;
  premium?: boolean;
}

const FREE_FEATURES: PlanFeature[] = [
  {
    text: "Mindset quiz (stream recommender)",
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    text: "Quiz results & stream recommendation",
    icon: <Star className="w-4 h-4" />,
  },
  { text: "Browse all 4 career streams", icon: <MapPin className="w-4 h-4" /> },
  { text: "Career profile overviews", icon: <FileText className="w-4 h-4" /> },
];

const PREMIUM_FEATURES: PlanFeature[] = [
  {
    text: "Everything in Free",
    icon: <CheckCircle2 className="w-4 h-4" />,
    premium: false,
  },
  {
    text: "Full access to all 4 career streams",
    icon: <Zap className="w-4 h-4" />,
    premium: true,
  },
  {
    text: "All quizzes & micro-projects",
    icon: <Star className="w-4 h-4" />,
    premium: true,
  },
  {
    text: "Personalised 3–5 year career roadmap",
    icon: <MapPin className="w-4 h-4" />,
    premium: true,
  },
  {
    text: "PDF roadmap download",
    icon: <Download className="w-4 h-4" />,
    premium: true,
  },
  {
    text: "Support resources & FAQ",
    icon: <Shield className="w-4 h-4" />,
    premium: true,
  },
];

const TRUST_SIGNALS = [
  {
    icon: <ShieldCheck className="w-4 h-4" />,
    text: "Secure payment via Stripe",
  },
  { icon: <Lock className="w-4 h-4" />, text: "Cancel anytime" },
  { icon: <Sparkles className="w-4 h-4" />, text: "7-day free trial" },
];

const MONTHLY_PRICE = 299;
const ANNUAL_PRICE = 2499;
const ANNUAL_MONTHLY_EQUIV = Math.round(ANNUAL_PRICE / 12);

// ─── Stripe session hook ──────────────────────────────────────────────────────

function useStripeSessionConfirm() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const confirmedRef = useRef(false);

  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id",
  );

  const sessionQuery = useQuery({
    queryKey: ["stripeSession", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return null;
      return actor.getStripeSessionStatus(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId && !confirmedRef.current,
    retry: false,
  });

  useEffect(() => {
    if (sessionQuery.data && !confirmedRef.current) {
      confirmedRef.current = true;
      const status = sessionQuery.data;
      if (status.__kind__ === "completed") {
        toast.success(
          "🎉 Welcome to Premium! Your subscription is now active.",
        );
        queryClient.invalidateQueries({ queryKey: ["subscriptionStatus"] });
        // Clean up URL
        const url = new URL(window.location.href);
        url.searchParams.delete("session_id");
        window.history.replaceState({}, "", url.toString());
      } else if (status.__kind__ === "failed") {
        toast.error("Payment could not be confirmed. Please contact support.");
      }
    }
  }, [sessionQuery.data, queryClient]);

  return { sessionId, isConfirming: sessionQuery.isFetching };
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const { actor } = useActor(createActor);
  const { isAuthenticated, login, isLoading: authLoading } = useAuth();
  const { isPremium, isLoading: subLoading } = useSubscription();
  const [isAnnual, setIsAnnual] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const { sessionId, isConfirming } = useStripeSessionConfirm();

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      const successUrl = `${window.location.origin}/pricing?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/pricing`;
      return actor.createSubscriptionCheckout(successUrl, cancelUrl);
    },
    onSuccess: (url) => {
      window.location.href = url;
    },
    onError: () => {
      toast.error("Could not start checkout. Please try again.");
      setCheckoutLoading(false);
    },
  });

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      await login();
      return;
    }
    setCheckoutLoading(true);
    await checkoutMutation.mutateAsync();
  };

  const isPageLoading =
    subLoading || isConfirming || (!!sessionId && !isPremium);
  const currentPrice = isAnnual ? ANNUAL_PRICE : MONTHLY_PRICE;
  const savingsText = isAnnual
    ? `Save ₹${MONTHLY_PRICE * 12 - ANNUAL_PRICE} vs monthly`
    : "";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <div className="bg-card border-b">
        <div className="max-w-4xl mx-auto px-4">
          <PageHeader
            title="Unlock Your Full Career Journey"
            subtitle="Start free, go deeper with Premium — designed for students in Grades 10–12."
            centered
            badge={
              <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-semibold">
                🎓 Career Sandbox
              </Badge>
            }
          />
        </div>
      </div>

      {/* Premium active banner */}
      {!isPageLoading && isPremium && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto px-4 pt-6"
          data-ocid="premium-banner"
        >
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
              <Crown className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-foreground text-lg">
                You're Premium! ✨
              </p>
              <p className="text-muted-foreground text-sm mt-0.5">
                You have full access to all career streams, roadmaps, and PDF
                downloads.
              </p>
            </div>
            <CTAButton
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                window.location.href = "/account";
              }}
              data-ocid="manage-subscription-btn"
            >
              Manage Subscription
            </CTAButton>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 pb-16">
        {/* Billing toggle — peach active state */}
        <div
          className="flex items-center justify-center gap-3 mb-10"
          data-ocid="billing-toggle"
        >
          <span
            className={`text-sm font-medium transition-colors ${
              !isAnnual ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            aria-label="Toggle annual billing"
            className="data-[state=checked]:bg-primary"
          />
          <span
            className={`text-sm font-medium transition-colors ${
              isAnnual ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Annual
          </span>
          {isAnnual && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs font-bold bg-[oklch(var(--stream-commerce-light))] text-[oklch(var(--stream-commerce))] px-2.5 py-0.5 rounded-full border border-[oklch(var(--stream-commerce)/0.3)]"
            >
              Save 30%
            </motion.span>
          )}
        </div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Free card — sage green checkmarks */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card
              className="p-6 h-full flex flex-col border-border shadow-card bg-card"
              data-ocid="plan-card-free"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-display font-bold text-foreground">
                    Explorer
                  </p>
                  <p className="text-xs text-muted-foreground">Free forever</p>
                </div>
              </div>

              <div className="mb-4">
                <span className="font-display font-bold text-4xl text-foreground">
                  Free
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-5">
                Start discovering careers today — no card needed.
              </p>

              <Separator className="mb-5" />

              <ul className="space-y-3 flex-1 mb-6">
                {FREE_FEATURES.map((f) => (
                  <li
                    key={f.text}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    {/* Sage green checkmark icons on free tier */}
                    <span className="text-accent shrink-0 mt-0.5">
                      {f.icon}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>

              <CTAButton
                type="button"
                variant="secondary"
                className="w-full min-h-[48px]"
                onClick={() => {
                  window.location.href = "/quiz";
                }}
                data-ocid="cta-free"
              >
                Get Started Free
              </CTAButton>
            </Card>
          </motion.div>

          {/* Premium card — peach gradient border + checkmarks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative"
          >
            {/* Popular pill */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full shadow-card whitespace-nowrap">
                🌟 Most Popular
              </span>
            </div>

            <Card
              className="p-6 h-full flex flex-col border-primary/40 shadow-elevated bg-card relative overflow-hidden"
              data-ocid="plan-card-premium"
            >
              {/* Peach gradient top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.72 0.14 50), oklch(0.76 0.2 65))",
                }}
              />

              <div className="flex items-center gap-3 mb-4 mt-1">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-bold text-foreground">
                    Premium
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isAnnual ? "Annual plan" : "Monthly plan"}
                  </p>
                </div>
              </div>

              <div className="mb-1 flex items-end gap-1.5">
                <span className="font-display font-bold text-4xl text-foreground">
                  ₹{currentPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-muted-foreground text-sm mb-1">
                  {isAnnual ? "/ year" : "/ month"}
                </span>
              </div>

              {isAnnual && (
                <motion.p
                  key="annual-equiv"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-muted-foreground mb-1"
                >
                  ≈ ₹{ANNUAL_MONTHLY_EQUIV}/month · {savingsText}
                </motion.p>
              )}

              <p className="text-sm text-muted-foreground mb-5 mt-1">
                Full career exploration with roadmap & projects.
              </p>

              <Separator className="mb-5" />

              <ul className="space-y-3 flex-1 mb-6">
                {PREMIUM_FEATURES.map((f) => (
                  <li key={f.text} className="flex items-start gap-2.5 text-sm">
                    {/* Peach checkmark icons on premium tier */}
                    <span
                      className={`shrink-0 mt-0.5 ${
                        f.premium === false
                          ? "text-muted-foreground"
                          : "text-primary"
                      }`}
                    >
                      {f.icon}
                    </span>
                    <span
                      className={
                        f.premium !== false
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA — loading skeleton when confirming */}
              {isPageLoading ? (
                <Skeleton className="h-12 w-full rounded-full" />
              ) : isPremium ? (
                <div
                  className="w-full min-h-[48px] rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center gap-2 text-sm font-semibold text-primary"
                  data-ocid="cta-premium-active"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Current Plan
                </div>
              ) : (
                <CTAButton
                  type="button"
                  variant="primary"
                  className="w-full min-h-[48px]"
                  loading={checkoutLoading || authLoading}
                  onClick={handleSubscribe}
                  data-ocid={
                    isAuthenticated ? "cta-subscribe" : "cta-login-to-subscribe"
                  }
                >
                  {isAuthenticated
                    ? "Start 7-Day Free Trial"
                    : "Login to Subscribe"}
                </CTAButton>
              )}

              {!isPremium && (
                <p className="text-center text-xs text-muted-foreground mt-3">
                  No charge during the 7-day trial. Cancel anytime.
                </p>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 py-5 px-6 bg-muted/40 rounded-2xl border border-border mb-10"
          data-ocid="trust-signals"
        >
          {TRUST_SIGNALS.map((signal) => (
            <div
              key={signal.text}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <span className="text-accent">{signal.icon}</span>
              {signal.text}
            </div>
          ))}
        </motion.div>

        {/* Feature comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border overflow-hidden shadow-card"
          data-ocid="feature-comparison"
        >
          <div className="grid grid-cols-3 bg-muted/50 border-b border-border px-5 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wide">
            <span className="col-span-1">Feature</span>
            <span className="text-center">Free</span>
            <span className="text-center text-primary">Premium</span>
          </div>

          {COMPARISON_ROWS.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 px-5 py-3.5 items-center ${
                i % 2 === 1 ? "bg-muted/20" : ""
              } ${i < COMPARISON_ROWS.length - 1 ? "border-b border-border/50" : ""}`}
            >
              <span className="text-sm text-foreground col-span-1 pr-4">
                {row.feature}
              </span>
              <span className="text-center">
                {row.free ? (
                  <CheckCircle2 className="w-4 h-4 text-accent mx-auto" />
                ) : (
                  <span className="text-muted-foreground/40 text-lg leading-none">
                    —
                  </span>
                )}
              </span>
              <span className="text-center">
                <CheckCircle2 className="w-4 h-4 text-primary mx-auto" />
              </span>
            </div>
          ))}
        </motion.div>

        {/* Footer note */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          All subscriptions billed securely through Stripe.{" "}
          <a href="/support" className="text-primary hover:underline">
            Need help?
          </a>
        </p>
      </div>
    </div>
  );
}

// ─── Comparison table data ────────────────────────────────────────────────────

const COMPARISON_ROWS = [
  { feature: "Mindset quiz", free: true },
  { feature: "Stream recommendation", free: true },
  { feature: "Browse all 4 career streams", free: true },
  { feature: "Career profile overviews", free: true },
  { feature: "Full quizzes per stream", free: false },
  { feature: "Micro-projects & challenges", free: false },
  { feature: "Personalised career roadmap", free: false },
  { feature: "PDF roadmap download", free: false },
  { feature: "Support resources & FAQ", free: false },
];
