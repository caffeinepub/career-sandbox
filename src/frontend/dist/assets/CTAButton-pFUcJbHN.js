import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as cn, y as cva } from "./index-DjbwzvVy.js";
import { A as ArrowRight } from "./arrow-right-CJXVtCt-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
const ctaButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full touch-target disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        // Peach bg, warm espresso text — not harsh black
        primary: "bg-primary text-primary-foreground hover:bg-[oklch(0.66_0.16_50)] shadow-card hover:shadow-elevated",
        // Sage green bg with near-white text — strong accent button
        secondary: "bg-secondary text-secondary-foreground hover:bg-[oklch(0.62_0.11_145)] shadow-card hover:shadow-elevated",
        // Transparent ghost with peach text, soft peach tint on hover
        ghost: "text-primary hover:bg-[oklch(0.72_0.14_50/0.1)] hover:text-primary",
        // 2px peach border, peach text → fills peach on hover
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        // Hero: gradient peach → golden warmth, elevated shadow, light cream text
        hero: "bg-[linear-gradient(135deg,oklch(0.72_0.16_50)_0%,oklch(0.76_0.2_65)_100%)] text-[oklch(0.22_0.04_45)] text-base px-8 py-4 shadow-elevated hover:brightness-105 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_0_rgba(180,90,20,0.25)]"
      },
      size: {
        sm: "text-xs px-4 py-2",
        md: "text-sm px-5 py-2.5",
        lg: "text-sm px-6 py-3"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);
const CTAButton = reactExports.forwardRef(
  ({
    className,
    variant,
    size,
    loading,
    showArrow,
    children,
    disabled,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        ref,
        className: cn(ctaButtonVariants({ variant, size }), className),
        disabled: disabled || loading,
        ...props,
        children: [
          loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
          children,
          showArrow && !loading && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-0.5" })
        ]
      }
    );
  }
);
CTAButton.displayName = "CTAButton";
export {
  CTAButton as C
};
