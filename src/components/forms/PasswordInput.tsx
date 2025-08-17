import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState, forwardRef } from "react";

const PasswordInput = forwardRef<
  HTMLInputElement,
  {
    id: string;
    label: string;
    error?: string;
    isLoginForm?: boolean;
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
>(({ id, label, error, isLoginForm = false, className = "", ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="password">Password</Label>
        {isLoginForm && <a href="#" className="line-block text-sm underline">
          Forgot password?
        </a>}
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          ref={ref}
          id={id}
          type={showPassword ? "text" : "password"}
          className={`pl-8 pr-10 ${
            error ? "border-red-500 focus-visible:ring-red-500" : ""
          } ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-muted-foreground hover:text-accent-foreground"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
});

export default PasswordInput;
