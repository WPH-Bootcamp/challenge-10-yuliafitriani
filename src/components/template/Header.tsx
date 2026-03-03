import Logo from "@/components/molecules/Logo";
import Navbar from "@/components/organism/Navbar";

export default function Header() {
  return (
    <section className="flex flex-row justify-between h-20 px-4  border-b border-neutral-300">
      <Logo />
      <Navbar />
    </section>
  );
}
