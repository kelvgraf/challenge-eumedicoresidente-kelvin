import { useState, useEffect } from "react";
import { Character } from "../types/types";

const STORAGE_KEY = "favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Character[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const saveToStorage = (items: Character[]) => {
    setFavorites(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const addFavorite = (character: Character) => {
    if (!favorites.find((fav) => fav.id === character.id)) {
      saveToStorage([...favorites, character]);
    }
  };

  const removeFavorite = (id: number | string) => {
    saveToStorage(favorites.filter((fav) => fav.id !== id));
  };

  const isFavorite = (id: number | string) =>
    favorites.some((fav) => fav.id === id);

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
