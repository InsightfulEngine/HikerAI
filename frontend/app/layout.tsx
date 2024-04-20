import "./globals.css";

import { Footer, NavBar } from "@components";

export const metadata = {
  title: "HikerAI",
  description: "Discover NYC's best hiking trails with HikerAI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
