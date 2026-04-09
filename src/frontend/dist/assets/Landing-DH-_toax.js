import { c as createLucideIcon, j as jsxRuntimeExports, S as Sparkles, L as Link, r as reactExports } from "./index-DjbwzvVy.js";
import { C as CTAButton } from "./CTAButton-pFUcJbHN.js";
import { S as StreamCard } from "./StreamCard-DV87-Jiu.js";
import { S as STREAM_META } from "./types-CkSawsG_.js";
import { m as motion } from "./proxy-C-5a5GeL.js";
import { A as ArrowRight } from "./arrow-right-CJXVtCt-.js";
import { Z as Zap } from "./zap-CG5VVwpl.js";
import { S as Star } from "./star-e8YcrMVJ.js";
import { A as AnimatePresence } from "./index-Bpp051D5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
      key: "9ktpf1"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Compass = createLucideIcon("compass", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode);
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
  "Be the version of yourself you'd be proud of."
];
function MinecraftQuoteBlock() {
  const [idx, setIdx] = reactExports.useState(
    () => Math.floor(Math.random() * MINECRAFT_QUOTES.length)
  );
  const [visible, setVisible] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % MINECRAFT_QUOTES.length);
        setVisible(true);
      }, 380);
    }, 6500);
    return () => clearInterval(timer);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative mx-auto w-full max-w-2xl rounded-2xl overflow-hidden select-none",
        "data-ocid": "minecraft-quote-block",
        style: {
          background: "repeating-linear-gradient(0deg, #2d1a0a 0px, #2d1a0a 1px, transparent 1px, transparent 28px),repeating-linear-gradient(90deg, #2d1a0a 0px, #2d1a0a 1px, transparent 1px, transparent 28px),linear-gradient(135deg, #4a2c0e 0%, #33200a 45%, #281808 60%, #3e2810 100%)",
          boxShadow: "0 0 0 3px #8b5e2a, 0 8px 32px 0 rgba(100,56,10,0.55)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-0 left-0 w-3 h-3",
              style: { background: "oklch(0.72 0.14 50)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-0 right-0 w-3 h-3",
              style: { background: "oklch(0.72 0.14 50)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-0 left-0 w-3 h-3",
              style: { background: "oklch(0.72 0.14 50)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-0 right-0 w-3 h-3",
              style: { background: "oklch(0.72 0.14 50)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-[3px] rounded-xl pointer-events-none",
              style: { border: "2px solid #9b6e1c" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-6 sm:px-10 py-8 flex flex-col items-center text-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  fontFamily: "'Press Start 2P', monospace",
                  color: "#f5d76e",
                  textShadow: "0 0 10px #f5d76e88",
                  fontSize: "9px",
                  letterSpacing: "0.15em"
                },
                children: "✦ LOADING WISDOM... ✦"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[100px] sm:min-h-[88px] flex items-center justify-center w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: visible && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.p,
              {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -8 },
                transition: { duration: 0.35 },
                style: {
                  fontFamily: "'Press Start 2P', monospace",
                  color: "#fffde7",
                  textShadow: "2px 2px 0 #4a2c00, 0 0 24px #f5d76e33",
                  fontSize: "clamp(10px, 2.2vw, 15px)",
                  lineHeight: "2.2",
                  wordBreak: "break-word"
                },
                children: [
                  '"',
                  MINECRAFT_QUOTES[idx],
                  '"'
                ]
              },
              idx
            ) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex flex-wrap gap-1.5 justify-center",
                "aria-hidden": "true",
                children: MINECRAFT_QUOTES.map((quote, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Quote ${i + 1}`,
                    onClick: () => {
                      setVisible(false);
                      setTimeout(() => {
                        setIdx(i);
                        setVisible(true);
                      }, 200);
                    },
                    className: "w-2.5 h-2.5 transition-all duration-300",
                    style: {
                      background: i === idx ? "oklch(0.72 0.14 50)" : "#5a3a10",
                      boxShadow: i === idx ? "0 0 6px oklch(0.72 0.14 50)" : "none",
                      cursor: "pointer"
                    }
                  },
                  quote.slice(0, 16)
                ))
              }
            )
          ] })
        ]
      }
    )
  ] });
}
const STATS = [
  { value: "418+", label: "Career Paths" },
  { value: "4", label: "Career Streams" },
  { value: "3 min", label: "Mindset Quiz" },
  { value: "Free", label: "To Start" }
];
function LandingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden border-b border-border",
        style: {
          background: "linear-gradient(150deg, oklch(0.95 0.04 50) 0%, oklch(0.98 0.015 55) 55%, oklch(0.93 0.05 145) 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30 blur-3xl pointer-events-none",
              style: { background: "oklch(0.82 0.18 50)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-0 -left-16 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none",
              style: { background: "oklch(0.72 0.12 145)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-10 md:pt-20 md:pb-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: -10 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4 },
                className: "inline-flex items-center gap-2 bg-card/80 backdrop-blur border border-border rounded-full px-4 py-2 text-xs font-semibold text-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-primary" }),
                  "For Grade 10–12 Students"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.h1,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.1 },
                className: "font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight max-w-3xl",
                children: [
                  "Discover Your",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        background: "linear-gradient(130deg, oklch(0.58 0.2 40), oklch(0.62 0.18 85))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      },
                      children: "Career Path"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.2 },
                className: "text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed",
                children: "Explore, quiz, and build a personalized roadmap for the career you'll love — block by block."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.3 },
                className: "flex flex-col sm:flex-row gap-3 w-full sm:w-auto",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quiz", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    CTAButton,
                    {
                      variant: "hero",
                      showArrow: true,
                      className: "w-full sm:w-auto gap-2",
                      "data-ocid": "hero-quiz-cta",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-4 h-4" }),
                        "Take the Mindset Quiz"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/streams", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    CTAButton,
                    {
                      variant: "secondary",
                      size: "lg",
                      className: "w-full sm:w-auto gap-2",
                      "data-ocid": "hero-streams-cta",
                      children: [
                        "Explore Career Streams",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                      ]
                    }
                  ) })
                ]
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-4", children: STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.08 },
        className: "text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl sm:text-2xl text-primary", children: stat.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] sm:text-xs text-muted-foreground mt-0.5", children: stat.label })
        ]
      },
      stat.label
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 border-b border-border py-10 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.97 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(MinecraftQuoteBlock, {})
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-10 md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl md:text-3xl text-foreground", children: "Explore Career Streams" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Four worlds to explore — pick the one that sparks your curiosity." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/streams",
                className: "text-sm font-semibold text-primary hover:underline shrink-0 transition-smooth",
                "data-ocid": "streams-view-all",
                children: "View all →"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: STREAM_META.map((stream, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(StreamCard, { stream })
        },
        stream.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-t border-border py-10 md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h2,
        {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          className: "font-display font-bold text-2xl md:text-3xl text-foreground mb-8 text-center",
          children: "How Career Sandbox Works"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-6 h-6" }),
          title: "1. Take the Mindset Quiz",
          desc: "Answer personality-based questions (no career knowledge needed) to discover which stream fits how YOUR brain works.",
          // sage green icon bg
          iconBg: "bg-accent/15 text-accent"
        },
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-6 h-6" }),
          title: "2. Explore Your Stream",
          desc: "Dive into quizzes, micro-projects, and real career profiles tailored to your personality stream.",
          // peach icon bg
          iconBg: "bg-primary/12 text-primary"
        },
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-6 h-6" }),
          title: "3. Download Your Roadmap",
          desc: "Get a personalized 3–5 year career roadmap you can download as a PDF and share with anyone.",
          // sage green icon bg
          iconBg: "bg-accent/15 text-accent"
        }
      ].map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: {
            opacity: 0,
            x: i === 1 ? 0 : i === 0 ? -16 : 16,
            y: i === 1 ? 16 : 0
          },
          whileInView: { opacity: 1, x: 0, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.12 },
          className: "bg-card rounded-xl p-6 shadow-card border border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${step.iconBg}`,
                children: step.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-2", children: step.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: step.desc })
          ]
        },
        step.title
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.3 },
          className: "mt-10 text-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quiz", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CTAButton, { variant: "hero", showArrow: true, "data-ocid": "landing-quiz-cta", children: "Start Your Journey — It's Free" }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-14 px-4",
        style: {
          background: "linear-gradient(135deg, oklch(0.68 0.18 48) 0%, oklch(0.60 0.22 35) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            className: "max-w-2xl mx-auto text-center flex flex-col items-center gap-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "h2",
                {
                  className: "font-display font-bold text-2xl sm:text-3xl leading-snug",
                  style: { color: "oklch(0.97 0.01 55)" },
                  children: [
                    "Not sure where to start? ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden sm:block" }),
                    "Let your mindset guide you."
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base", style: { color: "oklch(0.93 0.05 55)" }, children: "Our 3-minute mindset quiz matches you to the career stream built for how YOUR brain works — no career knowledge needed." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quiz", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "inline-flex items-center gap-2 rounded-full font-bold text-base px-8 py-4 min-h-12 shadow-elevated transition-smooth hover:brightness-105 hover:-translate-y-0.5",
                  style: {
                    background: "oklch(0.98 0.015 55)",
                    color: "oklch(0.42 0.18 38)"
                  },
                  "data-ocid": "bottom-cta-quiz",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-5 h-5" }),
                    "Take the Mindset Quiz — Free"
                  ]
                }
              ) })
            ]
          }
        )
      }
    )
  ] });
}
export {
  LandingPage as default
};
