import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Search } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";

export interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  startImg?: ReactNode;
  endImg?: ReactNode;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, type, startImg, endImg = <Search className="w-4 md:w-6" />, ...props }, ref) => { 
    return (
      <div className="relative flex items-center w-full md:max-w-lg">
        {startImg && <div className="absolute left-3">{startImg}</div>}
        <Input
          type={type}
          className={cn(
            "flex h-10 w-full md:max-w-lg rounded-md border border-input bg-secondary px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            startImg ? "pl-10" : "",
            endImg ? "pr-10" : "", 
            className
          )}
          ref={ref}
          {...props}
        />
        {endImg && <div className="absolute right-3">{endImg}</div>}
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export { SearchBar };