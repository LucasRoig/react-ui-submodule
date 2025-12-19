"use client";

import { Field, FieldDescription, FieldError, FieldLabel } from "@lro-ui/field/src/field";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@lro-ui/input";
import { cn } from "@lro-ui/utils";
import { useFieldContext } from "../form-hooks";

export type TextAreaFieldProps = {
  label: string;
  description?: string;
  placeholder?: string;
  className?: string;
  maxLength?: number;
};

export function TextAreaField(props: TextAreaFieldProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
      <InputGroup>
        <InputGroupTextarea
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          placeholder={props.placeholder}
          rows={6}
          className={cn("min-h-24 resize-none", props.className)}
          aria-invalid={isInvalid}
        />
        {props.maxLength && (
          <InputGroupAddon align="block-end">
            <InputGroupText
              className={cn("tabular-nums", field.state.value.length > props.maxLength ? "text-destructive" : "")}
            >
              {field.state.value.length}/{props.maxLength} characters
            </InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>
      {props.description && <FieldDescription>{props.description}</FieldDescription>}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
