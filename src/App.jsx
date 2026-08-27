import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ItemsProvider } from "./context/ItemsContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import CategoryPage from "./Pages/CategoryPage";
// index.css is already imported once in main.jsx. App.css is no longer
// imported anywhere — its gradient background fought the ink/paper/wire
// theme, so it's fine to delete src/App.css if you want.

// App itself only sets up providers + the router. Nothing in here can call
// useAuth()/useTheme()/useItems() — those hooks need to run *inside* the
// providers below them, not in the component that renders the providers.
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ItemsProvider>
          <Router>
            <AppShell />
          </Router>
        </ItemsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// AppShell is a *child* of AuthProvider, so useAuth() here works.
function AppShell() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-paper-100 dark:bg-ink-900">
      {user && <Navbar />}

      <Routes>
        <Route path="/" element={user ? <DashboardArea /> : <Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/desk/:categoryId"
          element={
            <ProtectedRoute>
              <div className="mx-auto flex max-w-6xl gap-6 px-4 lg:px-0">
                <Sidebar />
                <div className="min-w-0 flex-1">
                  <CategoryPage />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function DashboardArea() {
  return (
    <ProtectedRoute>
      <div className="mx-auto flex max-w-6xl gap-6 px-4 lg:px-0">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Dashboard />
        </div>
      </div>
    </ProtectedRoute>
  );
}