import { j as jsxRuntimeExports, b as cn } from "./index-DjbwzvVy.js";
function PageHeader({
  title,
  subtitle,
  badge,
  actions,
  centered = false,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn("py-8 md:py-12", centered ? "text-center" : "", className),
      children: [
        badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mb-3", centered ? "flex justify-center" : ""), children: badge }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: cn(
              "font-display font-bold text-foreground",
              "text-2xl md:text-4xl leading-tight tracking-tight"
            ),
            children: title
          }
        ),
        subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed", children: subtitle }),
        actions && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "mt-6 flex flex-wrap gap-3",
              centered ? "justify-center" : ""
            ),
            children: actions
          }
        )
      ]
    }
  );
}
export {
  PageHeader as P
};
