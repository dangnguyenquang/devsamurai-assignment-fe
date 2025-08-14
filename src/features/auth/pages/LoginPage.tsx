/// <reference types="vite-plugin-svgr/client" />

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import Logo from "@/assets/icons/logo.svg?react";
import Google from "@/assets/icons/google.svg?react";
import Microsoft from "@/assets/icons/microsoft.svg?react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mx-auto w-full min-w-[320px] space-y-6 py-12 max-w-sm">
      {/* Logo */}
      <div className="block w-fit mx-auto">
        <div className="flex items-center space-x-2">
          <div className="flex size-9 items-center justify-center p-1">
            <div className="flex size-7 items-center justify-center rounded-md border text-primary-foreground text-primary bg-primary">
              <Logo />
            </div>
          </div>
          <span className="font-bold">Acme</span>
        </div>
      </div>

      {/* Card */}
      <Card className="gap-0 border-transparent dark:border-border w-[400px] px-4 py-2 bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <CardHeader className="flex flex-col space-y-1.5 p-6 gap-0">
          <CardTitle className="font-semibold tracking-tight text-base lg:text-lg">
            Sign in to your account
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Welcome back! Please sign in to continue.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 pt-0 flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-8"
                maxLength={225}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="line-block text-sm underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="pl-8 pr-8"
                maxLength={225}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2.5 text-muted-foreground cursor-pointer hover:text-accent-foreground hover:bg-accent"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button className="w-full">Sign in</Button>

          <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
            Or continue with
          </p>

          <div className="flex flex-row gap-4">
            <button
              className="justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 flex w-full flex-row items-center gap-2"
              type="button"
            >
              <Google />
              Google
            </button>
            <button
              className="justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 flex w-full flex-row items-center gap-2"
              type="button"
            >
              <Microsoft />
              Microsoft
            </button>
          </div>
        </CardContent>

        <p className="items-center p-6 pt-0 flex justify-center gap-1 text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <a href="/register" className="text-primary underline">
            Sign up
          </a>
        </p>
      </Card>
    </div>
  );
}
