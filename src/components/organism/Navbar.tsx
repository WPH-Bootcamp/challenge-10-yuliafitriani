"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useMe } from "@/queries/useMe";

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [search, setOpenSearch] = useState(false);

  const { data: user } = useMe();
  return (
    <div className="flex flex-row gap-6 items-center w-full">
      <div className="w-full flex lg:justify-center justify-end">
        <Field className="hidden lg:block w-md">
          <InputGroup>
            <InputGroupInput id="inline-start-input" placeholder="Search..." />
            <InputGroupAddon align="inline-start">
              <Search className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </div>
      {/* Auth */}
      <div className="hidden lg:block">
        {!user && (
          <div className="flex flex-row gap-2 justify-center items-center">
            <Button variant="link">Login</Button>
            <Button className="w-53.5" onClick={() => router.push("/register")}>
              Register
            </Button>
          </div>
        )}
      </div>
      {/* Hamburger */}
      {!user ? (
        <div className="w-full flex justify-end">
          <button
            className="lg:hidden"
            aria-label="Search"
            onClick={() => setOpenSearch(true)}
          >
            <Search className="h-6 w-6" />
          </button>
          <button
            className="lg:hidden"
            aria-label="Menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      ) : (
        <div className="w-full flex justify-end items-center gap-2">
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Label className="hidden lg:block text-sm text-neutral-900 font-medium">
            {user.name}
          </Label>
        </div>
      )}
      {open && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between h-16 px-4  border-b border-neutral-300">
            <Logo />
            <button onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col gap-4 justify-center items-center mt-4">
            <Button variant="link" className="w-53.5">
              Login
            </Button>
            <Button className="w-53.5" onClick={() => router.push("/register")}>
              Register
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
