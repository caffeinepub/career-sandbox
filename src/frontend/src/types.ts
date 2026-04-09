import type {
  CareerStream,
  Milestone,
  RoadmapPublic,
  StreamProgressPublic,
  SubscriptionStatusPublic,
  SubscriptionTier,
  UserProfilePublic,
} from "./backend";

// Re-export backend types for convenience
export type {
  CareerStream,
  Milestone,
  RoadmapPublic,
  StreamProgressPublic,
  SubscriptionStatusPublic,
  SubscriptionTier,
  UserProfilePublic,
};
export { CareerStream as CareerStreamEnum } from "./backend";

export interface StreamMeta {
  id: CareerStream;
  label: string;
  tagline: string;
  description: string;
  careerCount: number;
  icon: string;
  colorClass: string;
  lightColorClass: string;
  buttonLabel: string;
  accentColor: string;
}

export const STREAM_META: StreamMeta[] = [
  {
    id: "contentGaming" as CareerStream,
    label: "Creative Media & Gaming",
    tagline: "Build worlds, tell stories, go viral.",
    description: "Design, storytelling, and tech for the digital world.",
    careerCount: 120,
    icon: "🎮",
    colorClass: "stream-gaming",
    lightColorClass: "stream-gaming-light",
    buttonLabel: "Explore This Path",
    accentColor: "oklch(var(--stream-gaming))",
  },
  {
    id: "science" as CareerStream,
    label: "Innovate with Science & Tech",
    tagline: "Code. Discover. Engineer the future.",
    description: "Biology, coding, and engineering frontiers.",
    careerCount: 98,
    icon: "🔬",
    colorClass: "stream-science",
    lightColorClass: "stream-science-light",
    buttonLabel: "View Science Roles",
    accentColor: "oklch(var(--stream-science))",
  },
  {
    id: "commerce" as CareerStream,
    label: "Lead & Thrive in Commerce",
    tagline: "Lead teams, build brands, own markets.",
    description: "Business, finance, and entrepreneurship.",
    careerCount: 85,
    icon: "💼",
    colorClass: "stream-commerce",
    lightColorClass: "stream-commerce-light",
    buttonLabel: "Discover Business",
    accentColor: "oklch(var(--stream-commerce))",
  },
  {
    id: "arts" as CareerStream,
    label: "Create & Express in Arts",
    tagline: "Design. Perform. Move the world.",
    description: "Design, fashion, performance, visual arts.",
    careerCount: 115,
    icon: "🎨",
    colorClass: "stream-arts",
    lightColorClass: "stream-arts-light",
    buttonLabel: "Get Creative",
    accentColor: "oklch(var(--stream-arts))",
  },
];

export interface QuizQuestion {
  id: number;
  text: string;
  options: { id: number; text: string; emoji: string }[];
}

export interface QuizState {
  currentIndex: number;
  answers: Record<number, number>;
  completed: boolean;
  recommendedStream: CareerStream | null;
}
