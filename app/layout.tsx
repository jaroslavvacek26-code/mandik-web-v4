import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MANDÍK a.s. – Vzduchotechnika, protipožární prvky, průmyslové vytápění",
  description: "MANDÍK a.s. – český výrobce vzduchotechnických komponentů, protipožárních prvků a průmyslového vytápění. Dodávky do více než 30 zemí světa.",
};

// Root layout – html a body jsou zde, lang nastavuje [locale]/layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
