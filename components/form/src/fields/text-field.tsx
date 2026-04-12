import { Field, FieldDescription, FieldError, FieldLabel } from "@lro-ui/field";
import { Input } from "@lro-ui/input";
import { useFieldContext } from "../form-hooks";

type TextFieldProps = {
  label: string;
  description?: string;
  type?: React.ComponentProps<typeof Input>["type"];
  autoComplete?: React.ComponentProps<typeof Input>["autoComplete"];
};

export function TextField(props: TextFieldProps) {
  const {
    autoComplete = "off",
    type = "text",
  } = props;

  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
      <div> {/* Without this wrapper, the lastpass extension adds an element inside the parent flex element which breaks the layout.
        /* Thanks to this wrapper, the lastpass extension adds an element inside the wrapper and not the parent flex element, which keeps the layout intact.
        */}
        <Input
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          autoComplete={autoComplete}
          type={type}
        />
      </div>
      {props.description && <FieldDescription>{props.description}</FieldDescription>}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
