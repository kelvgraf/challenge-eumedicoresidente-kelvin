"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { getCharacters } from "../domain/usecases/getCharacters";
import { useTimeout } from "@/hooks/useTimeou";
import useDebounce from "@/hooks/useDebouce";

import { CardList } from "@/app/components/card";
import { Input } from "@/components/forms/input";
import { Button } from "@/components/buttons";
import { Typography } from "@/components/typography";
import { Pagination } from "@/components/pagination";

import MortyRunningLoading from "@/../public/images/morty-running.gif";
import RickRunningLoading from "@/../public/images/rick-running.gif";
import MortyRotateLoading from "@/../public/images/morty-rotate.gif";

import { Character } from "@/types/types";

export default function HomePage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 600);

  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>(""); // alive | dead | unknown
  const [speciesFilter, setSpeciesFilter] = useState<string>("");

  const delayDone = useTimeout(2000);
  const showLoading = loading || !delayDone;

  const loadingImages = [
    MortyRunningLoading,
    RickRunningLoading,
    MortyRotateLoading,
  ];

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const data = await getCharacters(
          page,
          debouncedQuery,
          statusFilter,
          speciesFilter
        );
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } finally {
        setLoading(false);
      }
    })();
  }, [page, debouncedQuery, statusFilter, speciesFilter]);

  const randomImage = useMemo(() => {
    const index = Math.floor(Math.random() * loadingImages.length);
    return loadingImages[index];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLoading]);

  return (
    <main className="absolute mt-20 w-screen p-5 flex justify-center">
      <div className="max-w-[1440px] w-full flex flex-col justify-center">
        <div className="flex items-center justify-between gap-6 mb-11 w-full">
          <span className="flex items-start sm:items-center flex-col sm:flex-row gap-2 w-full">
            <Input
              className="w-full lg:w-1/3 lg:max-w-1/2"
              placeholder="Busque pelo nome do personagem"
              iconRight={query ? "CloseCircle" : "SearchNormal1"}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClickIcon={() => setQuery("")}
            />
            <Button
              text={"Filtrar"}
              iconLeft="Filter"
              onClick={() => setShowFilter((prev) => !prev)}
              className={`shadow-none text-gray-700 dark:text-gray-300 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-500 hover:text-white rounded-md transition fill-transparent ${
                showFilter
                  ? "bg-neutral-500 dark:bg-neutral-500 text-gray-200 dark:text-gray-200"
                  : "bg-neutral-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300"
              }`}
            />
          </span>
        </div>

        {showFilter && (
          <div className="flex gap-4 mb-6">
            <select
              className="rounded-md p-2 text-gray-200"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option
                value=""
                className="bg-neutral-500 text-gray-200 drak:text-white"
              >
                Todos status
              </option>
              <option
                value="alive"
                className="bg-neutral-500 text-gray-200 drak:text-white"
              >
                Vivo
              </option>
              <option
                value="dead"
                className="bg-neutral-500 text-gray-200 drak:text-white"
              >
                Morto
              </option>
              <option
                value="unknown"
                className="bg-neutral-500 text-gray-200 drak:text-white"
              >
                Desconhecido
              </option>
            </select>

            <select
              value={speciesFilter}
              onChange={(e) => setSpeciesFilter(e.target.value)}
            >
              <option
                value=""
                className="bg-neutral-500 text-gray-200 drak:text-white"
              >
                Todas as espécies
              </option>
              <option
                value="Human"
                className="bg-neutral-500 text-gray-200 drak:text-white"
              >
                Human
              </option>
              <option
                value="Alien"
                className="bg-neutral-500 text-gray-200 drak:text-white"
              >
                Alien
              </option>
              <option
                value="Humanoid"
                className="bg-neutral-500 text-gray-200 drak:text-white"
              >
                Humanoid
              </option>
              <option
                value="Animal"
                className="bg-neutral-500 text-gray-200 drak:text-white"
              >
                Animal
              </option>
              <option
                value="Robot"
                className="bg-neutral-500 text-gray-200 drak:text-white"
              >
                Robot
              </option>
              <option
                value="Mythological Creature"
                className="bg-neutral-500 text-gray-200 drak:text-white"
              >
                Mythological Creature
              </option>
            </select>
          </div>
        )}

        {!showFilter && (statusFilter || speciesFilter) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {statusFilter && (
              <Button
                className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 
                   rounded-full text-sm flex items-center gap-1 cursor-pointer"
                onClick={() => setStatusFilter("")}
                iconRight="CloseCircle"
                text={`Status: ${
                  statusFilter === "alive"
                    ? "vivo"
                    : statusFilter === "dead"
                    ? "morto"
                    : "desconhecido"
                }`}
              />
            )}
            {speciesFilter && (
              <Button
                className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 
                   rounded-full text-sm flex items-center gap-1 cursor-pointer"
                onClick={() => setSpeciesFilter("")}
                iconRight="CloseCircle"
                text={`Espécie: ${speciesFilter}`}
              />
            )}
          </div>
        )}

        {showLoading && (
          <div className="flex flex-col items-center justify-center h-96">
            <Image
              src={randomImage}
              alt="logo rick and morty"
              height={64}
              width={218}
            />
            <Typography variant="p" text="Loading..." />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center mb-11">
          {!showLoading && <CardList characters={characters} />}
        </div>

        {!showLoading && (
          <div className="flex justify-center gap-4">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage: number) => setPage(newPage)}
            />
          </div>
        )}
      </div>
    </main>
  );
}
