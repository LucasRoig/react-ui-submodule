import { cn } from "../@lib/shadcn-utils";

type TitleProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}> &
  React.ComponentProps<"h1">;

function H1({ children, className, ...props }: TitleProps) {
  return (
    <h1 {...props} className={cn("text-3xl font-bold tracking-tight", className)}>
      {children}
    </h1>
  );
}

function H2({ children, className, ...props }: TitleProps) {
  return (
    <h2 {...props} className={cn("text-xl font-bold tracking-tight", className)}>
      {children}
    </h2>
  );
}

export const Title = {
  H1,
  H2,
};
