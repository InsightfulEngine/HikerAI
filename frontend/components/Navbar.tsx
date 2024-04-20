import Link from "next/link";
import Image from "next/image";

const NavBar = () => (
  <header className="w-full  absolute z-10">
    <nav className="max-w-[1440px] mx-auto flex justify-between items-left sm:px-16 px-6 py-4 bg-transparent">
      <Link href="/" className="flex justify-center items-center">
        <Image
          src="/hikerai.png"
          alt="logo"
          width={150}
          height={8}
          className="object-contain"
        />
      </Link>
    </nav>
  </header>
);

export default NavBar;
