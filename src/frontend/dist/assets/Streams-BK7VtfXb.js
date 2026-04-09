import { c as createLucideIcon, d as useAuth, j as jsxRuntimeExports, S as Sparkles, L as Link, u as useActor, g as useQuery, C as CareerStream, f as createActor } from "./index-DjbwzvVy.js";
import { P as PageHeader } from "./PageHeader-CLg6hBYS.js";
import { S as StreamCard } from "./StreamCard-DV87-Jiu.js";
import { S as STREAM_META } from "./types-CkSawsG_.js";
import { m as motion } from "./proxy-C-5a5GeL.js";
import { C as CircleCheck } from "./circle-check-C_MaQlia.js";
import "./arrow-right-CJXVtCt-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode);
function useAllProgress() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["allProgress"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMyProgress();
    },
    enabled: !!actor && !isFetching && isAuthenticated
  });
}
const STREAM_ENUM_MAP = {
  contentGaming: CareerStream.contentGaming,
  science: CareerStream.science,
  commerce: CareerStream.commerce,
  arts: CareerStream.arts
};
function getProgressPct(progress) {
  if (!progress) return 0;
  const quizzes = Math.min(Number(progress.completedQuizzes.length), 3);
  const projects = Math.min(Number(progress.completedMicroProjects.length), 3);
  return Math.round((quizzes + projects) / 6 * 100);
}
function isStreamComplete(progress) {
  if (!progress) return false;
  return progress.completedQuizzes.length >= 3 && progress.completedMicroProjects.length >= 2;
}
function StreamsPage() {
  const { data: allProgress } = useAllProgress();
  const { isAuthenticated } = useAuth();
  const getProgress = (streamId) => {
    const streamEnum = STREAM_ENUM_MAP[streamId];
    return allProgress == null ? void 0 : allProgress.find((p) => p.stream === streamEnum);
  };
  const completedCount = STREAM_META.filter(
    (s) => isStreamComplete(getProgress(s.id))
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Explore Career Streams",
        subtitle: "Pick a path that sparks your curiosity — dive into quizzes, hands-on projects, and your personalized roadmap.",
        badge: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3.5 h-3.5" }),
          "4 Career Paths"
        ] })
      }
    ) }) }),
    isAuthenticated && completedCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-primary shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground", children: [
        "You've completed",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: completedCount }),
        " ",
        "of 4 streams. Keep going!"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-6 space-y-4",
        "data-ocid": "streams-list",
        children: STREAM_META.map((stream, index) => {
          const progress = getProgress(stream.id);
          const pct = getProgressPct(progress);
          const complete = isStreamComplete(progress);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: {
                delay: index * 0.08,
                duration: 0.38,
                ease: "easeOut"
              },
              className: "relative",
              "data-ocid": `stream-row-${stream.id}`,
              children: [
                complete && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute -top-2 -right-2 z-10 bg-primary text-primary-foreground rounded-full p-1 shadow-card",
                    "aria-label": "Stream completed",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StreamCard,
                  {
                    stream,
                    progress: pct > 0 ? pct : void 0
                  }
                )
              ]
            },
            stream.id
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground mb-2", children: "Not sure which stream fits you?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Take the 5-minute mindset quiz to get a personalised recommendation." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/quiz",
          className: "inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-smooth touch-target",
          "data-ocid": "streams-quiz-cta",
          children: "Take the Mindset Quiz →"
        }
      )
    ] }) })
  ] });
}
export {
  StreamsPage as default
};
