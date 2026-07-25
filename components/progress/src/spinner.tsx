import { cn } from "@lro-ui/utils";
import { Loader2Icon } from "lucide-react";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-8 animate-spin mx-auto my-2", className)}
      {...props}
    />
  );
}

export { Spinner };
