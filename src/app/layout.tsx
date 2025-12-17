import "./globals.css";
import Navbar from "../components/Navbar";
import Providers from "./providers";

export const metadata = {
  title: "E-Commerce App",
  description: "Modern E-Commerce Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Providers>
        <Navbar />
        {children}
        </Providers>
      </body>
    </html>
  );
}
