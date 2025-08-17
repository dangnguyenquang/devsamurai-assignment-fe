/// <reference types="vite-plugin-svgr/client" />

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Mail, User, Loader2, Info } from "lucide-react";
import Logo from "@/assets/icons/logo.svg?react";
import Google from "@/assets/icons/google.svg?react";
import Microsoft from "@/assets/icons/microsoft.svg?react";
import FormInput from "@/components/forms/FormInput";
import PasswordInput from "@/components/forms/PasswordInput";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { authService } from "@/services/authService";
import useApi from "@/hooks/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "@/stores";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/features/auth/authSlice";
import httpClient from "@/lib/http/httpClient";

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, execute: executeRegister } = useApi(() =>
    authService.register({
      name: watch("name"),
      email: watch("email"),
      password: watch("password"),
    })
  );

  const onSubmit = async (data: RegisterFormData) => {
    clearErrors();

    const response = await executeRegister();

    if (!response.success) {
      if (response.errors && Object.keys(response.errors).length > 0) {
        Object.entries(response.errors).forEach(([field, messages]) => {
          if (field in data) {
            setError(field as keyof RegisterFormData, {
              type: "server",
              message: messages[0],
            });
          }
        });
      } else if (response.message) {
        console.log("Server error:", response.message);
        setError("root", {
          type: "server",
          message: response.message,
        });
      }
      return;
    }

    dispatch(
      loginSuccess({
        user: response.data?.user ?? null,
        token: response.data?.access_token ?? "",
      })
    );

    httpClient.setAuthToken(response.data?.access_token ?? "");

    navigate("/");
  };

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
      <Card className="gap-0 border-transparent dark:border-border w-[380px] px-4 py-2 bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <CardHeader className="flex flex-col space-y-1.5 p-6 gap-0">
          <CardTitle className="font-semibold tracking-tight text-base lg:text-lg">
            Create your account
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Please fill in the details to get started.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormInput
              id="name"
              label="Name"
              placeholder="John doe"
              icon={<User className="h-4 w-4" />}
              {...register("name")}
              error={errors.name?.message}
            />

            <FormInput
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="h-4 w-4" />}
              {...register("email")}
              error={errors.email?.message}
            />

            <PasswordInput
              id="password"
              label="Password"
              placeholder="********"
              {...register("password")}
              error={errors.password?.message}
            />

            {errors.root && (
              <Alert variant="destructive" className="bg-red-100">
                <Info className="text-accent-foreground" />
                <AlertTitle className="text-accent-foreground font-medium">
                  {errors.root.message}
                </AlertTitle>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>

            <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
              Or continue with
            </p>

            <div className="flex flex-row gap-4">
              <button
                type="button"
                // onClick={() => handleSocialLogin("google")}
                className="justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 flex w-full flex-row items-center gap-2"
              >
                <Google />
                Google
              </button>
              <button
                type="button"
                // onClick={() => handleSocialLogin("microsoft")}
                className="justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 flex w-full flex-row items-center gap-2"
              >
                <Microsoft />
                Microsoft
              </button>
            </div>
          </form>
        </CardContent>

        <p className="items-center p-6 pt-0 flex justify-center gap-1 text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/login" className="text-primary underline">
            Sign in
          </a>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;
