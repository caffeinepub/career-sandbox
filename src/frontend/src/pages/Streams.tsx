import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Layers, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { CareerStream, createActor } from "../backend";
import PageHeader from "../components/PageHeader";
import StreamCard from "../components/StreamCard";
import { useAuth } from "../hooks/use-auth";
import { STREAM_META, type StreamProgressPublic } from "../types";

function useAllProgress() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery<StreamProgressPublic[]>({
    queryKey: ["allProgress"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMyProgress();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

const STREAM_ENUM_MAP: Record<string, CareerStream> = {
  contentGaming: CareerStream.contentGaming,
  science: CareerStream.science,
  commerce: CareerStream.commerce,
  arts: CareerStream.arts,
};

function getProgressPct(progress: StreamProgressPublic | undefined): number {
  if (!progress) return 0;
  const quizzes = Math.min(Number(progress.completedQuizzes.length), 3);
  const projects = Math.min(Number(progress.completedMicroProjects.length), 3);
  return Math.round(((quizzes + projects) / 6) * 100);
}

function isStreamComplete(progress: StreamProgressPublic | undefined): boolean {
  if (!progress) return false;
  return (
    progress.completedQuizzes.length >= 3 &&
    progress.completedMicroProjects.length >= 2
  );
}

export default function StreamsPage() {
  const { data: allProgress } = useAllProgress();
  const { isAuthenticated } = useAuth();

  const getProgress = (streamId: string) => {
    const streamEnum = STREAM_ENUM_MAP[streamId];
    return allProgress?.find((p) => p.stream === streamEnum);
  };

  const completedCount = STREAM_META.filter((s) =>
    isStreamComplete(getProgress(s.id)),
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header zone */}
      <div className="bg-card border-b border-border">
        <div className="max-w-2xl mx-auto px-4">
          <PageHeader
            title="Explore Career Streams"
            subtitle="Pick a path that sparks your curiosity — dive into quizzes, hands-on projects, and your personalized roadmap."
            badge={
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/20">
                <Layers className="w-3.5 h-3.5" />4 Career Paths
              </span>
            }
          />
        </div>
      </div>

      {/* Progress summary (authenticated only) */}
      {isAuthenticated && completedCount > 0 && (
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <p className="text-sm text-foreground">
              You've completed{" "}
              <span className="font-bold text-primary">{completedCount}</span>{" "}
              of 4 streams. Keep going!
            </p>
          </div>
        </div>
      )}

      {/* Stream cards */}
      <div
        className="max-w-2xl mx-auto px-4 py-6 space-y-4"
        data-ocid="streams-list"
      >
        {STREAM_META.map((stream, index) => {
          const progress = getProgress(stream.id);
          const pct = getProgressPct(progress);
          const complete = isStreamComplete(progress);

          return (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
                duration: 0.38,
                ease: "easeOut",
              }}
              className="relative"
              data-ocid={`stream-row-${stream.id}`}
            >
              {complete && (
                <div
                  className="absolute -top-2 -right-2 z-10 bg-primary text-primary-foreground rounded-full p-1 shadow-card"
                  aria-label="Stream completed"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              <StreamCard
                stream={stream}
                progress={pct > 0 ? pct : undefined}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Quiz CTA footer */}
      <div className="bg-muted/40 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 py-10 text-center">
          <h2 className="font-display font-bold text-lg text-foreground mb-2">
            Not sure which stream fits you?
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            Take the 5-minute mindset quiz to get a personalised recommendation.
          </p>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-smooth touch-target"
            data-ocid="streams-quiz-cta"
          >
            Take the Mindset Quiz →
          </Link>
        </div>
      </div>
    </div>
  );
}
