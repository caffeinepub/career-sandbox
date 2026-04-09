import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as Primitive, b as cn, w as useLayoutEffect2, n as useComposedRefs, p as useControllableState, q as Primitive$1, t as composeEventHandlers, m as createContextScope, u as useActor, d as useAuth, i as useSubscription, k as Skeleton, l as useQueryClient, g as useQuery, S as Sparkles, f as createActor } from "./index-DjbwzvVy.js";
import { B as Badge } from "./badge-CLfMDJBE.js";
import { C as Card } from "./card-wY6ZCGgf.js";
import { u as useMutation, a as ue } from "./index-JTaet32S.js";
import { C as CTAButton } from "./CTAButton-pFUcJbHN.js";
import { P as PageHeader } from "./PageHeader-CLg6hBYS.js";
import { m as motion } from "./proxy-C-5a5GeL.js";
import { C as Crown } from "./crown-CS_1DGV-.js";
import { Z as Zap } from "./zap-CG5VVwpl.js";
import { C as CircleCheck } from "./circle-check-C_MaQlia.js";
import { S as Star } from "./star-e8YcrMVJ.js";
import { M as MapPin, D as Download } from "./map-pin-yEObx8oV.js";
import { S as Shield } from "./shield-naGg5c1g.js";
import { L as Lock } from "./lock-DBsIX2mi.js";
import "./arrow-right-CJXVtCt-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$1);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root$1 = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root$1,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function usePrevious(value) {
  const ref = reactExports.useRef({ value, previous: value });
  return reactExports.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}
function useSize(element) {
  const [size, setSize] = reactExports.useState(void 0);
  useLayoutEffect2(() => {
    if (element) {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) {
          return;
        }
        if (!entries.length) {
          return;
        }
        const entry = entries[0];
        let width;
        let height;
        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry["borderBoxSize"];
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
          width = borderSize["inlineSize"];
          height = borderSize["blockSize"];
        } else {
          width = element.offsetWidth;
          height = element.offsetHeight;
        }
        setSize({ width, height });
      });
      resizeObserver.observe(element, { box: "border-box" });
      return () => resizeObserver.unobserve(element);
    } else {
      setSize(void 0);
    }
  }, [element]);
  return size;
}
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive$1.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive$1.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
const FREE_FEATURES = [
  {
    text: "Mindset quiz (stream recommender)",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" })
  },
  {
    text: "Quiz results & stream recommendation",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4" })
  },
  { text: "Browse all 4 career streams", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }) },
  { text: "Career profile overviews", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }) }
];
const PREMIUM_FEATURES = [
  {
    text: "Everything in Free",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
    premium: false
  },
  {
    text: "Full access to all 4 career streams",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
    premium: true
  },
  {
    text: "All quizzes & micro-projects",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4" }),
    premium: true
  },
  {
    text: "Personalised 3–5 year career roadmap",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
    premium: true
  },
  {
    text: "PDF roadmap download",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
    premium: true
  },
  {
    text: "Support resources & FAQ",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
    premium: true
  }
];
const TRUST_SIGNALS = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
    text: "Secure payment via Stripe"
  },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }), text: "Cancel anytime" },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }), text: "7-day free trial" }
];
const MONTHLY_PRICE = 299;
const ANNUAL_PRICE = 2499;
const ANNUAL_MONTHLY_EQUIV = Math.round(ANNUAL_PRICE / 12);
function useStripeSessionConfirm() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const confirmedRef = reactExports.useRef(false);
  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id"
  );
  const sessionQuery = useQuery({
    queryKey: ["stripeSession", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return null;
      return actor.getStripeSessionStatus(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId && !confirmedRef.current,
    retry: false
  });
  reactExports.useEffect(() => {
    if (sessionQuery.data && !confirmedRef.current) {
      confirmedRef.current = true;
      const status = sessionQuery.data;
      if (status.__kind__ === "completed") {
        ue.success(
          "🎉 Welcome to Premium! Your subscription is now active."
        );
        queryClient.invalidateQueries({ queryKey: ["subscriptionStatus"] });
        const url = new URL(window.location.href);
        url.searchParams.delete("session_id");
        window.history.replaceState({}, "", url.toString());
      } else if (status.__kind__ === "failed") {
        ue.error("Payment could not be confirmed. Please contact support.");
      }
    }
  }, [sessionQuery.data, queryClient]);
  return { sessionId, isConfirming: sessionQuery.isFetching };
}
function PricingPage() {
  const { actor } = useActor(createActor);
  const { isAuthenticated, login, isLoading: authLoading } = useAuth();
  const { isPremium, isLoading: subLoading } = useSubscription();
  const [isAnnual, setIsAnnual] = reactExports.useState(false);
  const [checkoutLoading, setCheckoutLoading] = reactExports.useState(false);
  const { sessionId, isConfirming } = useStripeSessionConfirm();
  const checkoutMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      const successUrl = `${window.location.origin}/pricing?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/pricing`;
      return actor.createSubscriptionCheckout(successUrl, cancelUrl);
    },
    onSuccess: (url) => {
      window.location.href = url;
    },
    onError: () => {
      ue.error("Could not start checkout. Please try again.");
      setCheckoutLoading(false);
    }
  });
  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      await login();
      return;
    }
    setCheckoutLoading(true);
    await checkoutMutation.mutateAsync();
  };
  const isPageLoading = subLoading || isConfirming || !!sessionId && !isPremium;
  const currentPrice = isAnnual ? ANNUAL_PRICE : MONTHLY_PRICE;
  const savingsText = isAnnual ? `Save ₹${MONTHLY_PRICE * 12 - ANNUAL_PRICE} vs monthly` : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Unlock Your Full Career Journey",
        subtitle: "Start free, go deeper with Premium — designed for students in Grades 10–12.",
        centered: true,
        badge: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-semibold", children: "🎓 Career Sandbox" })
      }
    ) }) }),
    !isPageLoading && isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "max-w-4xl mx-auto px-4 pt-6",
        "data-ocid": "premium-banner",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/10 border border-primary/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-6 h-6 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-lg", children: "You're Premium! ✨" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "You have full access to all career streams, roadmaps, and PDF downloads." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CTAButton,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => {
                window.location.href = "/account";
              },
              "data-ocid": "manage-subscription-btn",
              children: "Manage Subscription"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-center gap-3 mb-10",
          "data-ocid": "billing-toggle",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-sm font-medium transition-colors ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`,
                children: "Monthly"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: isAnnual,
                onCheckedChange: setIsAnnual,
                "aria-label": "Toggle annual billing",
                className: "data-[state=checked]:bg-primary"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-sm font-medium transition-colors ${isAnnual ? "text-foreground" : "text-muted-foreground"}`,
                children: "Annual"
              }
            ),
            isAnnual && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.span,
              {
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                className: "text-xs font-bold bg-[oklch(var(--stream-commerce-light))] text-[oklch(var(--stream-commerce))] px-2.5 py-0.5 rounded-full border border-[oklch(var(--stream-commerce)/0.3)]",
                children: "Save 30%"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.4 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "p-6 h-full flex flex-col border-border shadow-card bg-card",
                "data-ocid": "plan-card-free",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-accent" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground", children: "Explorer" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Free forever" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-4xl text-foreground", children: "Free" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Start discovering careers today — no card needed." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 flex-1 mb-6", children: FREE_FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "li",
                    {
                      className: "flex items-start gap-2.5 text-sm text-foreground",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent shrink-0 mt-0.5", children: f.icon }),
                        f.text
                      ]
                    },
                    f.text
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CTAButton,
                    {
                      type: "button",
                      variant: "secondary",
                      className: "w-full min-h-[48px]",
                      onClick: () => {
                        window.location.href = "/quiz";
                      },
                      "data-ocid": "cta-free",
                      children: "Get Started Free"
                    }
                  )
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.4, delay: 0.1 },
            className: "relative",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3.5 left-1/2 -translate-x-1/2 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full shadow-card whitespace-nowrap", children: "🌟 Most Popular" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Card,
                {
                  className: "p-6 h-full flex flex-col border-primary/40 shadow-elevated bg-card relative overflow-hidden",
                  "data-ocid": "plan-card-premium",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute top-0 left-0 right-0 h-1 rounded-t-xl",
                        style: {
                          background: "linear-gradient(90deg, oklch(0.72 0.14 50), oklch(0.76 0.2 65))"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4 mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-5 h-5 text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground", children: "Premium" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isAnnual ? "Annual plan" : "Monthly plan" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-end gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-4xl text-foreground", children: [
                        "₹",
                        currentPrice.toLocaleString("en-IN")
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm mb-1", children: isAnnual ? "/ year" : "/ month" })
                    ] }),
                    isAnnual && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.p,
                      {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        className: "text-xs text-muted-foreground mb-1",
                        children: [
                          "≈ ₹",
                          ANNUAL_MONTHLY_EQUIV,
                          "/month · ",
                          savingsText
                        ]
                      },
                      "annual-equiv"
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5 mt-1", children: "Full career exploration with roadmap & projects." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 flex-1 mb-6", children: PREMIUM_FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `shrink-0 mt-0.5 ${f.premium === false ? "text-muted-foreground" : "text-primary"}`,
                          children: f.icon
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: f.premium !== false ? "text-foreground font-medium" : "text-muted-foreground",
                          children: f.text
                        }
                      )
                    ] }, f.text)) }),
                    isPageLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-full" }) : isPremium ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "w-full min-h-[48px] rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center gap-2 text-sm font-semibold text-primary",
                        "data-ocid": "cta-premium-active",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                          "Current Plan"
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CTAButton,
                      {
                        type: "button",
                        variant: "primary",
                        className: "w-full min-h-[48px]",
                        loading: checkoutLoading || authLoading,
                        onClick: handleSubscribe,
                        "data-ocid": isAuthenticated ? "cta-subscribe" : "cta-login-to-subscribe",
                        children: isAuthenticated ? "Start 7-Day Free Trial" : "Login to Subscribe"
                      }
                    ),
                    !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-3", children: "No charge during the 7-day trial. Cancel anytime." })
                  ]
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.2 },
          className: "flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 py-5 px-6 bg-muted/40 rounded-2xl border border-border mb-10",
          "data-ocid": "trust-signals",
          children: TRUST_SIGNALS.map((signal) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 text-sm text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: signal.icon }),
                signal.text
              ]
            },
            signal.text
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "bg-card rounded-2xl border border-border overflow-hidden shadow-card",
          "data-ocid": "feature-comparison",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 bg-muted/50 border-b border-border px-5 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wide", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-1", children: "Feature" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center", children: "Free" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center text-primary", children: "Premium" })
            ] }),
            COMPARISON_ROWS.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `grid grid-cols-3 px-5 py-3.5 items-center ${i % 2 === 1 ? "bg-muted/20" : ""} ${i < COMPARISON_ROWS.length - 1 ? "border-b border-border/50" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground col-span-1 pr-4", children: row.feature }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center", children: row.free ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-accent mx-auto" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/40 text-lg leading-none", children: "—" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary mx-auto" }) })
                ]
              },
              row.feature
            ))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-8", children: [
        "All subscriptions billed securely through Stripe.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/support", className: "text-primary hover:underline", children: "Need help?" })
      ] })
    ] })
  ] });
}
const COMPARISON_ROWS = [
  { feature: "Mindset quiz", free: true },
  { feature: "Stream recommendation", free: true },
  { feature: "Browse all 4 career streams", free: true },
  { feature: "Career profile overviews", free: true },
  { feature: "Full quizzes per stream", free: false },
  { feature: "Micro-projects & challenges", free: false },
  { feature: "Personalised career roadmap", free: false },
  { feature: "PDF roadmap download", free: false },
  { feature: "Support resources & FAQ", free: false }
];
export {
  PricingPage as default
};
