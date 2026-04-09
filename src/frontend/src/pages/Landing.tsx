import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Sparkles, Star, Target, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import CTAButton from "../components/CTAButton";
import StreamCard from "../components/StreamCard";
import { STREAM_META } from "../types";

// ── 15 Minecraft-style motivational quotes ─────────────────────────────────
const MINECRAFT_QUOTES = [
  "Every expert was once a beginner.",
  "Your career, your rules.",
  "Explore. Learn. Grow.",
  "The best time to start is NOW.",
  "Dream big. Work smart.",
  "Skills build futures, block by block.",
  "Curiosity is your superpower.",
  "One step at a time — you've got this!",
  "Your passion IS a valid career.",
  "Don't compare your chapter 1 to someone's chapter 20.",
  "The world needs what only YOU can build.",
  "Level up every single day.",
  "Fail fast. Learn faster.",
  "Your career isn't a straight line — and that's okay.",
  "Be the version of yourself you'd be proud of.",
];

// ── Minecraft pixel quote panel (warm espresso theme) ───────────────────────
function MinecraftQuoteBlock() {
  const [idx, setIdx] = useState(() =>
    Math.floor(Math.random() * MINECRAFT_QUOTES.length),
  );
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % MINECRAFT_QUOTES.length);
        setVisible(true);
      }, 380);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Press Start 2P pixel font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');`}</style>

      <div
        className="relative mx-auto w-full max-w-2xl rounded-2xl overflow-hidden select-none"
        data-ocid="minecraft-quote-block"
        style={{
          background:
            "repeating-linear-gradient(0deg, #2d1a0a 0px, #2d1a0a 1px, transparent 1px, transparent 28px)," +
            "repeating-linear-gradient(90deg, #2d1a0a 0px, #2d1a0a 1px, transparent 1px, transparent 28px)," +
            "linear-gradient(135deg, #4a2c0e 0%, #33200a 45%, #281808 60%, #3e2810 100%)",
          boxShadow: "0 0 0 3px #8b5e2a, 0 8px 32px 0 rgba(100,56,10,0.55)",
        }}
      >
        {/* Peach pixel corner chips */}
        <div
          className="absolute top-0 left-0 w-3 h-3"
          style={{ background: "oklch(0.72 0.14 50)" }}
        />
        <div
          className="absolute top-0 right-0 w-3 h-3"
          style={{ background: "oklch(0.72 0.14 50)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-3 h-3"
          style={{ background: "oklch(0.72 0.14 50)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-3 h-3"
          style={{ background: "oklch(0.72 0.14 50)" }}
        />

        {/* Inner gold border */}
        <div
          className="absolute inset-[3px] rounded-xl pointer-events-none"
          style={{ border: "2px solid #9b6e1c" }}
        />

        <div className="relative px-6 sm:px-10 py-8 flex flex-col items-center text-center gap-4">
          {/* Label */}
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              color: "#f5d76e",
              textShadow: "0 0 10px #f5d76e88",
              fontSize: "9px",
              letterSpacing: "0.15em",
            }}
          >
            ✦ LOADING WISDOM... ✦
          </span>

          {/* Animated quote */}
          <div className="min-h-[100px] sm:min-h-[88px] flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              {visible && (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    color: "#fffde7",
                    textShadow: "2px 2px 0 #4a2c00, 0 0 24px #f5d76e33",
                    fontSize: "clamp(10px, 2.2vw, 15px)",
                    lineHeight: "2.2",
                    wordBreak: "break-word",
                  }}
                >
                  "{MINECRAFT_QUOTES[idx]}"
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Pixel dot progress */}
          <div
            className="flex flex-wrap gap-1.5 justify-center"
            aria-hidden="true"
          >
            {MINECRAFT_QUOTES.map((quote, i) => (
              <button
                key={quote.slice(0, 16)}
                type="button"
                aria-label={`Quote ${i + 1}`}
                onClick={() => {
                  setVisible(false);
                  setTimeout(() => {
                    setIdx(i);
                    setVisible(true);
                  }, 200);
                }}
                className="w-2.5 h-2.5 transition-all duration-300"
                style={{
                  background: i === idx ? "oklch(0.72 0.14 50)" : "#5a3a10",
                  boxShadow: i === idx ? "0 0 6px oklch(0.72 0.14 50)" : "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Stats strip data ────────────────────────────────────────────────────────
const STATS = [
  { value: "418+", label: "Career Paths" },
  { value: "4", label: "Career Streams" },
  { value: "3 min", label: "Mindset Quiz" },
  { value: "Free", label: "To Start" },
];

// ── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero: peach-to-cream gradient with sage green glow ─────────── */}
      <section
        className="relative overflow-hidden border-b border-border"
        style={{
          background:
            "linear-gradient(150deg, oklch(0.95 0.04 50) 0%, oklch(0.98 0.015 55) 55%, oklch(0.93 0.05 145) 100%)",
        }}
      >
        {/* Decorative glows — peach + sage */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.82 0.18 50)" }}
        />
        <div
          className="absolute bottom-0 -left-16 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.72 0.12 145)" }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-10 md:pt-20 md:pb-14">
          <div className="flex flex-col items-center text-center gap-5">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-card/80 backdrop-blur border border-border rounded-full px-4 py-2 text-xs font-semibold text-foreground"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              For Grade 10–12 Students
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight max-w-3xl"
            >
              Discover Your{" "}
              <span
                style={{
                  background:
                    "linear-gradient(130deg, oklch(0.58 0.2 40), oklch(0.62 0.18 85))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Career Path
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              Explore, quiz, and build a personalized roadmap for the career
              you'll love — block by block.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            >
              <Link to="/quiz">
                <CTAButton
                  variant="hero"
                  showArrow
                  className="w-full sm:w-auto gap-2"
                  data-ocid="hero-quiz-cta"
                >
                  <Compass className="w-4 h-4" />
                  Take the Mindset Quiz
                </CTAButton>
              </Link>
              <Link to="/streams">
                {/* Sage green secondary as strong accent */}
                <CTAButton
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto gap-2"
                  data-ocid="hero-streams-cta"
                >
                  Explore Career Streams
                  <ArrowRight className="w-4 h-4" />
                </CTAButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────────────── */}
      <section className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="grid grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p className="font-display font-bold text-xl sm:text-2xl text-primary">
                  {stat.value}
                </p>
                <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Minecraft Quote Block ─────────────────────────────────────── */}
      <section className="bg-muted/40 border-b border-border py-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <MinecraftQuoteBlock />
        </motion.div>
      </section>

      {/* ── Career Streams ────────────────────────────────────────────── */}
      <section className="bg-background py-10 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7"
          >
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                Explore Career Streams
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Four worlds to explore — pick the one that sparks your
                curiosity.
              </p>
            </div>
            <Link
              to="/streams"
              className="text-sm font-semibold text-primary hover:underline shrink-0 transition-smooth"
              data-ocid="streams-view-all"
            >
              View all →
            </Link>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            {STREAM_META.map((stream, i) => (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <StreamCard stream={stream} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works (sage green icon accents) ────────────────────── */}
      <section className="bg-muted/30 border-t border-border py-10 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8 text-center"
          >
            How Career Sandbox Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Target className="w-6 h-6" />,
                title: "1. Take the Mindset Quiz",
                desc: "Answer personality-based questions (no career knowledge needed) to discover which stream fits how YOUR brain works.",
                // sage green icon bg
                iconBg: "bg-accent/15 text-accent",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "2. Explore Your Stream",
                desc: "Dive into quizzes, micro-projects, and real career profiles tailored to your personality stream.",
                // peach icon bg
                iconBg: "bg-primary/12 text-primary",
              },
              {
                icon: <Star className="w-6 h-6" />,
                title: "3. Download Your Roadmap",
                desc: "Get a personalized 3–5 year career roadmap you can download as a PDF and share with anyone.",
                // sage green icon bg
                iconBg: "bg-accent/15 text-accent",
              },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{
                  opacity: 0,
                  x: i === 1 ? 0 : i === 0 ? -16 : 16,
                  y: i === 1 ? 16 : 0,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-card rounded-xl p-6 shadow-card border border-border"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${step.iconBg}`}
                >
                  {step.icon}
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 text-center"
          >
            <Link to="/quiz">
              <CTAButton variant="hero" showArrow data-ocid="landing-quiz-cta">
                Start Your Journey — It's Free
              </CTAButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom CTA Banner: peach-to-terracotta gradient ────────────── */}
      <section
        className="py-14 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.18 48) 0%, oklch(0.60 0.22 35) 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center flex flex-col items-center gap-5"
        >
          <h2
            className="font-display font-bold text-2xl sm:text-3xl leading-snug"
            style={{ color: "oklch(0.97 0.01 55)" }}
          >
            Not sure where to start? <br className="hidden sm:block" />
            Let your mindset guide you.
          </h2>
          <p className="text-base" style={{ color: "oklch(0.93 0.05 55)" }}>
            Our 3-minute mindset quiz matches you to the career stream built for
            how YOUR brain works — no career knowledge needed.
          </p>
          <Link to="/quiz">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full font-bold text-base px-8 py-4 min-h-12 shadow-elevated transition-smooth hover:brightness-105 hover:-translate-y-0.5"
              style={{
                background: "oklch(0.98 0.015 55)",
                color: "oklch(0.42 0.18 38)",
              }}
              data-ocid="bottom-cta-quiz"
            >
              <Compass className="w-5 h-5" />
              Take the Mindset Quiz — Free
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
