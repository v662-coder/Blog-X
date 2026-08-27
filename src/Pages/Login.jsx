import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Newspaper } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, authLoading, authError, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (!authLoading && user) return <Navigate to={from} replace />;

  const handleSignIn = async () => {
    const ok = await signInWithGoogle();
    if (ok) navigate(from, { replace: true });
  };

  return (
    <div className="flex min-h-[calc(100vh-0px)] items-center justify-center bg-paper-100 px-4 dark:bg-ink-900">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-900 text-wire dark:bg-wire dark:text-ink-950">
          <Newspaper size={26} />
        </div>
        <h1 className="font-display text-3xl font-semibold">The Desk</h1>
        <p className="mt-2 text-sm text-ink-900/60 dark:text-paper-100/60">
          Your personal newsroom — six desks, one dashboard, everything filed and searchable.
        </p>

        <button
          onClick={handleSignIn}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-ink-900/15 bg-paper-50 py-3 text-sm font-semibold shadow-card transition hover:bg-ink-900/5 dark:border-paper-100/15 dark:bg-ink-800 dark:hover:bg-paper-100/10"
        >
          <GoogleGlyph />
          Continue with Google
        </button>

        {authError && (
          <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500">
            {authError}
          </p>
        )}
      </div>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4 16 4 9 8.5 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.9 14.2-5l-6.5-5.5C29.6 35.4 26.9 36 24 36c-5.2 0-9.7-3.4-11.3-8.1l-6.6 5C9 39.5 16 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.5 5.5C41.4 35.8 44 30.3 44 24c0-1.2-.1-2.4-.4-3.5z" />
    </svg>
  );
}
