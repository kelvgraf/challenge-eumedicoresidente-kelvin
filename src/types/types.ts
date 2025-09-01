import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type Character = {
  id: string | number;
  name: string;
  image: string | StaticImport;
  status: string;
  species: string;
  origin?: { name: string };
};
