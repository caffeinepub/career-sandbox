import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useRouterState } from "@tanstack/react-router";
import { LogIn, LogOut, Menu, Sparkles, User, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useSubscription } from "../hooks/use-subscription";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/quiz", label: "Mindset Quiz" },
  { to: "/streams", label: "Career Streams" },
  { to: "/roadmap", label: "My Roadmap" },
  { to: "/pricing", label: "Pricing" },
  { to: "/support", label: "Support" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const { isPremium } = useSubscription();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (to: string) =>
    to === "/" ? currentPath === "/" : currentPath.startsWith(to);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          data-ocid="nav-logo"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground text-sm leading-tight hidden sm:block">
            Career
            <br />
            Sandbox
          </span>
          <span className="font-display font-bold text-foreground text-base sm:hidden">
            Career Sandbox
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          data-ocid="nav-desktop"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                isActive(link.to)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth + mobile menu */}
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <div className="hidden sm:flex items-center gap-2">
              {isPremium && (
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                  Premium
                </span>
              )}
              <Link to="/account">
                <Avatar
                  className="w-8 h-8 cursor-pointer"
                  data-ocid="nav-avatar"
                >
                  <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={isAuthenticated ? logout : login}
            disabled={isLoading}
            className="hidden sm:flex touch-target items-center gap-1.5 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            data-ocid="nav-auth-btn"
          >
            {isAuthenticated ? (
              <>
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </>
            ) : (
              <>
                <LogIn className="w-3.5 h-3.5" />
                Login
              </>
            )}
          </Button>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden touch-target"
                aria-label="Open menu"
                data-ocid="nav-mobile-menu"
              >
                {open ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-card p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-border flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                  <span className="font-display font-bold text-foreground">
                    Career Sandbox
                  </span>
                </div>
                <nav className="flex-1 p-4 flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={`px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                        isActive(link.to)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="p-4 border-t border-border">
                  <Button
                    className="w-full touch-target bg-secondary text-secondary-foreground hover:bg-[oklch(0.62_0.11_145)]"
                    onClick={() => {
                      setOpen(false);
                      isAuthenticated ? logout() : login();
                    }}
                    disabled={isLoading}
                    data-ocid="nav-mobile-auth-btn"
                  >
                    {isAuthenticated ? (
                      <>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4 mr-2" />
                        Login with Internet Identity
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
