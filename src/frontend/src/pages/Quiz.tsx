import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ChevronLeft, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { createActor } from "../backend";
import CTAButton from "../components/CTAButton";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../hooks/use-auth";
import { useQuizStore } from "../store/quiz-store";
import { STREAM_META } from "../types";
import type { CareerStream, QuizQuestion } from "../types";

// ─── Questions (NON-CAREER personality/mindset) ────────────────────────────
const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "When you have free time, what do you most enjoy?",
    options: [
      { id: 1, text: "Creating art, music, videos, or games", emoji: "🎨" },
      {
        id: 2,
        text: "Reading, experimenting, or building things",
        emoji: "🔭",
      },
      {
        id: 3,
        text: "Organising plans, spreadsheets, or side hustles",
        emoji: "📊",
      },
      { id: 4, text: "Performing, dancing, or doing theatre", emoji: "🎭" },
    ],
  },
  {
    id: 2,
    text: "You feel most energised when...",
    options: [
      { id: 1, text: "You're deep in a creative flow state", emoji: "✨" },
      { id: 2, text: "You crack a difficult problem or puzzle", emoji: "🧩" },
      { id: 3, text: "You hit a goal or close a deal", emoji: "🏆" },
      { id: 4, text: "You move, perform, or express yourself", emoji: "🌟" },
    ],
  },
  {
    id: 3,
    text: "Your friends would describe you as...",
    options: [
      { id: 1, text: "The imaginative, out-of-the-box thinker", emoji: "💡" },
      {
        id: 2,
        text: "The curious one who asks 'why' about everything",
        emoji: "🤔",
      },
      { id: 3, text: "The organiser who always has a plan", emoji: "📋" },
      { id: 4, text: "The expressive, emotional, heartfelt one", emoji: "💖" },
    ],
  },
  {
    id: 4,
    text: "When you face a hard problem, you prefer to...",
    options: [
      { id: 1, text: "Brainstorm wild ideas and try them out", emoji: "🌀" },
      { id: 2, text: "Research it thoroughly before acting", emoji: "🔍" },
      { id: 3, text: "Make a step-by-step action plan", emoji: "🗂️" },
      { id: 4, text: "Talk it through with someone you trust", emoji: "💬" },
    ],
  },
  {
    id: 5,
    text: "What kind of content do you enjoy consuming most?",
    options: [
      {
        id: 1,
        text: "YouTube videos, gaming streams, memes, short films",
        emoji: "📹",
      },
      {
        id: 2,
        text: "Documentaries, science podcasts, explainer videos",
        emoji: "🎙️",
      },
      {
        id: 3,
        text: "Business news, startup stories, finance tips",
        emoji: "📰",
      },
      {
        id: 4,
        text: "Fashion, photography, music, or visual art feeds",
        emoji: "🎵",
      },
    ],
  },
  {
    id: 6,
    text: "In a group project, you naturally take the role of...",
    options: [
      {
        id: 1,
        text: "The creative lead — design, visuals, storytelling",
        emoji: "🖌️",
      },
      {
        id: 2,
        text: "The researcher — gathering and analysing data",
        emoji: "🧪",
      },
      {
        id: 3,
        text: "The manager — deadlines, delegation, delivery",
        emoji: "🎯",
      },
      {
        id: 4,
        text: "The presenter — performing and communicating ideas",
        emoji: "📢",
      },
    ],
  },
  {
    id: 7,
    text: "What matters most to you in a future goal?",
    options: [
      {
        id: 1,
        text: "Building something that people love and use",
        emoji: "🚀",
      },
      {
        id: 2,
        text: "Making a discovery or solving a real-world problem",
        emoji: "🌍",
      },
      {
        id: 3,
        text: "Growing wealth and leading a successful team",
        emoji: "💼",
      },
      {
        id: 4,
        text: "Leaving a cultural or emotional impact on the world",
        emoji: "🎼",
      },
    ],
  },
  {
    id: 8,
    text: "How do you best learn something new?",
    options: [
      {
        id: 1,
        text: "Watching tutorials and making stuff immediately",
        emoji: "🎬",
      },
      { id: 2, text: "Reading deeply, then testing hypotheses", emoji: "📚" },
      {
        id: 3,
        text: "Taking structured courses with clear milestones",
        emoji: "🏫",
      },
      {
        id: 4,
        text: "Workshops, jams, rehearsals, hands-on practice",
        emoji: "🤲",
      },
    ],
  },
  {
    id: 9,
    text: "When things go wrong, your first reaction is...",
    options: [
      { id: 1, text: "Pivot — try a different creative angle", emoji: "🔄" },
      { id: 2, text: "Debug — figure out exactly what broke", emoji: "🛠️" },
      { id: 3, text: "Adapt — revise the plan and push forward", emoji: "📌" },
      {
        id: 4,
        text: "Feel it first, then bounce back with energy",
        emoji: "💪",
      },
    ],
  },
  {
    id: 10,
    text: "Your ideal weekend involves...",
    options: [
      {
        id: 1,
        text: "Building a game, editing a video, or creating content",
        emoji: "🕹️",
      },
      {
        id: 2,
        text: "A science museum, DIY experiment, or coding marathon",
        emoji: "⚗️",
      },
      {
        id: 3,
        text: "A startup workshop, networking event, or market visit",
        emoji: "🤝",
      },
      {
        id: 4,
        text: "A concert, gallery opening, open mic, or performance",
        emoji: "🎨",
      },
    ],
  },
];

// ─── Stream match messages ──────────────────────────────────────────────────
const MATCH_REASONS: Record<string, string> = {
  contentGaming:
    "You're a born creator! Your answers show a playful, expressive mind that thrives on making things people love. Content creation, game design, and digital media are where your energy shines brightest.",
  science:
    "You're a natural problem-solver. Your curiosity, love of deep research, and drive to understand how things work make Science & Tech an ideal fit. You'll thrive in engineering, research, and innovation.",
  commerce:
    "You think like a leader. Your goal-oriented, strategic mindset and love of organisation make Commerce and Entrepreneurship your natural arena. Building teams and businesses is your calling.",
  arts: "You feel deeply and express powerfully. Your emotional intelligence, need for authentic expression, and flair for performance point straight to the Arts — fashion, music, design, and beyond.",
};

// ─── Weighted scoring ──────────────────────────────────────────────────────
// Option 1 → contentGaming, 2 → science, 3 → commerce, 4 → arts
const STREAM_BY_OPTION: Record<number, CareerStream> = {
  1: "contentGaming" as CareerStream,
  2: "science" as CareerStream,
  3: "commerce" as CareerStream,
  4: "arts" as CareerStream,
};

function computeRecommendedStream(
  answers: Record<number, number>,
): CareerStream {
  const tally: Record<string, number> = {};
  for (const optionId of Object.values(answers)) {
    const stream = STREAM_BY_OPTION[optionId];
    if (stream) tally[stream] = (tally[stream] ?? 0) + 1;
  }
  let best: CareerStream = "contentGaming" as CareerStream;
  let max = 0;
  for (const [stream, count] of Object.entries(tally)) {
    if (count > max) {
      max = count;
      best = stream as CareerStream;
    }
  }
  return best;
}

// ─── Quiz Intro ─────────────────────────────────────────────────────────────
function QuizIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card rounded-2xl border border-border shadow-elevated overflow-hidden"
        data-ocid="quiz-intro"
      >
        {/* Header band */}
        <div className="bg-primary px-8 py-6 text-center">
          <div className="text-5xl mb-3">🧠</div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-primary-foreground">
            Discover Your Mindset
          </h1>
          <p className="text-primary-foreground/80 text-sm mt-1">
            10 questions · ~3 minutes
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-8 text-center">
          <p className="text-foreground text-base leading-relaxed mb-2">
            Answer a few questions about{" "}
            <span className="font-semibold text-primary">yourself</span> — not
            about careers!
          </p>
          <p className="text-muted-foreground text-sm mb-8">
            We'll analyse your personality, energy, and natural tendencies to
            suggest the career stream that fits you best. There are no right or
            wrong answers.
          </p>

          {/* What to expect */}
          <div className="grid grid-cols-2 gap-3 mb-8 text-left">
            {[
              {
                emoji: "🎯",
                label: "Personalised match",
                sub: "Based on your unique personality",
              },
              {
                emoji: "🔒",
                label: "No judgment",
                sub: "All answers are private and secure",
              },
              {
                emoji: "⚡",
                label: "Quick & fun",
                sub: "10 questions, no long text",
              },
              {
                emoji: "🗺️",
                label: "Career roadmap",
                sub: "Unlock your path after the quiz",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-muted/40 rounded-xl p-3 flex items-start gap-2"
              >
                <span className="text-xl shrink-0">{item.emoji}</span>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <CTAButton
            type="button"
            variant="hero"
            size="lg"
            showArrow
            onClick={onStart}
            className="w-full sm:w-auto"
            data-ocid="quiz-start-btn"
          >
            Start Quiz
          </CTAButton>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Quiz Result ─────────────────────────────────────────────────────────────
function QuizResult({
  recommendedStream,
  onRetake,
}: {
  recommendedStream: CareerStream;
  onRetake: () => void;
}) {
  const navigate = useNavigate();
  const stream = STREAM_META.find((s) => s.id === recommendedStream);
  const matchReason = MATCH_REASONS[recommendedStream] ?? "";

  return (
    <div className="max-w-2xl mx-auto px-4 py-8" data-ocid="quiz-result">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-card rounded-2xl border border-border shadow-elevated overflow-hidden"
      >
        {/* Result header */}
        <div className="bg-primary/10 border-b border-border px-8 py-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
          </motion.div>
          <h2 className="font-display font-bold text-2xl text-foreground">
            Your Mindset Match!
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Based on your personality, we recommend:
          </p>
        </div>

        <div className="px-8 py-6">
          {/* Stream card */}
          {stream && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="rounded-2xl p-6 mb-6 text-center"
              style={{
                background: `${stream.accentColor}15`,
                border: `2px solid ${stream.accentColor}50`,
              }}
            >
              <div className="text-5xl mb-3">{stream.icon}</div>
              <h3 className="font-display font-bold text-xl text-foreground mb-1">
                {stream.label}
              </h3>
              <p className="text-sm text-muted-foreground italic">
                {stream.tagline}
              </p>
            </motion.div>
          )}

          {/* Why this stream */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="bg-muted/40 rounded-xl p-4 mb-6 flex gap-3"
          >
            <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-foreground leading-relaxed">
              {matchReason}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            className="flex flex-col gap-3"
          >
            <CTAButton
              type="button"
              variant="primary"
              size="lg"
              showArrow
              onClick={() =>
                navigate({
                  to: "/streams/$streamId",
                  params: { streamId: recommendedStream },
                })
              }
              className="w-full justify-center"
              data-ocid="quiz-explore-cta"
            >
              Explore {stream?.label ?? "This Stream"}
            </CTAButton>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => navigate({ to: "/streams" })}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full border-2 border-border bg-background text-foreground font-semibold text-sm hover:bg-muted transition-smooth touch-target"
                data-ocid="quiz-all-streams-btn"
              >
                <ArrowRight className="w-4 h-4" />
                See All Streams
              </button>
              <button
                type="button"
                onClick={onRetake}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full border-2 border-border bg-background text-muted-foreground font-semibold text-sm hover:bg-muted transition-smooth touch-target"
                data-ocid="quiz-restart-btn"
              >
                Retake Quiz
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Quiz Page ────────────────────────────────────────────────────────
export default function QuizPage() {
  const { actor } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  const [phase, setPhase] = useState<"intro" | "questions" | "results">(
    "intro",
  );
  const [animDir, setAnimDir] = useState<1 | -1>(1);

  const {
    currentIndex,
    answers,
    recommendedStream,
    setAnswer,
    nextQuestion,
    prevQuestion,
    completeQuiz,
    resetQuiz,
  } = useQuizStore();

  const currentQ = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;
  const selectedOption = answers[currentQ?.id];
  const isLast = currentIndex === QUESTIONS.length - 1;

  const handleStart = () => setPhase("questions");

  const handleNext = async () => {
    if (!selectedOption) return;
    setAnimDir(1);
    if (isLast) {
      const allAnswers = { ...answers, [currentQ.id]: selectedOption };
      const stream = computeRecommendedStream(allAnswers);
      completeQuiz(stream);
      setPhase("results");

      // Save to backend if authenticated
      if (isAuthenticated && actor) {
        try {
          const quizAnswers = Object.entries(allAnswers).map(
            ([qId, optId]) => ({
              questionId: BigInt(qId),
              selectedOption: BigInt(optId),
            }),
          );
          await actor.saveQuizResult({
            completedAt: BigInt(Date.now()) * BigInt(1_000_000),
            answers: quizAnswers,
            recommendedStream: stream,
          });
          await actor.setActiveStream(stream);
        } catch (err) {
          console.error("Failed to save quiz result:", err);
        }
      }
    } else {
      nextQuestion();
    }
  };

  const handlePrev = () => {
    setAnimDir(-1);
    prevQuestion();
  };

  const handleRetake = () => {
    resetQuiz();
    setPhase("intro");
  };

  // ── Intro phase ──
  if (phase === "intro") {
    return <QuizIntro onStart={handleStart} />;
  }

  // ── Results phase ──
  if (phase === "results" && recommendedStream) {
    return (
      <QuizResult
        recommendedStream={recommendedStream}
        onRetake={handleRetake}
      />
    );
  }

  // ── Questions phase ──
  return (
    <div className="max-w-2xl mx-auto px-4">
      <PageHeader
        title="Mindset Quiz"
        subtitle="Answer honestly — there are no right or wrong answers. This is about YOU."
        badge={
          <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
            Question {currentIndex + 1} of {QUESTIONS.length}
          </span>
        }
      />

      {/* Progress bar */}
      <div className="mb-6">
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground text-right mt-1">
          {Math.round(progress)}% complete
        </p>
      </div>

      <AnimatePresence mode="wait">
        {currentQ && (
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: animDir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: animDir * -40 }}
            transition={{ duration: 0.28 }}
            className="bg-card rounded-2xl border border-border shadow-card p-6 mb-6"
            data-ocid="quiz-question"
          >
            <h2 className="font-display font-bold text-lg md:text-xl text-foreground mb-6">
              {currentQ.text}
            </h2>

            <div className="grid gap-3">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAnswer(currentQ.id, opt.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-smooth touch-target ${
                      isSelected
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-background hover:bg-primary/5 hover:border-primary/30 text-foreground"
                    }`}
                    data-ocid={`quiz-option-${opt.id}`}
                  >
                    <span className="text-2xl shrink-0">{opt.emoji}</span>
                    <span className="text-sm font-medium leading-snug flex-1">
                      {opt.text}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-primary ml-auto shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between pb-8">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="touch-target flex items-center gap-1.5"
          data-ocid="quiz-prev-btn"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <CTAButton
          type="button"
          variant="primary"
          onClick={handleNext}
          disabled={!selectedOption}
          showArrow
          data-ocid="quiz-next-btn"
        >
          {isLast ? "See My Result" : "Next"}
        </CTAButton>
      </div>
    </div>
  );
}
