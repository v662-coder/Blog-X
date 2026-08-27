import React from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Newspaper,
  BarChart3,
  Search,
  Moon,
  Trophy,
  HeartPulse,
  Cpu,
  Landmark,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const FEATURES = [
  {
    icon: BarChart3,
    title: "A dashboard that actually shows something",
    body: "Bar and pie charts break down every item by desk and by status the moment you add it — no refresh needed.",
  },
  {
    icon: Search,
    title: "One search bar, every desk",
    body: "Find anything across all six categories instantly, without hunting through separate pages.",
  },
  {
    icon: Moon,
    title: "Light or dark, your call",
    body: "A real dark mode that remembers your choice, not just an inverted color scheme.",
  },
];

const DESKS = [
  { icon: Trophy, label: "Sports", color: "#2F8F5B" },
  { icon: HeartPulse, label: "Health", color: "#E0556F" },
  { icon: Cpu, label: "Technology", color: "#3E7CB1" },
  { icon: Landmark, label: "Politics", color: "#8B5FBF" },
];

export default function Landing() {
  const { user, authLoading } = useAuth();

  // Already signed in and just landed on "/"? Skip the pitch.
  if (!authLoading && user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen overflow-hidden bg-paper-100 dark:bg-ink-900">
      {/* ---------- Hero ---------- */}
      <header className="relative mx-auto max-w-5xl px-4 pb-4 pt-10 text-center sm:pt-16">
        <div className="animate-fade-in mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-900 text-wire shadow-card dark:bg-wire dark:text-ink-950">
          <Newspaper size={26} />
        </div>

        <p className="animate-slide-up font-mono text-xs uppercase tracking-widest text-wire" style={{ animationDelay: "60ms" }}>
          Your personal newsroom
        </p>

        <h1
          className="animate-slide-up mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl"
          style={{ animationDelay: "120ms" }}
        >
          Every part of your life,
          <br className="hidden sm:block" /> filed to its own desk.
        </h1>

        <p
          className="animate-slide-up mx-auto mt-5 max-w-xl text-base text-ink-900/60 dark:text-paper-100/60"
          style={{ animationDelay: "180ms" }}
        >
          The Desk is a dashboard for tracking tasks and notes across Sports, Health,
          Technology, Politics, Entertainment and Finance — with live charts, instant
          search, and everything saved to your own Google account.
        </p>

        <div
          className="animate-slide-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            to="/login"
            className="group flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-paper-100 shadow-card transition hover:-translate-y-0.5 hover:bg-ink-700 dark:bg-wire dark:text-ink-950 dark:hover:bg-wire/90"
          >
            Continue with Google
            <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
          </Link>
          <span className="text-xs text-ink-900/40 dark:text-paper-100/40">
            Free — takes about five seconds
          </span>
        </div>

        {/* Floating desk icons purely for visual interest */}
        <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
          {DESKS.map((d, i) => (
            <span
              key={d.label}
              className="animate-float absolute flex h-12 w-12 items-center justify-center rounded-2xl opacity-70"
              style={{
                backgroundColor: `${d.color}1A`,
                color: d.color,
                top: `${[8, 22, 60, 75][i]}%`,
                left: `${[6, 88, 4, 90][i]}%`,
                animationDelay: `${i * 400}ms`,
              }}
            >
              <d.icon size={20} />
            </span>
          ))}
        </div>
      </header>

      {/* ---------- 🔥 NEW: Developer Setup Notice (Highlighted) ---------- */}
      <div className="animate-slide-up mx-auto max-w-4xl px-4 pb-2" style={{ animationDelay: "300ms" }}>
        <div className="flex items-start gap-3 rounded-xl border border-amber-400/40 bg-amber-50/80 p-4 text-sm shadow-sm backdrop-blur-sm transition dark:border-amber-600/40 dark:bg-amber-950/30">
          <span className="mt-0.5 text-xl">🛠️</span>
          <div>
            <span className="font-semibold text-amber-800 dark:text-amber-400">
              Developer Setup Required:
            </span>
            <span className="text-ink-900/70 dark:text-paper-100/70">
              {" "}To run this app, you must connect your own Firebase project. 
              Add your{" "}
              <code className="rounded bg-ink-900/10 px-1.5 py-0.5 font-mono text-xs font-semibold text-ink-900 dark:bg-paper-100/10 dark:text-paper-100">
                VITE_FIREBASE_API_KEY
              </code>
              {" "}and other credentials to a{" "}
              <code className="rounded bg-ink-900/10 px-1.5 py-0.5 font-mono text-xs font-semibold text-ink-900 dark:bg-paper-100/10 dark:text-paper-100">
                .env
              </code>
              {" "}file in the root directory. Check the README for the full list of variables.
            </span>
          </div>
        </div>
      </div>

      {/* ---------- Feature grid ---------- */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="animate-slide-up rounded-2xl border border-ink-900/10 bg-paper-50 p-6 shadow-card transition hover:-translate-y-1 dark:border-paper-100/10 dark:bg-ink-800"
              style={{ animationDelay: `${360 + i * 100}ms` }} // Delay shifted to accommodate notice
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-wire/15 text-wire">
                <f.icon size={18} />
              </span>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-ink-900/60 dark:text-paper-100/60">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Footer CTA ---------- */}
      <footer className="border-t border-ink-900/10 py-10 text-center dark:border-paper-100/10">
        <p className="text-sm text-ink-900/50 dark:text-paper-100/50">
          Sign in once — your desks are saved to your account and load instantly next time.
        </p>
        <Link
          to="/login"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-wire hover:underline"
        >
          Get started <ArrowRight size={14} />
        </Link>
      </footer>
    </div>
  );
}