"use client";
import { useFavorites } from "@/hooks/useFavorites";
import { CardList } from "@/app/components/card/card-list";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <p className="text-center mt-20">Nenhum favorito salvo 💔</p>;
  }

  return (
    <main className="mt-20 w-screen p-5 flex justify-center">
      <div className="max-w-[1440px] w-full">
        <h1 className="text-2xl font-bold mb-6">Meus Favoritos ❤️</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-4 xl:grid-cols-4  gap-6 justify-items-center mb-11">
          <CardList characters={favorites} />
        </div>
      </div>
    </main>
  );
}
