import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DjbwzvVy.js";
import { S as Star } from "./star-e8YcrMVJ.js";
import { C as CircleCheck } from "./circle-check-C_MaQlia.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
const BADGE_CONFIGS = {
  completed: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
    defaultLabel: "Completed",
    classes: "bg-green-100 text-green-700 border-green-200"
  },
  "in-progress": {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
    defaultLabel: "In Progress",
    classes: "bg-blue-100 text-blue-700 border-blue-200"
  },
  new: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3" }),
    defaultLabel: "New",
    classes: "bg-primary/10 text-primary border-primary/20"
  },
  premium: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-current" }),
    defaultLabel: "Premium",
    classes: "bg-amber-100 text-amber-700 border-amber-200"
  }
};
function ProgressBadge({
  variant,
  label,
  className = ""
}) {
  const config = BADGE_CONFIGS[variant];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${config.classes} ${className}`,
      "data-ocid": `badge-${variant}`,
      children: [
        config.icon,
        label ?? config.defaultLabel
      ]
    }
  );
}
export {
  ProgressBadge as P
};
