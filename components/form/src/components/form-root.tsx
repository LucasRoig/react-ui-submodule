import { useFormContext } from "../form-hooks";

export function FormRoot({ children, ref }: { children: React.ReactNode; ref: React.Ref<HTMLFormElement | null> }) {
  const form = useFormContext();

  return (
    <form
      id={form.formId}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(e);
      }}
      ref={ref}
    >
      {children}
    </form>
  );
}
