// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black py-8">
      <div className="flex flex-col items-center justify-between space-y-4 px-4 md:flex-row md:space-y-0">
        <div className="flex items-center space-x-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6817-XDc9C1B4SG07L6moN009i06vzrOFds.png"
            alt="AED Locate Logo"
            width={100}
            height={35}
            className="h-6 w-auto"
          />
        </div>
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} AED Locate. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <Link className="text-sm text-gray-400 hover:text-[#E31837]" href="#">
            Privacy
          </Link>
          <Link className="text-sm text-gray-400 hover:text-[#E31837]" href="#">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
