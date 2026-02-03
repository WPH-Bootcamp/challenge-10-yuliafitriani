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
import { toast } from "sonner";
import { useState } from "react";
import { useAuthLogin } from "@/hooks/useAuthLogin";
import { useRouter } from "next/navigation";

const Login = () => {
  const route = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const { mutate, isPending } = useAuthLogin();

  const handleSubmit = () => {
    mutate(
      {
        email: form.email,
        password: form.password,
      },
      {
        onSuccess: () => {
          toast.success("Login successsful");

          setTimeout(() => {
            route.push("/");
          }, 1000);
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
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  onChange={handleChange}
                  value={form.email}
                  placeholder="m@example.com"
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
                <Button
                  type="submit"
                  className="w-full bg-primary-300"
                  disabled={isPending}
                  onClick={handleSubmit}
                >
                  {isPending ? "Please wait..." : "Login"}
                </Button>
              </div>
            </div>
          </div>
          <CardDescription>
            Don`t have an account? <Button variant="link">Register</Button>
            <CardAction></CardAction>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
