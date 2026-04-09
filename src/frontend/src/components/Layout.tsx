import { Outlet } from "@tanstack/react-router";
import Navbar from "./Navbar";

export default function Layout() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-display font-bold text-foreground">
              Career Sandbox
            </span>
            <span className="text-muted-foreground text-sm">
              — Explore. Discover. Become.
            </span>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center">
            <a
              href="/pricing"
              className="hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="/support"
              className="hover:text-foreground transition-colors"
            >
              Support
            </a>
            <a href="/quiz" className="hover:text-foreground transition-colors">
              Mindset Quiz
            </a>
          </nav>
          <p className="text-xs text-muted-foreground">
            © {year}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
