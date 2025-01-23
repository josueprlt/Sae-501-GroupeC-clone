import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  img?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, img, type, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
      {img && <div className="absolute left-3">{img}</div>}
      <input
        required
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          img ? "pl-10" : "",
          className
        )}
        
        ref={ref}
        {...props}
      />
      </div>
    );
  }
);
Input.displayName = "Input"

export { Input }