"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/atoms/PasswordInput";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/useRegister";
import { useState } from "react";
import { toast } from "sonner";

const Register = () => {
  const route = useRouter();
  const { mutate, isPending } = useRegister();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.password !== form.confirmPassword) {
      toast("Password and confirmation do not match");
      return;
    }

    mutate(
      {
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
      },
      {
        onSuccess: () => {
          toast.success("Your account has been created. Please login.");

          setTimeout(() => {
            route.push("/login");
          }, 3000);
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <div className="mx-auto min-h-screen content-center">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <PasswordInput
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <PasswordInput
                  id="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isPending}
                  className="w-full bg-primary-300"
                >
                  {isPending ? "Registering..." : "Register"}
                </Button>
              </div>
            </div>
          </div>
          <CardDescription>
            Already have an account?{" "}
            <Button variant="link" onClick={() => route.push("/login")}>
              Log in
            </Button>
            <CardAction></CardAction>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
