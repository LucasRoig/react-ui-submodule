import { Header } from "./_components/header";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="w-full sticky top-0 z-10 bg-background h-[var(--header-height)] ">
        <Header />
      </header>
      <main className="grow">{children}</main>
    </div>
  );
}
