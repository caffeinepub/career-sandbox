import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Edit2,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { CareerStream as CareerStreamEnum, createActor } from "../backend";
import CTAButton from "../components/CTAButton";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../hooks/use-auth";
import { useSubscription } from "../hooks/use-subscription";
import { STREAM_META } from "../types";
import type {
  CareerStream,
  Milestone,
  RoadmapPublic,
  UserProfilePublic,
} from "../types";

/* ─── Default milestones ─── */
function buildDefaultMilestones(stream: CareerStream): Milestone[] {
  const templates: Record<string, Milestone[]> = {
    contentGaming: [
      {
        year: 1n,
        title: "Foundation Year",
        description:
          "Build core skills in design, storytelling, and digital tools.",
        actions: [
          "Complete 3 online design or media courses",
          "Start a personal blog, channel, or portfolio site",
          "Learn the basics of one creative tool (Figma, Blender, or Premiere)",
        ],
        skills: ["Design Thinking", "Content Writing", "Basic Video Editing"],
      },
      {
        year: 2n,
        title: "Portfolio Building",
        description:
          "Create real projects that demonstrate your creative abilities to the world.",
        actions: [
          "Build a small game prototype or interactive piece",
          "Collaborate on a short film or content series",
          "Publish your work on a public platform",
        ],
        skills: ["Game Design", "Video Production", "Storytelling"],
      },
      {
        year: 3n,
        title: "Industry Entry",
        description:
          "Land your first industry experience and grow your professional network.",
        actions: [
          "Apply for internships at studios or agencies",
          "Attend game jams, hackathons, or creative festivals",
          "Build relationships with 3 professionals in your field",
        ],
        skills: [
          "Professional Portfolio",
          "Networking",
          "Client Communication",
        ],
      },
    ],
    science: [
      {
        year: 1n,
        title: "STEM Foundation",
        description:
          "Strengthen maths, science, and coding fundamentals for a tech-driven future.",
        actions: [
          "Take online coding courses (Python or JavaScript)",
          "Join a science or robotics club",
          "Complete a beginner data science project",
        ],
        skills: ["Python Programming", "Mathematics", "Scientific Thinking"],
      },
      {
        year: 2n,
        title: "Research & Projects",
        description:
          "Apply your knowledge through hands-on experiments and collaborative projects.",
        actions: [
          "Participate in science fairs or research competitions",
          "Contribute to an open-source project on GitHub",
          "Shadow a professional in a STEM field for a week",
        ],
        skills: ["Research Methods", "Data Analysis", "Technical Writing"],
      },
      {
        year: 3n,
        title: "Career Launch",
        description:
          "Pursue internships and position yourself for higher education or employment.",
        actions: [
          "Apply to STEM university programs or coding bootcamps",
          "Build a GitHub portfolio with 5+ projects",
          "Apply for a research internship or junior developer role",
        ],
        skills: [
          "Problem Solving",
          "Technical Communication",
          "Critical Thinking",
        ],
      },
    ],
    commerce: [
      {
        year: 1n,
        title: "Business Basics",
        description:
          "Learn core business, financial, and communication concepts that drive every organisation.",
        actions: [
          "Read 3 foundational business books (e.g. Rich Dad Poor Dad, The Lean Startup)",
          "Start a micro-business selling a product or service",
          "Track your personal budget for 3 months",
        ],
        skills: ["Financial Literacy", "Communication", "Basic Accounting"],
      },
      {
        year: 2n,
        title: "Entrepreneurship",
        description:
          "Build, test, and refine a real business idea with market research and execution.",
        actions: [
          "Create a full business plan for a startup idea",
          "Attend 2 entrepreneurship or startup events",
          "Run a small pilot: sell, collect feedback, iterate",
        ],
        skills: ["Strategic Thinking", "Marketing", "Customer Research"],
      },
      {
        year: 3n,
        title: "Career Path",
        description:
          "Enter commerce roles, consultancies, or launch your own entrepreneurial venture.",
        actions: [
          "Intern at a business, bank, or consultancy",
          "Obtain a certification in finance, marketing, or management",
          "Build a network of 5 mentors in your industry",
        ],
        skills: ["Leadership", "Negotiation", "Analytical Thinking"],
      },
    ],
    arts: [
      {
        year: 1n,
        title: "Creative Foundation",
        description:
          "Develop your unique artistic voice and explore different mediums of expression.",
        actions: [
          "Take formal art, design, or performance classes",
          "Start a creative journal or sketchbook practice",
          "Study the work of 5 artists in your chosen discipline",
        ],
        skills: ["Visual Design", "Self-Expression", "Art History"],
      },
      {
        year: 2n,
        title: "Portfolio Development",
        description:
          "Build a strong, cohesive body of work that represents your artistic identity.",
        actions: [
          "Enter 2 competitions or open calls for submissions",
          "Collaborate with peers on a multi-disciplinary project",
          "Create a professional online portfolio",
        ],
        skills: ["Portfolio Creation", "Collaboration", "Creative Direction"],
      },
      {
        year: 3n,
        title: "Industry Entry",
        description:
          "Connect with the creative industry and start building a professional practice.",
        actions: [
          "Intern at a studio, gallery, or production company",
          "Exhibit or perform your work at a public venue",
          "Apply to arts college programs or vocational training",
        ],
        skills: [
          "Professional Practice",
          "Client Communication",
          "Business of Art",
        ],
      },
    ],
  };
  return templates[stream] ?? templates.contentGaming;
}

/* ─── Print styles injected into <head> ─── */
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

/* ─── Inline milestone editor ─── */
interface MilestoneEditorProps {
  milestone: Milestone;
  streamAccent: string;
  index: number;
  total: number;
  onSave: (updated: Milestone) => void;
  isSaving: boolean;
}

function MilestoneCard({
  milestone,
  streamAccent,
  index,
  total,
  onSave,
  isSaving,
}: MilestoneEditorProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(milestone.description);

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

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="flex gap-4 md:gap-6"
      data-ocid={`roadmap-milestone-${index}`}
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-card shrink-0 border-2 border-white"
          style={{ background: streamAccent }}
          aria-label={`Year ${Number(milestone.year)}`}
        >
          {Number(milestone.year)}
        </div>
        {index < total - 1 && (
          <div
            className="w-0.5 flex-1 min-h-[32px] mt-1"
            style={{ background: `${streamAccent}40` }}
          />
        )}
      </div>

      {/* Card */}
      <Card className="flex-1 min-w-0 p-5 md:p-6 mb-6 border-border shadow-card hover:shadow-elevated transition-smooth">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0">
              Year {Number(milestone.year)}
            </span>
            <span className="text-xs text-border">·</span>
            <h3 className="font-display font-bold text-foreground text-base truncate">
              {milestone.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className="shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors no-print"
            aria-label="Edit milestone description"
            data-ocid={`milestone-edit-btn-${index}`}
          >
            {editing ? (
              <X className="w-4 h-4" />
            ) : (
              <Edit2 className="w-4 h-4" />
            )}
          </button>
        </div>

        {editing ? (
          <div className="mt-2 space-y-2 no-print">
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="text-sm min-h-[72px] resize-none"
              data-ocid={`milestone-desc-input-${index}`}
              aria-label="Edit description"
            />
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                data-ocid={`milestone-save-btn-${index}`}
              >
                {isSaving ? "Saving…" : "Save"}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mt-1 mb-4 leading-relaxed">
            {milestone.description}
          </p>
        )}

        <div className="grid sm:grid-cols-2 gap-4 mt-3">
          {/* Action steps */}
          <div>
            <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <CheckCircle2
                className="w-3.5 h-3.5"
                style={{ color: streamAccent }}
              />
              Action Steps
            </p>
            <ul className="space-y-1.5">
              {milestone.actions.map((action) => (
                <li
                  key={action}
                  className="text-xs text-muted-foreground flex gap-1.5 leading-relaxed"
                >
                  <span className="mt-0.5 shrink-0">›</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div>
            <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <Sparkles
                className="w-3.5 h-3.5"
                style={{ color: streamAccent }}
              />
              Skills to Build
            </p>
            <div className="flex flex-wrap gap-1.5">
              {milestone.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

/* ─── Print area (hidden until print) ─── */
interface PrintAreaProps {
  roadmap: RoadmapPublic;
  profile: UserProfilePublic | null;
  streamLabel: string;
}

function PrintArea({ roadmap, profile, streamLabel }: PrintAreaProps) {
  return (
    <div id="roadmap-print-area" style={{ display: "none" }}>
      <div style={{ fontFamily: "system-ui,sans-serif", color: "#111" }}>
        <h1
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "4px" }}
        >
          Career Sandbox — Personalized Career Roadmap
        </h1>
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "4px" }}>
          {profile?.name ? `Student: ${profile.name}` : ""}
        </p>
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "24px" }}>
          Career Stream: <strong>{streamLabel}</strong>
        </p>
        <hr style={{ marginBottom: "24px", borderColor: "#e5e7eb" }} />
        {roadmap.milestones.map((m) => (
          <div key={`print-${Number(m.year)}`} style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "4px",
              }}
            >
              Year {Number(m.year)}: {m.title}
            </h2>
            <p
              style={{ fontSize: "14px", color: "#444", marginBottom: "12px" }}
            >
              {m.description}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <strong style={{ fontSize: "13px" }}>Action Steps</strong>
                <ul style={{ paddingLeft: "16px", marginTop: "6px" }}>
                  {m.actions.map((a) => (
                    <li
                      key={a}
                      style={{
                        fontSize: "13px",
                        color: "#555",
                        marginBottom: "4px",
                      }}
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <strong style={{ fontSize: "13px" }}>Skills to Build</strong>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginTop: "6px",
                  }}
                >
                  {m.skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: "12px",
                        background: "#f3f4f6",
                        borderRadius: "9999px",
                        padding: "2px 10px",
                        color: "#374151",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        <hr
          style={{
            marginTop: "32px",
            marginBottom: "12px",
            borderColor: "#e5e7eb",
          }}
        />
        <p style={{ fontSize: "11px", color: "#aaa" }}>
          Generated by Career Sandbox · caffeine.ai · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function RoadmapPage() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  const { isPremium } = useSubscription();
  const queryClient = useQueryClient();
  const [generating, setGenerating] = useState(false);

  // Inject print styles once
  if (
    typeof document !== "undefined" &&
    !document.getElementById("roadmap-print-css")
  ) {
    const style = document.createElement("style");
    style.id = "roadmap-print-css";
    style.textContent = PRINT_STYLES;
    document.head.appendChild(style);
  }

  const { data: roadmap, isLoading: roadmapLoading } =
    useQuery<RoadmapPublic | null>({
      queryKey: ["roadmap"],
      queryFn: async () => {
        if (!actor) return null;
        return actor.getMyRoadmap();
      },
      enabled: !!actor && !actorFetching && isAuthenticated,
    });

  const { data: profile } = useQuery<UserProfilePublic | null>({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
  });

  const updateMutation = useMutation({
    mutationFn: async (milestones: Milestone[]) => {
      if (!actor) throw new Error("Actor not available");
      await actor.updateRoadmapMilestones(milestones);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roadmap"] });
      toast.success("Milestone updated!");
    },
    onError: () => toast.error("Failed to update milestone."),
  });

  const saveMutation = useMutation({
    mutationFn: async ({
      stream,
      milestones,
    }: { stream: CareerStream; milestones: Milestone[] }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.saveRoadmap(stream, milestones);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roadmap"] });
      toast.success("Your roadmap has been generated!");
    },
    onError: () => toast.error("Failed to generate roadmap."),
  });

  const handleGenerate = async () => {
    setGenerating(true);
    // Use the user's active stream from their profile, fall back to contentGaming
    const activeStream =
      profile?.activeStream != null
        ? profile.activeStream
        : CareerStreamEnum.contentGaming;
    const stream = activeStream;
    const milestones = buildDefaultMilestones(stream);
    await saveMutation.mutateAsync({ stream, milestones });
    setGenerating(false);
  };

  const handleMilestoneUpdate = (index: number, updated: Milestone) => {
    if (!roadmap) return;
    const next = roadmap.milestones.map((m, i) => (i === index ? updated : m));
    updateMutation.mutate(next);
  };

  const handleDownloadPDF = () => {
    if (!roadmap) return;
    // Make print area visible momentarily for print
    const el = document.getElementById("roadmap-print-area");
    if (el) el.style.display = "block";
    window.print();
    if (el) el.style.display = "none";
  };

  const streamMeta = roadmap
    ? STREAM_META.find((s) => s.id === roadmap.stream)
    : null;
  const streamAccent = streamMeta?.accentColor ?? "oklch(0.58 0.25 286)";
  const streamLabel = streamMeta?.label ?? roadmap?.stream ?? "Career";

  const isLoading = roadmapLoading || actorFetching;

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-display font-bold text-xl text-foreground mb-2">
          Sign in to view your roadmap
        </h2>
        <p className="text-muted-foreground text-sm">
          Log in with Internet Identity to access your personalized career
          journey.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-80" />
        <div className="space-y-4 mt-6">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pb-16">
      <PageHeader
        title="Your Career Roadmap"
        subtitle={
          roadmap
            ? `${streamLabel} · Your personalized 3-year plan`
            : "Your personalized 3–5 year plan to reach your goals"
        }
        badge={
          streamMeta ? (
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1 rounded-full"
              style={{ background: streamAccent }}
            >
              {streamMeta.icon} {streamMeta.label}
            </span>
          ) : undefined
        }
        actions={
          roadmap ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (!isPremium) {
                  window.location.href = "/pricing";
                  return;
                }
                handleDownloadPDF();
              }}
              className="flex items-center gap-2 touch-target no-print"
              data-ocid="roadmap-download-btn"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          ) : undefined
        }
      />

      {/* Non-premium paywall banner */}
      {!isPremium && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-muted border border-border rounded-2xl p-4 no-print"
          data-ocid="roadmap-paywall-banner"
        >
          <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">
              Premium feature
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Upgrade to Premium to unlock full roadmap editing, PDF export, and
              a personalised milestone plan.
            </p>
          </div>
          <a href="/pricing" className="shrink-0">
            <CTAButton
              variant="primary"
              size="sm"
              showArrow
              data-ocid="roadmap-paywall-cta"
            >
              See Plans
            </CTAButton>
          </a>
        </motion.div>
      )}

      {/* Empty state */}
      {!roadmap && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-2xl border border-border shadow-card p-10 text-center"
          data-ocid="roadmap-empty"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">
            No roadmap yet
          </h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto leading-relaxed">
            Take the mindset quiz to get a roadmap tailored to your personality
            and goals — or generate a sample to explore.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/quiz">
              <CTAButton
                variant="primary"
                showArrow
                size="lg"
                data-ocid="roadmap-quiz-cta"
              >
                Take the Mindset Quiz
              </CTAButton>
            </a>
            {isPremium && (
              <CTAButton
                variant="outline"
                size="lg"
                loading={generating}
                onClick={handleGenerate}
                data-ocid="roadmap-generate-btn"
              >
                Generate Sample Roadmap
              </CTAButton>
            )}
          </div>
        </motion.div>
      )}

      {/* Timeline */}
      {roadmap && (
        <div className="mt-2">
          {roadmap.milestones.map((milestone, i) => (
            <MilestoneCard
              key={`milestone-${Number(milestone.year)}-${i}`}
              milestone={milestone}
              streamAccent={streamAccent}
              index={i}
              total={roadmap.milestones.length}
              onSave={(updated) => handleMilestoneUpdate(i, updated)}
              isSaving={updateMutation.isPending}
            />
          ))}
        </div>
      )}

      {/* Hidden print area */}
      {roadmap && (
        <PrintArea
          roadmap={roadmap}
          profile={profile ?? null}
          streamLabel={streamLabel}
        />
      )}
    </div>
  );
}
