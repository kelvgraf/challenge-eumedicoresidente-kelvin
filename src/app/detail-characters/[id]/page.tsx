"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { getCharacterById } from "@/domain/usecases/getCharacterById";

import { Typography } from "@/components/typography";
import { Icons } from "@/components/icon";
import { Button } from "@/components/buttons";

import MortyRunningLoading from "@/../public/images/morty-running.gif";
import RickRunningLoading from "@/../public/images/rick-running.gif";
import MortyRotateLoading from "@/../public/images/morty-rotate.gif";

interface Character {
  id: string;
  name: string;
  status: string | "Alive" | "Dead" | "unknown";
  species: string;
  gender: string | "Male" | "Female" | "Genderless" | "unknown";
  origin: { name: string };
  location: { name: string };
  episode: { id: string; name: string; episode: string }[];
  image: string;
}

function CharacterInfoRow({
  icon,
  label,
}: {
  icon: string;
  label: string | undefined;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <Icons name={icon} size={20} className="stroke-gray-500" />
      <Typography variant="p" text={label || ""} className="text-gray-600" />
    </span>
  );
}

export default function DetailCharactersPage() {
  const { id } = useParams();
  const router = useRouter();

  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  const loadingImages = [
    MortyRunningLoading,
    RickRunningLoading,
    MortyRotateLoading,
  ];

  useEffect(() => {
    if (!id) return;

    const fetchCharacter = async () => {
      try {
        const data = await getCharacterById(id as string);
        setCharacter(data);
      } catch (err) {
        console.error("Erro ao buscar personagem:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  const randomImage = useMemo(() => {
    const index = Math.floor(Math.random() * loadingImages.length);
    return loadingImages[index];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (loading) {
    return (
      <main className="absolute mt-20 w-screen p-5 flex justify-center">
        <Image
          src={randomImage}
          alt="logo rick and morty"
          height={64}
          width={218}
        />
        <Typography variant="h2" text="Carregando personagem..." />
      </main>
    );
  }

  if (!character) {
    return (
      <main className="absolute mt-20 w-screen p-5 flex justify-center">
        <Typography variant="h2" text="Personagem não encontrado." />
      </main>
    );
  }

  return (
    <main className="absolute mt-20 w-screen p-5 flex justify-center">
      <div className="w-full max-w-5xl">
        <Button
          className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-500 hover:text-white rounded-md transition"
          iconLeft="ArrowLeft2"
          text="Voltar"
          onClick={() => router.back()}
        />

        <div className="flex justify-center items-center flex-col md:flex-row gap-10 mt-8">
          <Image
            src={character.image || "/images/fallback-avatar.png"}
            alt={character.name}
            className="h-96 w-96 object-cover rounded-lg"
            height={384}
            width={384}
          />

          <div className="flex flex-col">
            <Typography
              variant="strong"
              text={character.name}
              className="text-4xl"
            />

            <Typography
              variant="h2"
              text={`Participou de ${character.episode.length} episódios`}
              className="text-3xl mt-6"
            />

            <div className="flex items-center flex-wrap gap-4 mt-6">
              <CharacterInfoRow
                icon="Heart"
                label={
                  character.status === "Alive"
                    ? "Vivo"
                    : character.status === "Dead"
                    ? "Morto"
                    : "Desconhecido"
                }
              />
              <CharacterInfoRow icon="User" label={character.species} />
              <CharacterInfoRow
                icon="Personalcard"
                label={
                  character.gender === "Male"
                    ? "Masculino"
                    : character.gender === "Female"
                    ? "Feminino"
                    : "Desconhecido"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
