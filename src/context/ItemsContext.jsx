import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const ItemsContext = createContext(null);
const COLLECTION = "items";

export function ItemsProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    // IMPORTANT FIX: this used to be
    //   query(collection(db, COLLECTION), where("userId","==", uid), orderBy("createdAt","desc"))
    // A `where` on one field plus `orderBy` on a different field requires a
    // Firestore *composite index* that a fresh project doesn't have yet.
    // Firestore then rejects the query with a `failed-precondition` error,
    // onSnapshot's error callback fires, items never populate `items` state,
    // and — since the dashboard/graphs/lists all read from that same state —
    // nothing you add ever shows up anywhere, even though the write itself
    // succeeded in Firestore. Filtering by `userId` only avoids needing any
    // composite index; we sort by date on the client instead (cheap, since
    // this is a personal item list, not a huge dataset).
    const q = query(collection(db, COLLECTION), where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        docs.sort((a, b) => {
          const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          // Items just added via addDoc() haven't had their serverTimestamp
          // resolved locally yet (createdAt is briefly null) — treat those
          // as "now" so a brand-new item appears at the top immediately
          // instead of flashing at the bottom until the server round-trip.
          return (bTime || Date.now()) - (aTime || Date.now());
        });
        setItems(docs);
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message || "Couldn't load your items.");
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [user]);

  const addItem = async ({ title, description, category, status = "pending" }) => {
    if (!user) throw new Error("You must be signed in.");
    await addDoc(collection(db, COLLECTION), {
      title,
      description,
      category,
      status,
      userId: user.uid,
      userName: user.displayName || user.email || "Anonymous",
      createdAt: serverTimestamp(),
    });
  };

  const updateItem = async (id, changes) => {
    await updateDoc(doc(db, COLLECTION, id), changes);
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, COLLECTION, id));
  };

  const toggleStatus = async (item) => {
    await updateItem(item.id, {
      status: item.status === "completed" ? "pending" : "completed",
    });
  };

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.trim().toLowerCase();
    return items.filter(
      (i) =>
        i.title?.toLowerCase().includes(q) ||
        i.description?.toLowerCase().includes(q) ||
        i.category?.toLowerCase().includes(q)
    );
  }, [items, search]);

  return (
    <ItemsContext.Provider
      value={{
        items,
        filteredItems,
        loading,
        error,
        search,
        setSearch,
        addItem,
        updateItem,
        deleteItem,
        toggleStatus,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

export const useItems = () => useContext(ItemsContext);