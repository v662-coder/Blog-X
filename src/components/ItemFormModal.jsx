import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { CATEGORIES } from "../constants/categories";
import { useItems } from "../context/ItemsContext";

export default function ItemFormModal({ open, onClose, defaultCategory, editingItem }) {
  const { addItem, updateItem } = useItems();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(defaultCategory || CATEGORIES[0].id);
  const [status, setStatus] = useState("pending");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title || "");
      setDescription(editingItem.description || "");
      setCategory(editingItem.category || defaultCategory || CATEGORIES[0].id);
      setStatus(editingItem.status || "pending");
    } else {
      setTitle("");
      setDescription("");
      setCategory(defaultCategory || CATEGORIES[0].id);
      setStatus("pending");
    }
    setFormError(null);
  }, [editingItem, defaultCategory, open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError("Give it a title before filing it to a desk.");
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      if (editingItem) {
        await updateItem(editingItem.id, { title, description, category, status });
      } else {
        await addItem({ title, description, category, status });
      }
      onClose();
    } catch (err) {
      setFormError(err.message || "Couldn't save. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
  <div className="animate-fade-in fixed inset-0 z-30 flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm">
  <div className="animate-pop-in w-full max-w-md rounded-2xl border border-ink-900/10 bg-paper-50 p-5 shadow-2xl dark:border-paper-100/10 dark:bg-ink-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">
            {editingItem ? "Edit item" : "File a new item"}
          </h2>
          <button onClick={onClose} aria-label="Close" className="text-ink-900/50 hover:text-ink-900 dark:text-paper-100/50 dark:hover:text-paper-100">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-900/50 dark:text-paper-100/50">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Renew gym membership"
              className="w-full rounded-lg border border-ink-900/15 bg-paper-100 px-3 py-2 text-sm outline-none focus:border-wire dark:border-paper-100/15 dark:bg-ink-900"
              autoFocus
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-900/50 dark:text-paper-100/50">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any detail worth keeping"
              rows={3}
              className="w-full resize-none rounded-lg border border-ink-900/15 bg-paper-100 px-3 py-2 text-sm outline-none focus:border-wire dark:border-paper-100/15 dark:bg-ink-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-900/50 dark:text-paper-100/50">
                Desk
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-ink-900/15 bg-paper-100 px-3 py-2 text-sm outline-none focus:border-wire dark:border-paper-100/15 dark:bg-ink-900"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-900/50 dark:text-paper-100/50">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-lg border border-ink-900/15 bg-paper-100 px-3 py-2 text-sm outline-none focus:border-wire dark:border-paper-100/15 dark:bg-ink-900"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {formError && <p className="text-sm text-red-500">{formError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-lg bg-ink-900 py-2.5 text-sm font-semibold text-paper-100 transition hover:bg-ink-700 disabled:opacity-60 dark:bg-wire dark:text-ink-950 dark:hover:bg-wire/90"
          >
            {submitting ? "Saving…" : editingItem ? "Save changes" : "Add to desk"}
          </button>
        </form>
      </div>
    </div>
  );
}
