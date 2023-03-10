import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <header className="w-full bg-[#4B4F76] py-4 text-center font-bold text-lg md:text-2xl text-white flex gap-2 justify-around items-center ">
        <Link href={"/"}>IMDb Movies</Link>
        <Link href={"/favorites"}>Favorite movies</Link>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
