import Image from "next/image";

import { useFavorites } from "@/hooks/useFavorites";

import { Icons } from "@/components/icon";
import { Card } from "@/components/card";
import { Typography } from "@/components/typography";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";

interface Character {
  id: string | number;
  name: string;
  image: string | StaticImport;
  status: string;
  species: string;
  origin?: { name: string };
}

interface CardListProps {
  characters: Character[];
}

function CardList({ characters }: CardListProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  return (
    <>
      {characters.map((character) => (
        <div
          className="w-full max-w-2xs min-w-64 bg-primary-100 dark:bg-primary-800 rounded-md"
          key={character.id}
        >
          <Link href={`/detail-characters/${character?.id}`}>
            <Card
              id={
                typeof character.id === "number"
                  ? character.id
                  : Number(character.id)
              }
              title={character?.name}
              iconRight="Heart"
              buttonClasses={`bg-neutral-200 hover:fill-red-900 hover:bg-transparent border-transparent ${
                isFavorite(character.id)
                  ? "fill-gray-700 stroke-gray-700"
                  : "stroke-neutral-100"
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (isFavorite(character.id)) {
                  removeFavorite(character.id);
                } else {
                  addFavorite(character);
                }
              }}
            >
              <div className="flex justify-center">
                <Image
                  src={character?.image}
                  alt={character?.name}
                  className="h-60 rounded-lg"
                  height={64}
                  width={218}
                />
              </div>
              <span className="flex items-center gap-2">
                <Icons name="Heart" size={20} className="stroke-gray-500" />
                <Typography
                  variant="p"
                  text={
                    character?.status === "Alive"
                      ? "Vivo"
                      : character?.status === "Dead"
                      ? "Morto"
                      : "Desconhecido"
                  }
                  className="text-gray-600"
                />
              </span>

              <span className="flex items-center gap-2">
                <Icons name="User" size={20} className="stroke-gray-500" />
                <Typography
                  variant="p"
                  text={character?.species}
                  className="text-gray-600"
                />
              </span>
              <span className="flex items-center gap-2">
                <Icons name="Global" size={20} className="stroke-gray-500" />
                <Typography
                  variant="p"
                  text={
                    character?.origin?.name === "unknown"
                      ? "Desconhecido"
                      : character?.origin?.name || "Desconhecido"
                  }
                  className="text-gray-600"
                />
              </span>
            </Card>
          </Link>
        </div>
      ))}
    </>
  );
}

export { CardList };
