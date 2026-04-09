import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  actions?: ReactNode;
  centered?: boolean;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  badge,
  actions,
  centered = false,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn("py-8 md:py-12", centered ? "text-center" : "", className)}
    >
      {badge && (
        <div className={cn("mb-3", centered ? "flex justify-center" : "")}>
          {badge}
        </div>
      )}
      <h1
        className={cn(
          "font-display font-bold text-foreground",
          "text-2xl md:text-4xl leading-tight tracking-tight",
        )}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      {actions && (
        <div
          className={cn(
            "mt-6 flex flex-wrap gap-3",
            centered ? "justify-center" : "",
          )}
        >
          {actions}
        </div>
      )}
    </div>
  );
}
