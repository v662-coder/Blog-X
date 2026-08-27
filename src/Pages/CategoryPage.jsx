import React, { useMemo, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { getCategory, CATEGORIES } from "../constants/categories";
import { useItems } from "../context/ItemsContext";
import ItemCard from "../components/ItemCard";
import ItemFormModal from "../components/ItemFormModal";
import EmptyState from "../components/EmptyState";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const isValid = CATEGORIES.some((c) => c.id === categoryId);
  const { filteredItems, loading } = useItems();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  if (!isValid) return <Navigate to="/" replace />;

  const cat = getCategory(categoryId);
  const Icon = cat.icon;

  const deskItems = useMemo(() => {
    let list = filteredItems.filter((i) => i.category === categoryId);
    if (statusFilter !== "all") list = list.filter((i) => i.status === statusFilter);
    return list;
  }, [filteredItems, categoryId, statusFilter]);

  const openModal = (item = null) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  return (
    <div className="py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${cat.color}22`, color: cat.color }}
          >
            <Icon size={20} />
          </span>
          <div>
            <h1 className="font-display text-2xl font-semibold sm:text-3xl">{cat.label}</h1>
            <p className="text-sm text-ink-900/50 dark:text-paper-100/50">{cat.tagline}</p>
          </div>
        </div>
        <button
          onClick={() => openModal(null)}
          className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-card transition"
          style={{ backgroundColor: cat.color }}
        >
          <Plus size={15} /> Add to {cat.label}
        </button>
      </div>

      <div className="mb-5 flex gap-2">
        {["all", "pending", "completed"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition ${
              statusFilter === s
                ? "bg-ink-900 text-paper-100 dark:bg-paper-100 dark:text-ink-900"
                : "bg-ink-900/5 text-ink-900/60 hover:bg-ink-900/10 dark:bg-paper-100/10 dark:text-paper-100/60"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-900/20 border-t-wire dark:border-paper-100/20" />
        </div>
      ) : deskItems.length === 0 ? (
        <EmptyState label={cat.label} onAdd={() => openModal(null)} />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {deskItems.map((item) => (
            <ItemCard key={item.id} item={item} onEdit={openModal} />
          ))}
        </div>
      )}

      <ItemFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editingItem={editingItem}
        defaultCategory={categoryId}
      />
    </div>
  );
}
