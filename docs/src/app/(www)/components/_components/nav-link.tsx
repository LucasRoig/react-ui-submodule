"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../../../@lib/shadcn-utils";

export function NavLink({
  href,
  children,
}: Readonly<{
  href: string;
  children: React.ReactNode;
}>) {
  const currentPath = usePathname();
  const isActive = currentPath?.startsWith(href);

  return (
    <Link
      className={cn(
        `
        pl-5 -mx-px
        text-sm text-muted-foreground-dark
        border-l border-transparent
        hover:text-foreground hover:border-gray-500
        transition-colors
      `,
        isActive && "text-foreground font-semibold border-black",
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
