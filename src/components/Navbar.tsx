"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isLoggedIn, logout } from "../lib/auth";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  // Sync auth state
  const syncAuth = () => {
    setLoggedIn(isLoggedIn());
  };

  useEffect(() => {
    syncAuth();

    // Listen for login/logout changes
    window.addEventListener("storage", syncAuth);
    return () => {
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const handleLogout = () => {
    logout();
    syncAuth();
    router.push("/login");
  };

  const linkClass = (path: string) =>
    `text-sm transition ${
      pathname === path
        ? "text-white"
        : "text-zinc-400 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white">
          ELocal<span className="text-purple-400">-Shop</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>

          {loggedIn && (
  <Link href="/cart" className={linkClass("/cart")}>
    Cart
  </Link>
)}

          {/* Products ONLY when logged in */}
          {loggedIn && (
            <Link href="/products" className={linkClass("/products")}>
              Products
            </Link>
          )}

          {loggedIn && (
  <Link href="/orders" className={linkClass("/orders")}>
    Orders
  </Link>
)}

          {!loggedIn ? (
            <>
              <Link href="/login" className={linkClass("/login")}>
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-200 transition"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
