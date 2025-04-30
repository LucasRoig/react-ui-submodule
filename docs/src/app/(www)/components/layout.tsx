import { SideNav } from "./_components/side-nav";

export default function ComponentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[240px_minmax(0,1fr)]">
      <div className="relative">
        <div className="absolute inset-0">
          <aside className="sticky top-[var(--header-height)] overflow-y-auto max-h-[calc(100dvh-var(--header-height))] bottom-0 left-0 p-6">
            <SideNav />
          </aside>
        </div>
      </div>
      <main className="pt-10 px-10">{children}</main>
    </div>
  );
}
