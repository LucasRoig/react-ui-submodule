"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@lro-ui/utils"

type CheckboxProps = Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, "onCheckedChange"> & {
  onCheckedChange?: (value: boolean) => void
}

function Checkbox({ className, ref, onCheckedChange, ...props }: CheckboxProps) {

  return (
    <CheckboxPrimitive.Root
      onCheckedChange={(v) => {
        const determinateValue = v === "indeterminate" ? false : v
      }}
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
