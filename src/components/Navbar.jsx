import React from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { user, signOutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-20 border-b border-ink-900/10 bg-paper-50/90 backdrop-blur dark:border-paper-100/10 dark:bg-ink-900/90">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
        <Link to="/" className="mr-2 shrink-0">
          <span className="font-display text-2xl font-semibold tracking-tight">
            The Desk
          </span>
          <span className="ml-2 hidden font-mono text-[11px] uppercase tracking-widest text-ink-900/50 dark:text-paper-100/50 sm:inline">
            {today}
          </span>
        </Link>

        {user && (
          <div className="order-3 w-full sm:order-2 sm:mx-4 sm:w-auto sm:flex-1">
            <SearchBar />
          </div>
        )}

        <div className="order-2 ml-auto flex items-center gap-2 sm:order-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-full border border-ink-900/10 p-2 text-ink-900 transition hover:bg-ink-900/5 dark:border-paper-100/10 dark:text-paper-100 dark:hover:bg-paper-100/10"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {user && (
            <button
              onClick={signOutUser}
              className="flex items-center gap-1.5 rounded-full border border-ink-900/10 py-1.5 pl-1.5 pr-3 text-sm transition hover:bg-ink-900/5 dark:border-paper-100/10 dark:hover:bg-paper-100/10"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="h-6 w-6 rounded-full" referrerPolicy="no-referrer" />
              ) : (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-wire text-xs font-semibold text-ink-950">
                  {(user.displayName || "U")[0]}
                </span>
              )}
              <span className="hidden max-w-[10rem] truncate sm:inline">
                {user.displayName || user.email}
              </span>
              <LogOut size={14} className="opacity-60" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
