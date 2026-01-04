"use client";
import { Button } from "@lro-ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@lro-ui/command";
import { Field, FieldDescription, FieldError, FieldLabel } from "@lro-ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@lro-ui/popover";
import { cn } from "@lro-ui/utils";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useId, useState } from "react";
import { useFieldContext } from "../form-hooks";

export type ShadcnComboboxFieldProps<T extends number | string | undefined> = {
  options: { value: NonNullable<T>; label: string | React.ReactNode; keywords?: string[] }[];
  label: string;
  description?: string;
  placeholder: string;
  noMatchMessage: string;
  triggerClassName?: string;
};

export function ShadcnComboboxField<T extends number | string | undefined>(props: ShadcnComboboxFieldProps<T>) {
  const id = useId();
  const [open, setOpen] = useState(false);

  const field = useFieldContext<T | undefined>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{props.label}</FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            aria-invalid={isInvalid}
            variant="secondary"
            role="combobox"
            aria-expanded={open}
            className={cn("justify-between", props.triggerClassName)}
          >
            {field.state.value
              ? props.options.find((option) => option.value === field.state.value)?.label
              : props.placeholder}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder={props.placeholder} />
            <CommandList>
              <CommandEmpty>{props.noMatchMessage}</CommandEmpty>
              <CommandGroup>
                {props.options.map((option) => (
                  <CommandItem
                    key={option.value}
                    keywords={option.keywords}
                    value={String(option.value)}
                    onSelect={(newValue) => {
                      if (typeof option.value === "string") {
                        const updateValue = (newValue === field.state.value ? undefined : newValue) as T | undefined;
                        field.handleChange(updateValue);
                      } else {
                        const updateValue = (newValue === String(field.state.value) ? undefined : Number(newValue)) as
                          | T
                          | undefined;
                        field.handleChange(updateValue);
                      }
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn("mr-2 h-4 w-4", field.state.value === option.value ? "opacity-100" : "opacity-0")}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {props.description && <FieldDescription>{props.description}</FieldDescription>}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
