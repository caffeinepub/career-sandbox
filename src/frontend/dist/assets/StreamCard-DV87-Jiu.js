import { j as jsxRuntimeExports, L as Link } from "./index-DjbwzvVy.js";
import { A as ArrowRight } from "./arrow-right-CJXVtCt-.js";
function StreamCard({ stream, progress }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-xl overflow-hidden shadow-card border border-border transition-smooth hover:shadow-elevated hover:-translate-y-0.5 group",
      "data-ocid": `stream-card-${stream.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-1.5 w-full",
            style: { background: stream.accentColor }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex gap-4 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0",
              style: { background: `${stream.accentColor}22` },
              children: stream.icon
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-base leading-snug mb-0.5", children: stream.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", style: { color: stream.accentColor }, children: [
                stream.careerCount,
                " Careers"
              ] }),
              " ",
              "| ",
              stream.description
            ] }),
            progress !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full transition-all duration-500",
                style: {
                  width: `${progress}%`,
                  background: stream.accentColor
                }
              }
            ) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/streams/$streamId", params: { streamId: stream.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white transition-smooth hover:opacity-90 touch-target",
                style: { background: stream.accentColor },
                "data-ocid": `stream-cta-${stream.id}`,
                children: [
                  stream.buttonLabel,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" })
                ]
              }
            ) })
          ] })
        ] })
      ]
    }
  );
}
export {
  StreamCard as S
};
