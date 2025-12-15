"use client";

import { cn } from "@lro-ui/utils";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import type * as React from "react";

type CheckboxProps = Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  "onCheckedChange" | "checked" | "defaultChecked"
> & {
  onCheckedChange: (value: boolean) => void;
  checked: boolean;
  defaultChecked?: boolean;
};

function Checkbox({ onCheckedChange, ...props }: CheckboxProps) {
  return (
    <UndeterminateCheckbox
      onCheckedChange={(v) => {
        const determinateValue = v === "indeterminate" ? false : v;
        onCheckedChange(determinateValue);
      }}
      {...props}
    />
  );
}

type UndeterminateCheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root>;

function UndeterminateCheckbox({ className, ref, ...props }: UndeterminateCheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox, UndeterminateCheckbox };
