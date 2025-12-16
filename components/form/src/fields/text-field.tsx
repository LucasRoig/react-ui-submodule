import { Field, FieldDescription, FieldError, FieldLabel } from "@lro-ui/field";
import { Input } from "@lro-ui/input";
import { useFieldContext } from "../form-hooks";

type TextFieldProps = {
  label: string;
  description?: string;
};

export function TextField(props: TextFieldProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        autoComplete="off"
      />
      {props.description && <FieldDescription>{props.description}</FieldDescription>}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
