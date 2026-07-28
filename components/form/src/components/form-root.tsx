import { cn } from "@lro-ui/utils";
import { useFormContext } from "../form-hooks";

export function FormRoot({
  children,
  ref,
  className,
}: {
  children: React.ReactNode;
  ref: React.Ref<HTMLFormElement | null>;
  className?: string;
}) {
  const form = useFormContext();

  return (
    <form
      id={form.formId}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(e);
      }}
      ref={ref}
      className={cn("pb-1", className)}
    >
      {children}
    </form>
  );
}
