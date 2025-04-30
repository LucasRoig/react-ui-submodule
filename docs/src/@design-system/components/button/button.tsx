import { type VariantProps, tv } from "tailwind-variants";

const buttonVariants = tv({
  base: `inline-flex items-center justify-center gap-2
         border border-transparent
         py-1.5 px-3
         cursor-pointer
         whitespace-nowrap rounded-md
         text-sm/6 font-semibold
         ring-offset-background transition-colors
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
         disabled:pointer-events-none disabled:opacity-50
         [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`,
  variants: {
    variant: {
      primary: "bg-neutral-950 text-white hover:bg-neutral-800",
      secondary: "border-neutral-300 text-neutral-950 hover:bg-neutral-100",
      text: "hover:bg-neutral-100",
    },
    disabled: {
      true: "pointer-events-none",
    },
    size: {
      large: "",
      default: "",
      small: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
    disabled: false,
  },
});

type ButtonVariantsProps = VariantProps<typeof buttonVariants>;

type ButtonProps = React.ComponentProps<"button"> & ButtonVariantsProps;

export function Button({ className, variant, disabled, size, ...props }: ButtonProps) {
  return <button className={buttonVariants({ variant, className, size, disabled })} disabled={disabled} {...props} />;
}
