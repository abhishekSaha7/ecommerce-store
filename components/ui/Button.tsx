import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium uppercase tracking-wider text-xs transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 select-none";

    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-border bg-transparent text-foreground hover:bg-secondary hover:text-foreground",
      ghost: "text-foreground hover:bg-secondary hover:text-foreground",
      link: "text-foreground underline-offset-4 hover:underline lowercase tracking-normal text-sm p-0 h-auto",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    };

    const sizes = {
      default: "h-11 px-6 py-2.5",
      sm: "h-9 px-4 text-[11px]",
      lg: "h-13 px-8 text-xs py-3.5",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
