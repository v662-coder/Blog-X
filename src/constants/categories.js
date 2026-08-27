import {
  Trophy,
  HeartPulse,
  Cpu,
  Landmark,
  Clapperboard,
  LineChart,
} from "lucide-react";

// Six "desks" — the four requested (Sports, Health, Technology, Politics)
// plus two added to round out a real newsroom: Entertainment and Finance.
export const CATEGORIES = [
  {
    id: "sports",
    label: "Sports",
    tagline: "Scores, standings, training logs",
    color: "#2F8F5B",
    tw: "desk-sports",
    icon: Trophy,
  },
  {
    id: "health",
    label: "Health",
    tagline: "Appointments, habits, wellbeing",
    color: "#E0556F",
    tw: "desk-health",
    icon: HeartPulse,
  },
  {
    id: "technology",
    label: "Technology",
    tagline: "Builds, bugs, releases",
    color: "#3E7CB1",
    tw: "desk-technology",
    icon: Cpu,
  },
  {
    id: "politics",
    label: "Politics",
    tagline: "Policy, civic to-dos, deadlines",
    color: "#8B5FBF",
    tw: "desk-politics",
    icon: Landmark,
  },
  {
    id: "entertainment",
    label: "Entertainment",
    tagline: "Watchlist, releases, reviews",
    color: "#D9822B",
    tw: "desk-entertainment",
    icon: Clapperboard,
  },
  {
    id: "finance",
    label: "Finance",
    tagline: "Bills, budgets, invoices",
    color: "#1FA0A0",
    tw: "desk-finance",
    icon: LineChart,
  },
];

export const getCategory = (id) =>
  CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];

export const STATUSES = ["pending", "completed"];
