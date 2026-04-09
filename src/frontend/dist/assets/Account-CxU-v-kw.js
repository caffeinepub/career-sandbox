import { c as createLucideIcon, j as jsxRuntimeExports, b as cn, r as reactExports, P as Primitive, u as useActor, d as useAuth, i as useSubscription, l as useQueryClient, g as useQuery, k as Skeleton, A as Avatar, z as AvatarFallback, U as User, B as Button, D as LogOut, f as createActor } from "./index-DjbwzvVy.js";
import { C as Card } from "./card-wY6ZCGgf.js";
import { u as useMutation, a as ue } from "./index-JTaet32S.js";
import { C as CTAButton } from "./CTAButton-pFUcJbHN.js";
import { P as PageHeader } from "./PageHeader-CLg6hBYS.js";
import { P as ProgressBadge } from "./ProgressBadge-DlPC_Cpq.js";
import { S as STREAM_META } from "./types-CkSawsG_.js";
import { m as motion } from "./proxy-C-5a5GeL.js";
import { C as Crown } from "./crown-CS_1DGV-.js";
import "./arrow-right-CJXVtCt-.js";
import "./star-e8YcrMVJ.js";
import "./circle-check-C_MaQlia.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode);
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function AccountPage() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated, logout } = useAuth();
  const { isPremium } = useSubscription();
  const queryClient = useQueryClient();
  const [editing, setEditing] = reactExports.useState(false);
  const [nameInput, setNameInput] = reactExports.useState("");
  const { data: profile, isLoading } = useQuery({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching && isAuthenticated
  });
  const saveMutation = useMutation({
    mutationFn: async (name) => {
      if (!actor) throw new Error("Actor not available");
      await actor.saveCallerUserProfile(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerProfile"] });
      setEditing(false);
      ue.success("Profile updated!");
    },
    onError: () => ue.error("Failed to update profile.")
  });
  const handleEditStart = () => {
    setNameInput((profile == null ? void 0 : profile.name) ?? "");
    setEditing(true);
  };
  const handleSave = async () => {
    if (!nameInput.trim()) return;
    await saveMutation.mutateAsync(nameInput.trim());
  };
  const activeStream = (profile == null ? void 0 : profile.activeStream) ? STREAM_META.find((s) => s.id === profile.activeStream) : null;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "My Account",
        subtitle: "Manage your profile and subscription."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6 mb-6", "data-ocid": "account-profile-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-14 h-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/20 text-primary font-bold text-xl", children: (profile == null ? void 0 : profile.name) ? profile.name[0].toUpperCase() : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-6 h-6" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name-input", className: "text-xs", children: "Display Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "name-input",
                  value: nameInput,
                  onChange: (e) => setNameInput(e.target.value),
                  className: "h-8 text-sm w-48",
                  placeholder: "Your name",
                  "data-ocid": "account-name-input"
                }
              )
            ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground", children: (profile == null ? void 0 : profile.name) ?? "Anonymous Explorer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Career Sandbox Member" })
            ] }) })
          ] }),
          editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                onClick: () => setEditing(false),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CTAButton,
              {
                size: "sm",
                loading: saveMutation.isPending,
                onClick: handleSave,
                "data-ocid": "account-save-btn",
                children: "Save"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "ghost",
              onClick: handleEditStart,
              className: "flex items-center gap-1.5 touch-target",
              "data-ocid": "account-edit-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-3.5 h-3.5" }),
                "Edit"
              ]
            }
          )
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 mb-6", "data-ocid": "account-subscription-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-4 h-4 text-amber-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground", children: "Subscription" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProgressBadge,
              {
                variant: isPremium ? "premium" : "new",
                label: isPremium ? "Premium" : "Free"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: isPremium ? "You have full access to all quizzes, projects, and roadmap features." : "Upgrade to Premium to unlock all content and your personalised roadmap." }),
          !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/pricing", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            CTAButton,
            {
              variant: "primary",
              size: "sm",
              "data-ocid": "account-upgrade-btn",
              children: "Upgrade to Premium"
            }
          ) }),
          isPremium && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Manage billing and cancellation on the",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/pricing", className: "text-primary hover:underline", children: "Pricing page" }),
            "."
          ] })
        ] })
      }
    ),
    activeStream && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 mb-6", "data-ocid": "account-stream-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground mb-3", children: "Active Stream" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: activeStream.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: activeStream.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: activeStream.tagline })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.3 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full touch-target flex items-center gap-2 text-destructive border-destructive/30 hover:bg-destructive/5",
            onClick: logout,
            "data-ocid": "account-logout-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
              "Sign Out"
            ]
          }
        )
      }
    )
  ] });
}
export {
  AccountPage as default
};
