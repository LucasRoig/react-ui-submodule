import { Button } from "@lro-ui/button";
import { useFormContext } from "../form-hooks";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => {
        return (
          <Button type="submit" form={form.formId} disabled={isSubmitting}>
            {children}
          </Button>
        );
      }}
    </form.Subscribe>
  );
}
