import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-900/20 border-t-wire dark:border-paper-100/20" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
