import LogoSvg from "@/assets/images/Logo.svg";
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src={LogoSvg} alt="Your Logo" width={159} height={36} priority />
    </Link>
  );
}
