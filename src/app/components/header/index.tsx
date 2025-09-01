"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";

import logo from "@/../public/images/logo-rick-and-morty.svg";
import { Button } from "@/components/buttons";
import { useRouter, usePathname } from "next/navigation";

function Header() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const buttonBaseClasses =
    "flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-500 hover:text-white rounded-md transition fill-transparent";

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="flex justify-between items-center flex-col sm:flex-row gap-4 h-fit sm:h-20  dark:bg-neutral-900 bg-white shadow-md p-6">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo Rick and Morty"
            className="h-fit"
            height={64}
            width={218}
            priority
          />
        </Link>
      </div>

      <div className="flex items-center gap-5">
        <Button
          className={buttonBaseClasses}
          onClick={toggleTheme}
          iconLeft={theme === "dark" ? "Sun1" : "Moon"}
          text={theme === "dark" ? "Claro" : "Escuro"}
        />

        <Button
          className={buttonBaseClasses}
          iconLeft={pathname === "/favorites" ? "Home2" : "Heart"}
          text={pathname === "/favorites" ? "Pagina inicial" : "Meus Favoritos"}
          onClick={() => {
            if (pathname === "/favorites") {
              router.push("/");
            } else {
              router.push("/favorites");
            }
          }}
        />
      </div>
    </header>
  );
}

export { Header };
