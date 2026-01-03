import "./globals.css";
import { Inter } from "next/font/google";

// Optional: Use a nice font if you want, otherwise remove the font class
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}