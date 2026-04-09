import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as Primitive, a as createContextScope, b as cn, R as React, u as useActor, d as useAuth, B as Button, e as useNavigate, S as Sparkles, f as createActor } from "./index-DjbwzvVy.js";
import { C as CTAButton } from "./CTAButton-pFUcJbHN.js";
import { P as PageHeader } from "./PageHeader-CLg6hBYS.js";
import { S as STREAM_META } from "./types-CkSawsG_.js";
import { A as AnimatePresence } from "./index-Bpp051D5.js";
import { m as motion } from "./proxy-C-5a5GeL.js";
import { C as CircleCheck } from "./circle-check-C_MaQlia.js";
import { A as ArrowRight } from "./arrow-right-CJXVtCt-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode);
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    React.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
const useQuizStore = create((set) => ({
  currentIndex: 0,
  answers: {},
  completed: false,
  recommendedStream: null,
  setAnswer: (questionId, optionId) => set((state) => ({
    answers: { ...state.answers, [questionId]: optionId }
  })),
  nextQuestion: () => set((state) => ({ currentIndex: state.currentIndex + 1 })),
  prevQuestion: () => set((state) => ({
    currentIndex: Math.max(0, state.currentIndex - 1)
  })),
  completeQuiz: (stream) => set({ completed: true, recommendedStream: stream }),
  resetQuiz: () => set({
    currentIndex: 0,
    answers: {},
    completed: false,
    recommendedStream: null
  })
}));
const QUESTIONS = [
  {
    id: 1,
    text: "When you have free time, what do you most enjoy?",
    options: [
      { id: 1, text: "Creating art, music, videos, or games", emoji: "🎨" },
      {
        id: 2,
        text: "Reading, experimenting, or building things",
        emoji: "🔭"
      },
      {
        id: 3,
        text: "Organising plans, spreadsheets, or side hustles",
        emoji: "📊"
      },
      { id: 4, text: "Performing, dancing, or doing theatre", emoji: "🎭" }
    ]
  },
  {
    id: 2,
    text: "You feel most energised when...",
    options: [
      { id: 1, text: "You're deep in a creative flow state", emoji: "✨" },
      { id: 2, text: "You crack a difficult problem or puzzle", emoji: "🧩" },
      { id: 3, text: "You hit a goal or close a deal", emoji: "🏆" },
      { id: 4, text: "You move, perform, or express yourself", emoji: "🌟" }
    ]
  },
  {
    id: 3,
    text: "Your friends would describe you as...",
    options: [
      { id: 1, text: "The imaginative, out-of-the-box thinker", emoji: "💡" },
      {
        id: 2,
        text: "The curious one who asks 'why' about everything",
        emoji: "🤔"
      },
      { id: 3, text: "The organiser who always has a plan", emoji: "📋" },
      { id: 4, text: "The expressive, emotional, heartfelt one", emoji: "💖" }
    ]
  },
  {
    id: 4,
    text: "When you face a hard problem, you prefer to...",
    options: [
      { id: 1, text: "Brainstorm wild ideas and try them out", emoji: "🌀" },
      { id: 2, text: "Research it thoroughly before acting", emoji: "🔍" },
      { id: 3, text: "Make a step-by-step action plan", emoji: "🗂️" },
      { id: 4, text: "Talk it through with someone you trust", emoji: "💬" }
    ]
  },
  {
    id: 5,
    text: "What kind of content do you enjoy consuming most?",
    options: [
      {
        id: 1,
        text: "YouTube videos, gaming streams, memes, short films",
        emoji: "📹"
      },
      {
        id: 2,
        text: "Documentaries, science podcasts, explainer videos",
        emoji: "🎙️"
      },
      {
        id: 3,
        text: "Business news, startup stories, finance tips",
        emoji: "📰"
      },
      {
        id: 4,
        text: "Fashion, photography, music, or visual art feeds",
        emoji: "🎵"
      }
    ]
  },
  {
    id: 6,
    text: "In a group project, you naturally take the role of...",
    options: [
      {
        id: 1,
        text: "The creative lead — design, visuals, storytelling",
        emoji: "🖌️"
      },
      {
        id: 2,
        text: "The researcher — gathering and analysing data",
        emoji: "🧪"
      },
      {
        id: 3,
        text: "The manager — deadlines, delegation, delivery",
        emoji: "🎯"
      },
      {
        id: 4,
        text: "The presenter — performing and communicating ideas",
        emoji: "📢"
      }
    ]
  },
  {
    id: 7,
    text: "What matters most to you in a future goal?",
    options: [
      {
        id: 1,
        text: "Building something that people love and use",
        emoji: "🚀"
      },
      {
        id: 2,
        text: "Making a discovery or solving a real-world problem",
        emoji: "🌍"
      },
      {
        id: 3,
        text: "Growing wealth and leading a successful team",
        emoji: "💼"
      },
      {
        id: 4,
        text: "Leaving a cultural or emotional impact on the world",
        emoji: "🎼"
      }
    ]
  },
  {
    id: 8,
    text: "How do you best learn something new?",
    options: [
      {
        id: 1,
        text: "Watching tutorials and making stuff immediately",
        emoji: "🎬"
      },
      { id: 2, text: "Reading deeply, then testing hypotheses", emoji: "📚" },
      {
        id: 3,
        text: "Taking structured courses with clear milestones",
        emoji: "🏫"
      },
      {
        id: 4,
        text: "Workshops, jams, rehearsals, hands-on practice",
        emoji: "🤲"
      }
    ]
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
        emoji: "💪"
      }
    ]
  },
  {
    id: 10,
    text: "Your ideal weekend involves...",
    options: [
      {
        id: 1,
        text: "Building a game, editing a video, or creating content",
        emoji: "🕹️"
      },
      {
        id: 2,
        text: "A science museum, DIY experiment, or coding marathon",
        emoji: "⚗️"
      },
      {
        id: 3,
        text: "A startup workshop, networking event, or market visit",
        emoji: "🤝"
      },
      {
        id: 4,
        text: "A concert, gallery opening, open mic, or performance",
        emoji: "🎨"
      }
    ]
  }
];
const MATCH_REASONS = {
  contentGaming: "You're a born creator! Your answers show a playful, expressive mind that thrives on making things people love. Content creation, game design, and digital media are where your energy shines brightest.",
  science: "You're a natural problem-solver. Your curiosity, love of deep research, and drive to understand how things work make Science & Tech an ideal fit. You'll thrive in engineering, research, and innovation.",
  commerce: "You think like a leader. Your goal-oriented, strategic mindset and love of organisation make Commerce and Entrepreneurship your natural arena. Building teams and businesses is your calling.",
  arts: "You feel deeply and express powerfully. Your emotional intelligence, need for authentic expression, and flair for performance point straight to the Arts — fashion, music, design, and beyond."
};
const STREAM_BY_OPTION = {
  1: "contentGaming",
  2: "science",
  3: "commerce",
  4: "arts"
};
function computeRecommendedStream(answers) {
  const tally = {};
  for (const optionId of Object.values(answers)) {
    const stream = STREAM_BY_OPTION[optionId];
    if (stream) tally[stream] = (tally[stream] ?? 0) + 1;
  }
  let best = "contentGaming";
  let max = 0;
  for (const [stream, count] of Object.entries(tally)) {
    if (count > max) {
      max = count;
      best = stream;
    }
  }
  return best;
}
function QuizIntro({ onStart }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
      className: "bg-card rounded-2xl border border-border shadow-elevated overflow-hidden",
      "data-ocid": "quiz-intro",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary px-8 py-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-3", children: "🧠" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl md:text-3xl text-primary-foreground", children: "Discover Your Mindset" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-sm mt-1", children: "10 questions · ~3 minutes" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 py-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground text-base leading-relaxed mb-2", children: [
            "Answer a few questions about",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "yourself" }),
            " — not about careers!"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8", children: "We'll analyse your personality, energy, and natural tendencies to suggest the career stream that fits you best. There are no right or wrong answers." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 mb-8 text-left", children: [
            {
              emoji: "🎯",
              label: "Personalised match",
              sub: "Based on your unique personality"
            },
            {
              emoji: "🔒",
              label: "No judgment",
              sub: "All answers are private and secure"
            },
            {
              emoji: "⚡",
              label: "Quick & fun",
              sub: "10 questions, no long text"
            },
            {
              emoji: "🗺️",
              label: "Career roadmap",
              sub: "Unlock your path after the quiz"
            }
          ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-muted/40 rounded-xl p-3 flex items-start gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl shrink-0", children: item.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: item.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.sub })
                ] })
              ]
            },
            item.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CTAButton,
            {
              type: "button",
              variant: "hero",
              size: "lg",
              showArrow: true,
              onClick: onStart,
              className: "w-full sm:w-auto",
              "data-ocid": "quiz-start-btn",
              children: "Start Quiz"
            }
          )
        ] })
      ]
    }
  ) });
}
function QuizResult({
  recommendedStream,
  onRetake
}) {
  const navigate = useNavigate();
  const stream = STREAM_META.find((s) => s.id === recommendedStream);
  const matchReason = MATCH_REASONS[recommendedStream] ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 py-8", "data-ocid": "quiz-result", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5 },
      className: "bg-card rounded-2xl border border-border shadow-elevated overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/10 border-b border-border px-8 py-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0 },
              animate: { scale: 1 },
              transition: { delay: 0.2, type: "spring", stiffness: 200 },
              className: "w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-primary-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Your Mindset Match!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Based on your personality, we recommend:" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 py-6", children: [
          stream && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.3, duration: 0.4 },
              className: "rounded-2xl p-6 mb-6 text-center",
              style: {
                background: `${stream.accentColor}15`,
                border: `2px solid ${stream.accentColor}50`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-3", children: stream.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-1", children: stream.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: stream.tagline })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.45, duration: 0.4 },
              className: "bg-muted/40 rounded-xl p-4 mb-6 flex gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: matchReason })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.55, duration: 0.4 },
              className: "flex flex-col gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  CTAButton,
                  {
                    type: "button",
                    variant: "primary",
                    size: "lg",
                    showArrow: true,
                    onClick: () => navigate({
                      to: "/streams/$streamId",
                      params: { streamId: recommendedStream }
                    }),
                    className: "w-full justify-center",
                    "data-ocid": "quiz-explore-cta",
                    children: [
                      "Explore ",
                      (stream == null ? void 0 : stream.label) ?? "This Stream"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => navigate({ to: "/streams" }),
                      className: "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full border-2 border-border bg-background text-foreground font-semibold text-sm hover:bg-muted transition-smooth touch-target",
                      "data-ocid": "quiz-all-streams-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" }),
                        "See All Streams"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onRetake,
                      className: "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full border-2 border-border bg-background text-muted-foreground font-semibold text-sm hover:bg-muted transition-smooth touch-target",
                      "data-ocid": "quiz-restart-btn",
                      children: "Retake Quiz"
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function QuizPage() {
  const { actor } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  const [phase, setPhase] = reactExports.useState(
    "intro"
  );
  const [animDir, setAnimDir] = reactExports.useState(1);
  const {
    currentIndex,
    answers,
    recommendedStream,
    setAnswer,
    nextQuestion,
    prevQuestion,
    completeQuiz,
    resetQuiz
  } = useQuizStore();
  const currentQ = QUESTIONS[currentIndex];
  const progress = (currentIndex + 1) / QUESTIONS.length * 100;
  const selectedOption = answers[currentQ == null ? void 0 : currentQ.id];
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
      if (isAuthenticated && actor) {
        try {
          const quizAnswers = Object.entries(allAnswers).map(
            ([qId, optId]) => ({
              questionId: BigInt(qId),
              selectedOption: BigInt(optId)
            })
          );
          await actor.saveQuizResult({
            completedAt: BigInt(Date.now()) * BigInt(1e6),
            answers: quizAnswers,
            recommendedStream: stream
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
  if (phase === "intro") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(QuizIntro, { onStart: handleStart });
  }
  if (phase === "results" && recommendedStream) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      QuizResult,
      {
        recommendedStream,
        onRetake: handleRetake
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Mindset Quiz",
        subtitle: "Answer honestly — there are no right or wrong answers. This is about YOU.",
        badge: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full", children: [
          "Question ",
          currentIndex + 1,
          " of ",
          QUESTIONS.length
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right mt-1", children: [
        Math.round(progress),
        "% complete"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: currentQ && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: animDir * 40 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: animDir * -40 },
        transition: { duration: 0.28 },
        className: "bg-card rounded-2xl border border-border shadow-card p-6 mb-6",
        "data-ocid": "quiz-question",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg md:text-xl text-foreground mb-6", children: currentQ.text }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: currentQ.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setAnswer(currentQ.id, opt.id),
                className: `w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-smooth touch-target ${isSelected ? "border-primary bg-primary/10 text-foreground" : "border-border bg-background hover:bg-primary/5 hover:border-primary/30 text-foreground"}`,
                "data-ocid": `quiz-option-${opt.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl shrink-0", children: opt.emoji }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium leading-snug flex-1", children: opt.text }),
                  isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-primary ml-auto shrink-0" })
                ]
              },
              opt.id
            );
          }) })
        ]
      },
      currentQ.id
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: handlePrev,
          disabled: currentIndex === 0,
          className: "touch-target flex items-center gap-1.5",
          "data-ocid": "quiz-prev-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
            "Previous"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CTAButton,
        {
          type: "button",
          variant: "primary",
          onClick: handleNext,
          disabled: !selectedOption,
          showArrow: true,
          "data-ocid": "quiz-next-btn",
          children: isLast ? "See My Result" : "Next"
        }
      )
    ] })
  ] });
}
export {
  QuizPage as default
};
