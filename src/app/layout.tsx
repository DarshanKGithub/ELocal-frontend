import "./globals.css";
import Navbar from "../components/Navbar";
import Providers from "./providers";
import Footer from "../components/Footer";

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
        <Footer />
        </Providers>
      </body>
    </html>
  );
}
