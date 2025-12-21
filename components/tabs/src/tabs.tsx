"use client";

import { cn } from "@lro-ui/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import type * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-2", className)} {...props} />;
}

const TabListVariant = tv({
  base: "inline-flex w-fit items-center rounded-lg",
  variants: {
    variant: {
      default: "bg-muted text-muted-foreground p-[3px]",
      pills: "bg-transparent gap-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function TabsList({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof TabListVariant>) {
  return <TabsPrimitive.List data-slot="tabs-list" className={cn(TabListVariant({ variant }), className)} {...props} />;
}

const TabsTriggerVariant = tv({
  base: `focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring
         inline-flex h-[calc(100%-1px)] items-center justify-center
         text-sm font-medium whitespace-nowrap transition-[color,box-shadow]
         focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50
         [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
         cursor-pointer h-9`,
  variants: {
    variant: {
      default: `data-[state=active]:bg-background dark:data-[state=active]:text-foreground
                dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30
                text-foreground dark:text-muted-foreground gap-1.5 rounded-md border border-transparent
                px-2 py-1 data-[state=active]:shadow-sm`,
      pills:
        "border bg-white data-[state=inactive]:hover:bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function TabsTrigger({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & VariantProps<typeof TabsTriggerVariant>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(TabsTriggerVariant({ variant }), className)}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
