"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/atoms/PasswordInput";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useAuthLogin } from "@/hooks/useAuthLogin";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending, isSuccess, error } = useAuthLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      email: form.email,
      password: form.password,
    });
  };

  /* ================= SUCCESS / ERROR EFFECT ================= */
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful");
      router.push("/");
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Login failed");
    }
  }, [error]);

  return (
    <div className="mx-auto min-h-screen content-center">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="m@example.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary-300"
              disabled={isPending}
            >
              {isPending ? "Please wait..." : "Login"}
            </Button>
          </form>

          <CardDescription className="mt-4 text-center">
            Don’t have an account?{" "}
            <Button
              variant="link"
              type="button"
              onClick={() => router.push("/register")}
            >
              Register
            </Button>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
