export default function PreviewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main
      style={{
        padding: "1rem",
      }}
    >
      {children}
    </main>
  );
}
