// components/Header.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Adjust import based on your button component

const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4">
        <Link className="flex items-center space-x-2 font-bold" href="/">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6817-XDc9C1B4SG07L6moN009i06vzrOFds.png"
            alt="AED Locate Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </Link>
        <div className="flex items-center space-x-4">
          <Link className="hidden text-sm hover:text-[#E31837] sm:block" href="/login">
            Sign In
          </Link>
          <Link href="/register-aed" passHref>
            <Button className="bg-[#E31837] text-white hover:bg-[#E31837]/90">
              Register AED
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
