import { c as createLucideIcon, j as jsxRuntimeExports, b as cn, u as useActor, d as useAuth, i as useSubscription, l as useQueryClient, r as reactExports, g as useQuery, k as Skeleton, B as Button, C as CareerStream, X, S as Sparkles, f as createActor } from "./index-DjbwzvVy.js";
import { B as Badge } from "./badge-CLfMDJBE.js";
import { C as Card } from "./card-wY6ZCGgf.js";
import { u as useMutation, a as ue } from "./index-JTaet32S.js";
import { C as CTAButton } from "./CTAButton-pFUcJbHN.js";
import { P as PageHeader } from "./PageHeader-CLg6hBYS.js";
import { S as STREAM_META } from "./types-CkSawsG_.js";
import { M as MapPin, D as Download } from "./map-pin-yEObx8oV.js";
import { m as motion } from "./proxy-C-5a5GeL.js";
import { C as CircleCheck } from "./circle-check-C_MaQlia.js";
import "./arrow-right-CJXVtCt-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
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
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function buildDefaultMilestones(stream) {
  const templates = {
    contentGaming: [
      {
        year: 1n,
        title: "Foundation Year",
        description: "Build core skills in design, storytelling, and digital tools.",
        actions: [
          "Complete 3 online design or media courses",
          "Start a personal blog, channel, or portfolio site",
          "Learn the basics of one creative tool (Figma, Blender, or Premiere)"
        ],
        skills: ["Design Thinking", "Content Writing", "Basic Video Editing"]
      },
      {
        year: 2n,
        title: "Portfolio Building",
        description: "Create real projects that demonstrate your creative abilities to the world.",
        actions: [
          "Build a small game prototype or interactive piece",
          "Collaborate on a short film or content series",
          "Publish your work on a public platform"
        ],
        skills: ["Game Design", "Video Production", "Storytelling"]
      },
      {
        year: 3n,
        title: "Industry Entry",
        description: "Land your first industry experience and grow your professional network.",
        actions: [
          "Apply for internships at studios or agencies",
          "Attend game jams, hackathons, or creative festivals",
          "Build relationships with 3 professionals in your field"
        ],
        skills: [
          "Professional Portfolio",
          "Networking",
          "Client Communication"
        ]
      }
    ],
    science: [
      {
        year: 1n,
        title: "STEM Foundation",
        description: "Strengthen maths, science, and coding fundamentals for a tech-driven future.",
        actions: [
          "Take online coding courses (Python or JavaScript)",
          "Join a science or robotics club",
          "Complete a beginner data science project"
        ],
        skills: ["Python Programming", "Mathematics", "Scientific Thinking"]
      },
      {
        year: 2n,
        title: "Research & Projects",
        description: "Apply your knowledge through hands-on experiments and collaborative projects.",
        actions: [
          "Participate in science fairs or research competitions",
          "Contribute to an open-source project on GitHub",
          "Shadow a professional in a STEM field for a week"
        ],
        skills: ["Research Methods", "Data Analysis", "Technical Writing"]
      },
      {
        year: 3n,
        title: "Career Launch",
        description: "Pursue internships and position yourself for higher education or employment.",
        actions: [
          "Apply to STEM university programs or coding bootcamps",
          "Build a GitHub portfolio with 5+ projects",
          "Apply for a research internship or junior developer role"
        ],
        skills: [
          "Problem Solving",
          "Technical Communication",
          "Critical Thinking"
        ]
      }
    ],
    commerce: [
      {
        year: 1n,
        title: "Business Basics",
        description: "Learn core business, financial, and communication concepts that drive every organisation.",
        actions: [
          "Read 3 foundational business books (e.g. Rich Dad Poor Dad, The Lean Startup)",
          "Start a micro-business selling a product or service",
          "Track your personal budget for 3 months"
        ],
        skills: ["Financial Literacy", "Communication", "Basic Accounting"]
      },
      {
        year: 2n,
        title: "Entrepreneurship",
        description: "Build, test, and refine a real business idea with market research and execution.",
        actions: [
          "Create a full business plan for a startup idea",
          "Attend 2 entrepreneurship or startup events",
          "Run a small pilot: sell, collect feedback, iterate"
        ],
        skills: ["Strategic Thinking", "Marketing", "Customer Research"]
      },
      {
        year: 3n,
        title: "Career Path",
        description: "Enter commerce roles, consultancies, or launch your own entrepreneurial venture.",
        actions: [
          "Intern at a business, bank, or consultancy",
          "Obtain a certification in finance, marketing, or management",
          "Build a network of 5 mentors in your industry"
        ],
        skills: ["Leadership", "Negotiation", "Analytical Thinking"]
      }
    ],
    arts: [
      {
        year: 1n,
        title: "Creative Foundation",
        description: "Develop your unique artistic voice and explore different mediums of expression.",
        actions: [
          "Take formal art, design, or performance classes",
          "Start a creative journal or sketchbook practice",
          "Study the work of 5 artists in your chosen discipline"
        ],
        skills: ["Visual Design", "Self-Expression", "Art History"]
      },
      {
        year: 2n,
        title: "Portfolio Development",
        description: "Build a strong, cohesive body of work that represents your artistic identity.",
        actions: [
          "Enter 2 competitions or open calls for submissions",
          "Collaborate with peers on a multi-disciplinary project",
          "Create a professional online portfolio"
        ],
        skills: ["Portfolio Creation", "Collaboration", "Creative Direction"]
      },
      {
        year: 3n,
        title: "Industry Entry",
        description: "Connect with the creative industry and start building a professional practice.",
        actions: [
          "Intern at a studio, gallery, or production company",
          "Exhibit or perform your work at a public venue",
          "Apply to arts college programs or vocational training"
        ],
        skills: [
          "Professional Practice",
          "Client Communication",
          "Business of Art"
        ]
      }
    ]
  };
  return templates[stream] ?? templates.contentGaming;
}
const PRINT_STYLES = `
@media print {
  body * { visibility: hidden !important; }
  #roadmap-print-area, #roadmap-print-area * { visibility: visible !important; }
  #roadmap-print-area {
    position: fixed !important;
    inset: 0 !important;
    padding: 32px 40px !important;
    background: white !important;
    font-family: system-ui, sans-serif !important;
  }
  .no-print { display: none !important; }
  .print-page-break { page-break-before: always !important; }
}
`;
function MilestoneCard({
  milestone,
  streamAccent,
  index,
  total,
  onSave,
  isSaving
}) {
  const [editing, setEditing] = reactExports.useState(false);
  const [draft, setDraft] = reactExports.useState(milestone.description);
  const handleSave = () => {
    if (draft.trim() === milestone.description) {
      setEditing(false);
      return;
    }
    onSave({ ...milestone, description: draft.trim() });
    setEditing(false);
  };
  const handleCancel = () => {
    setDraft(milestone.description);
    setEditing(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.1, duration: 0.4 },
      className: "flex gap-4 md:gap-6",
      "data-ocid": `roadmap-milestone-${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-card shrink-0 border-2 border-white",
              style: { background: streamAccent },
              "aria-label": `Year ${Number(milestone.year)}`,
              children: Number(milestone.year)
            }
          ),
          index < total - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-0.5 flex-1 min-h-[32px] mt-1",
              style: { background: `${streamAccent}40` }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex-1 min-w-0 p-5 md:p-6 mb-6 border-border shadow-card hover:shadow-elevated transition-smooth", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0", children: [
                "Year ",
                Number(milestone.year)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-border", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-base truncate", children: milestone.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setEditing(!editing),
                className: "shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors no-print",
                "aria-label": "Edit milestone description",
                "data-ocid": `milestone-edit-btn-${index}`,
                children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" })
              }
            )
          ] }),
          editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-2 no-print", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: draft,
                onChange: (e) => setDraft(e.target.value),
                className: "text-sm min-h-[72px] resize-none",
                "data-ocid": `milestone-desc-input-${index}`,
                "aria-label": "Edit description"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  onClick: handleSave,
                  disabled: isSaving,
                  "data-ocid": `milestone-save-btn-${index}`,
                  children: isSaving ? "Saving…" : "Save"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "ghost",
                  onClick: handleCancel,
                  children: "Cancel"
                }
              )
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-4 leading-relaxed", children: milestone.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4 mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleCheck,
                  {
                    className: "w-3.5 h-3.5",
                    style: { color: streamAccent }
                  }
                ),
                "Action Steps"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: milestone.actions.map((action) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "text-xs text-muted-foreground flex gap-1.5 leading-relaxed",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 shrink-0", children: "›" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: action })
                  ]
                },
                action
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkles,
                  {
                    className: "w-3.5 h-3.5",
                    style: { color: streamAccent }
                  }
                ),
                "Skills to Build"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: milestone.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "text-xs font-medium px-2.5 py-0.5 rounded-full",
                  children: skill
                },
                skill
              )) })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function PrintArea({ roadmap, profile, streamLabel }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "roadmap-print-area", style: { display: "none" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontFamily: "system-ui,sans-serif", color: "#111" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h1",
      {
        style: { fontSize: "24px", fontWeight: "bold", marginBottom: "4px" },
        children: "Career Sandbox — Personalized Career Roadmap"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "14px", color: "#555", marginBottom: "4px" }, children: (profile == null ? void 0 : profile.name) ? `Student: ${profile.name}` : "" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { fontSize: "14px", color: "#555", marginBottom: "24px" }, children: [
      "Career Stream: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: streamLabel })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { style: { marginBottom: "24px", borderColor: "#e5e7eb" } }),
    roadmap.milestones.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "32px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "h2",
        {
          style: {
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "4px"
          },
          children: [
            "Year ",
            Number(m.year),
            ": ",
            m.title
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          style: { fontSize: "14px", color: "#444", marginBottom: "12px" },
          children: m.description
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { fontSize: "13px" }, children: "Action Steps" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: { paddingLeft: "16px", marginTop: "6px" }, children: m.actions.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "li",
                {
                  style: {
                    fontSize: "13px",
                    color: "#555",
                    marginBottom: "4px"
                  },
                  children: a
                },
                a
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { fontSize: "13px" }, children: "Skills to Build" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginTop: "6px"
                  },
                  children: m.skills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        fontSize: "12px",
                        background: "#f3f4f6",
                        borderRadius: "9999px",
                        padding: "2px 10px",
                        color: "#374151"
                      },
                      children: s
                    },
                    s
                  ))
                }
              )
            ] })
          ]
        }
      )
    ] }, `print-${Number(m.year)}`)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "hr",
      {
        style: {
          marginTop: "32px",
          marginBottom: "12px",
          borderColor: "#e5e7eb"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { fontSize: "11px", color: "#aaa" }, children: [
      "Generated by Career Sandbox · caffeine.ai · ",
      (/* @__PURE__ */ new Date()).getFullYear()
    ] })
  ] }) });
}
function RoadmapPage() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  const { isPremium } = useSubscription();
  const queryClient = useQueryClient();
  const [generating, setGenerating] = reactExports.useState(false);
  if (typeof document !== "undefined" && !document.getElementById("roadmap-print-css")) {
    const style = document.createElement("style");
    style.id = "roadmap-print-css";
    style.textContent = PRINT_STYLES;
    document.head.appendChild(style);
  }
  const { data: roadmap, isLoading: roadmapLoading } = useQuery({
    queryKey: ["roadmap"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyRoadmap();
    },
    enabled: !!actor && !actorFetching && isAuthenticated
  });
  const { data: profile } = useQuery({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching && isAuthenticated
  });
  const updateMutation = useMutation({
    mutationFn: async (milestones) => {
      if (!actor) throw new Error("Actor not available");
      await actor.updateRoadmapMilestones(milestones);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roadmap"] });
      ue.success("Milestone updated!");
    },
    onError: () => ue.error("Failed to update milestone.")
  });
  const saveMutation = useMutation({
    mutationFn: async ({
      stream,
      milestones
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.saveRoadmap(stream, milestones);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roadmap"] });
      ue.success("Your roadmap has been generated!");
    },
    onError: () => ue.error("Failed to generate roadmap.")
  });
  const handleGenerate = async () => {
    setGenerating(true);
    const activeStream = (profile == null ? void 0 : profile.activeStream) != null ? profile.activeStream : CareerStream.contentGaming;
    const stream = activeStream;
    const milestones = buildDefaultMilestones(stream);
    await saveMutation.mutateAsync({ stream, milestones });
    setGenerating(false);
  };
  const handleMilestoneUpdate = (index, updated) => {
    if (!roadmap) return;
    const next = roadmap.milestones.map((m, i) => i === index ? updated : m);
    updateMutation.mutate(next);
  };
  const handleDownloadPDF = () => {
    if (!roadmap) return;
    const el = document.getElementById("roadmap-print-area");
    if (el) el.style.display = "block";
    window.print();
    if (el) el.style.display = "none";
  };
  const streamMeta = roadmap ? STREAM_META.find((s) => s.id === roadmap.stream) : null;
  const streamAccent = (streamMeta == null ? void 0 : streamMeta.accentColor) ?? "oklch(0.58 0.25 286)";
  const streamLabel = (streamMeta == null ? void 0 : streamMeta.label) ?? (roadmap == null ? void 0 : roadmap.stream) ?? "Career";
  const isLoading = roadmapLoading || actorFetching;
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Sign in to view your roadmap" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Log in with Internet Identity to access your personalized career journey." })
    ] });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 mt-6", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-2xl" }, i)) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Your Career Roadmap",
        subtitle: roadmap ? `${streamLabel} · Your personalized 3-year plan` : "Your personalized 3–5 year plan to reach your goals",
        badge: streamMeta ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "inline-flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1 rounded-full",
            style: { background: streamAccent },
            children: [
              streamMeta.icon,
              " ",
              streamMeta.label
            ]
          }
        ) : void 0,
        actions: roadmap ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => {
              if (!isPremium) {
                window.location.href = "/pricing";
                return;
              }
              handleDownloadPDF();
            },
            className: "flex items-center gap-2 touch-target no-print",
            "data-ocid": "roadmap-download-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              "Download PDF"
            ]
          }
        ) : void 0
      }
    ),
    !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-muted border border-border rounded-2xl p-4 no-print",
        "data-ocid": "roadmap-paywall-banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-muted-foreground shrink-0 mt-0.5 sm:mt-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Premium feature" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Upgrade to Premium to unlock full roadmap editing, PDF export, and a personalised milestone plan." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/pricing", className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            CTAButton,
            {
              variant: "primary",
              size: "sm",
              showArrow: true,
              "data-ocid": "roadmap-paywall-cta",
              children: "See Plans"
            }
          ) })
        ]
      }
    ),
    !roadmap && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "bg-card rounded-2xl border border-border shadow-card p-10 text-center",
        "data-ocid": "roadmap-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-2", children: "No roadmap yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8 max-w-sm mx-auto leading-relaxed", children: "Take the mindset quiz to get a roadmap tailored to your personality and goals — or generate a sample to explore." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/quiz", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CTAButton,
              {
                variant: "primary",
                showArrow: true,
                size: "lg",
                "data-ocid": "roadmap-quiz-cta",
                children: "Take the Mindset Quiz"
              }
            ) }),
            isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx(
              CTAButton,
              {
                variant: "outline",
                size: "lg",
                loading: generating,
                onClick: handleGenerate,
                "data-ocid": "roadmap-generate-btn",
                children: "Generate Sample Roadmap"
              }
            )
          ] })
        ]
      }
    ),
    roadmap && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: roadmap.milestones.map((milestone, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      MilestoneCard,
      {
        milestone,
        streamAccent,
        index: i,
        total: roadmap.milestones.length,
        onSave: (updated) => handleMilestoneUpdate(i, updated),
        isSaving: updateMutation.isPending
      },
      `milestone-${Number(milestone.year)}-${i}`
    )) }),
    roadmap && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PrintArea,
      {
        roadmap,
        profile: profile ?? null,
        streamLabel
      }
    )
  ] });
}
export {
  RoadmapPage as default
};
