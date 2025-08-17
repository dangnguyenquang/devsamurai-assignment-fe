import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { forwardRef } from "react";

const FormInput = forwardRef<
  HTMLInputElement,
  {
    id: string;
    label: string;
    icon?: React.ReactNode;
    error?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ id, label, icon, error, className = '', ...props }, ref) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={error ? 'text-red-500' : ''}>
        {label}
      </Label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground">
            {icon}
          </div>
        )}
        <Input
          ref={ref}
          id={id}
          className={`${icon ? 'pl-8' : ''} ${
            error ? 'border-red-500 focus-visible:ring-red-500' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
});

export default FormInput