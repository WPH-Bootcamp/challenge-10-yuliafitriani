"use client";

import { Menu, X, Search, LogOut, User, Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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
import { useDispatch } from "react-redux";
import { logout, loginSuccess } from "@/store/authSlice";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

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

  /* ================= LOGOUT ================= */
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());

    // 🧹 clear react-query cache
    queryClient.clear();

    setUserMenuOpen(false);
    router.push("/login");
  };

  useEffect(() => {
    if (user) {
      dispatch(loginSuccess(user));
    }
  }, [user, dispatch]);

  /* ================= CLICK OUTSIDE USER MENU ================= */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= LOCK BODY SCROLL ================= */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <nav className="flex items-center gap-6 w-full relative">
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
              <Button variant="link" onClick={() => router.push("/login")}>
                Login
              </Button>
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
          <div className="flex justify-end gap-4 " ref={menuRef}>
            <button
              aria-label="Search"
              className="block lg:hidden"
              onClick={openMobileSearch}
            >
              <Search className="h-6 w-6" />
            </button>
            {/* Avatar trigger */}

            <Button
              variant="link"
              type="button"
              onClick={() => router.push("/post")}
            >
              <Pencil className="h-6 w-6" /> Write Post
            </Button>

            <button
              className="flex items-center gap-2"
              onClick={() => setUserMenuOpen((prev) => !prev)}
            >
              <Avatar>
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Label className="hidden lg:block text-sm font-medium">
                {user.name}
              </Label>
            </button>

            {/* Dropdown menu */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border bg-white shadow-lg z-50">
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-neutral-100"
                  onClick={() => {
                    setUserMenuOpen(false);
                    router.push("/profile");
                  }}
                >
                  <User className="h-4 w-4" />
                  Profile
                </button>

                <button
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
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
              <Button variant="link" onClick={() => router.push("/login")}>
                Login
              </Button>
              <Button onClick={() => router.push("/register")}>Register</Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
