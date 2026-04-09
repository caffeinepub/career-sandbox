import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { StreamMeta } from "../types";

interface StreamCardProps {
  stream: StreamMeta;
  progress?: number; // 0-100
}

export default function StreamCard({ stream, progress }: StreamCardProps) {
  return (
    <div
      className="bg-card rounded-xl overflow-hidden shadow-card border border-border transition-smooth hover:shadow-elevated hover:-translate-y-0.5 group"
      data-ocid={`stream-card-${stream.id}`}
    >
      {/* Top accent bar */}
      <div
        className="h-1.5 w-full"
        style={{ background: stream.accentColor }}
      />

      <div className="p-4 flex gap-4 items-start">
        {/* Icon tile */}
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0"
          style={{ background: `${stream.accentColor}22` }}
        >
          {stream.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-foreground text-base leading-snug mb-0.5">
            {stream.label}
          </h3>
          <p className="text-xs text-muted-foreground mb-2">
            <span className="font-medium" style={{ color: stream.accentColor }}>
              {stream.careerCount} Careers
            </span>{" "}
            | {stream.description}
          </p>

          {progress !== undefined && (
            <div className="mb-3">
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    background: stream.accentColor,
                  }}
                />
              </div>
            </div>
          )}

          <Link to="/streams/$streamId" params={{ streamId: stream.id }}>
            <button
              type="button"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white transition-smooth hover:opacity-90 touch-target"
              style={{ background: stream.accentColor }}
              data-ocid={`stream-cta-${stream.id}`}
            >
              {stream.buttonLabel}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
