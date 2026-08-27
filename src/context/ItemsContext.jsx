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
  orderBy,
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
    const q = query(
      collection(db, COLLECTION),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
        setError(null);
      },
      (err) => {
        // Firestore throws "failed-precondition" if the composite index for
        // this where+orderBy pair hasn't been created yet — the console
        // link in err.message points straight to creating it.
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
