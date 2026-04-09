import { CheckCircle2, Clock, Star } from "lucide-react";

type BadgeVariant = "completed" | "in-progress" | "new" | "premium";

interface ProgressBadgeProps {
  variant: BadgeVariant;
  label?: string;
  className?: string;
}

const BADGE_CONFIGS: Record<
  BadgeVariant,
  { icon: React.ReactNode; defaultLabel: string; classes: string }
> = {
  completed: {
    icon: <CheckCircle2 className="w-3 h-3" />,
    defaultLabel: "Completed",
    classes: "bg-green-100 text-green-700 border-green-200",
  },
  "in-progress": {
    icon: <Clock className="w-3 h-3" />,
    defaultLabel: "In Progress",
    classes: "bg-blue-100 text-blue-700 border-blue-200",
  },
  new: {
    icon: <Star className="w-3 h-3" />,
    defaultLabel: "New",
    classes: "bg-primary/10 text-primary border-primary/20",
  },
  premium: {
    icon: <Star className="w-3 h-3 fill-current" />,
    defaultLabel: "Premium",
    classes: "bg-amber-100 text-amber-700 border-amber-200",
  },
};

export default function ProgressBadge({
  variant,
  label,
  className = "",
}: ProgressBadgeProps) {
  const config = BADGE_CONFIGS[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${config.classes} ${className}`}
      data-ocid={`badge-${variant}`}
    >
      {config.icon}
      {label ?? config.defaultLabel}
    </span>
  );
}
