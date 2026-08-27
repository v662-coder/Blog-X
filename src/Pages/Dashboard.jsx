import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import { Plus } from "lucide-react";
import { CATEGORIES } from "../constants/categories";
import { useItems } from "../context/ItemsContext";
import { useAuth } from "../context/AuthContext";
import StatCard from "../components/StatCard";
import ItemCard from "../components/ItemCard";
import ItemFormModal from "../components/ItemFormModal";
import EmptyState from "../components/EmptyState";
import Ticker from "../components/Ticker";

export default function Dashboard() {
  const { items, filteredItems, loading, error } = useItems();
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const barData = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        name: c.label,
        count: items.filter((i) => i.category === c.id).length,
        color: c.color,
      })),
    [items]
  );

  const completed = items.filter((i) => i.status === "completed").length;
  const pending = items.length - completed;
  const pieData = [
    { name: "Completed", value: completed, color: "#2F8F5B" },
    { name: "Pending", value: pending, color: "#E8A33D" },
  ];

  const openModal = (item = null) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const firstName = (user?.displayName || "there").split(" ")[0];

  return (
    <div className="pb-16">
      <Ticker items={items} />

      <div className="py-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-wire">
              Morning edition
            </p>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">
              Good to see you, {firstName}.
            </h1>
          </div>
          <button
            onClick={() => openModal(null)}
            className="group flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2.5 text-sm font-semibold text-paper-100 shadow-card transition hover:-translate-y-0.5 hover:bg-ink-700 dark:bg-wire dark:text-ink-950 dark:hover:bg-wire/90"
          >
            <Plus size={15} className="transition-transform duration-300 group-hover:rotate-90" />
            New item
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Total items" value={items.length} />
          <StatCard label="Open" value={pending} accent="#E8A33D" />
          <StatCard label="Resolved" value={completed} accent="#2F8F5B" />
          <StatCard label="Desks in use" value={barData.filter((b) => b.count > 0).length} />
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="rounded-2xl border border-ink-900/10 bg-paper-50 p-5 shadow-card dark:border-paper-100/10 dark:bg-ink-800 lg:col-span-3">
            <h2 className="mb-4 font-display text-lg font-semibold">Items per desk</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-ink-900/10 dark:text-paper-100/10" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" height={50} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, fontSize: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl border border-ink-900/10 bg-paper-50 p-5 shadow-card dark:border-paper-100/10 dark:bg-ink-800 lg:col-span-2">
            <h2 className="mb-4 font-display text-lg font-semibold">Completion status</h2>
            {items.length === 0 ? (
              <p className="py-16 text-center text-sm text-ink-900/40 dark:text-paper-100/40">
                Add items to see this fill in.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "none" }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-display text-lg font-semibold">
            {filteredItems.length !== items.length ? "Search results" : "Latest across every desk"}
          </h2>
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-900/20 border-t-wire dark:border-paper-100/20" />
            </div>
          ) : filteredItems.length === 0 ? (
            <EmptyState label="anything" onAdd={() => openModal(null)} />
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {filteredItems.slice(0, 12).map((item, i) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onEdit={openModal}
                  showCategoryBadge
                  style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ItemFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editingItem={editingItem}
        defaultCategory={CATEGORIES[0].id}
      />
    </div>
  );
}