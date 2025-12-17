import Link from "next/link";
import { FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
    
  return (
    <footer className="border-t border-white/10 bg-black text-zinc-400">
      <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 gap-10 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-semibold text-white">E-Local</h3>
          <p className="mt-3 text-sm">
            A modern full-stack e-commerce platform built for real-world use.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products?category=Electronics">Electronics</Link></li>
            <li><Link href="/products?category=Mobiles">Mobiles</Link></li>
            <li><Link href="/products?category=Accessories">Accessories</Link></li>
            <li><Link href="/products?category=Wearables">Wearables</Link></li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/cart">Cart</Link></li>
            <li><Link href="/orders">Orders</Link></li>
            <li><Link href="/login">Login</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Connect</h4>
          <div className="flex gap-4 text-xl">
            <a
              href="https://linkedin.com/in/your-linkedin"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com/your-instagram"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com/your-twitter"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-4 text-center text-sm">
        © {new Date().getFullYear()} E-Local. All rights reserved.
      </div>
    </footer>
  );
}
