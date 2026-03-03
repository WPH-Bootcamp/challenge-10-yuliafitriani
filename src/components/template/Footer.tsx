export default function Footer() {
  return (
    <footer className="w-full h-20 content-center bg-white border-t border-neutral-300">
      <div className="text-sm text-neutral-600 text-center">
        © {new Date().getFullYear()} Web Programming Hack Blog All rights
        reserved.
      </div>
    </footer>
  );
}
