"use client";

import { Menu, X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Logo from "@/components/molecules/Logo";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Field } from "@/components/ui/field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMe } from "@/queries/useMe";

const Navbar = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data: user } = useMe();

  /* ================= SEARCH HANDLER ================= */
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
      handleCloseMobile();
    }
  };

  /* ================= MOBILE HANDLERS ================= */
  const openMobileSearch = () => {
    setOpen(true);
    setMobileSearchOpen(true);
  };

  const openMobileMenu = () => {
    setOpen(true);
    setMobileSearchOpen(false);
  };

  const handleCloseMobile = () => {
    setOpen(false);
    setMobileSearchOpen(false);
  };

  /* ================= LOCK BODY SCROLL ================= */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <nav className="flex items-center gap-6 w-full">
      {/* Logo */}
      <div className="flex-1"></div>

      {/* ================= DESKTOP SEARCH ================= */}
      <div className="hidden lg:block w-md">
        <Field>
          <InputGroup>
            <InputGroupInput
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <InputGroupAddon align="inline-start">
              <Search className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </div>

      {/* ================= AUTH / USER ================= */}
      <div className="flex-1 flex justify-end items-center gap-3">
        {!user ? (
          <>
            {/* Desktop auth */}
            <div className="hidden lg:flex gap-2">
              <Button variant="link">Login</Button>
              <Button onClick={() => router.push("/register")}>Register</Button>
            </div>

            {/* Mobile icons */}
            <div className="flex lg:hidden gap-3">
              <button aria-label="Search" onClick={openMobileSearch}>
                <Search className="h-6 w-6" />
              </button>
              <button aria-label="Menu" onClick={openMobileMenu}>
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Mobile search */}
            <button
              className="lg:hidden"
              aria-label="Search"
              onClick={openMobileSearch}
            >
              <Search className="h-6 w-6" />
            </button>

            {/* User */}
            <Avatar>
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <Label className="hidden lg:block text-sm font-medium">
              {user.name}
            </Label>
          </>
        )}
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Logo />
            <button onClick={handleCloseMobile} aria-label="Close">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Search */}
          {mobileSearchOpen && (
            <Field className="w-full p-4">
              <InputGroup>
                <InputGroupInput
                  autoFocus
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                />
                <InputGroupAddon align="inline-start">
                  <Search className="text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          )}

          {/* Mobile Menu */}
          {!mobileSearchOpen && (
            <div className="flex flex-col gap-4 items-center mt-6">
              <Button variant="link">Login</Button>
              <Button onClick={() => router.push("/register")}>Register</Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
