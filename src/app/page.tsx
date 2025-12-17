"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { isLoggedIn } from "../lib/auth";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { motion } from "framer-motion";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [lastOrder, setLastOrder] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(true);

  // Cart count from Redux
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  // Auth + user data
  useEffect(() => {
    setLoggedIn(isLoggedIn());

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.name) setUserName(user.name);

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    if (orders.length > 0) {
      setLastOrder(orders[orders.length - 1]);
    }
  }, []);

  // Dark / Light mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-6 overflow-hidden">

      {/* Dark / Light Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 z-10 rounded-lg border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/10"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-5xl w-full bg-zinc-900/80 backdrop-blur border border-white/10 rounded-3xl p-12 shadow-2xl text-center">

        {/* LOGGED OUT */}
        {!loggedIn && (
          <>
            <span className="inline-block mb-4 rounded-full border border-white/10 px-4 py-1 text-xs text-zinc-400">
              Production-ready E-Commerce
            </span>

            <h1 className="text-5xl font-bold tracking-tight">
              Build. Scale. Sell.
            </h1>

            <p className="mt-4 text-zinc-400 text-lg max-w-xl mx-auto">
              Secure authentication, cart, checkout, Stripe payments, and order tracking.
            </p>

            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/login"
                className="px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-zinc-200 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-8 py-4 border border-zinc-700 rounded-xl hover:bg-zinc-800 transition"
              >
                Register
              </Link>
            </div>
          </>
        )}

        {/* LOGGED IN DASHBOARD */}
        {loggedIn && (
          <>
            <span className="inline-block mb-4 rounded-full border border-white/10 px-4 py-1 text-xs text-green-400">
              Logged in
            </span>

            <h1 className="text-5xl font-bold tracking-tight">
              Welcome back{userName && `, ${userName}`} 👋
            </h1>

            <p className="mt-4 text-zinc-400 text-lg">
              Manage your shopping experience
            </p>

            {/* Action Cards */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  href="/products"
                  className="group block rounded-2xl border border-white/10 bg-white/5 p-6 text-left hover:bg-white/10 transition"
                >
                  <h3 className="text-xl font-semibold group-hover:text-purple-400">
                    Browse Products
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    Search, filter, and discover items
                  </p>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Link
                  href="/cart"
                  className="group block rounded-2xl border border-white/10 bg-white/5 p-6 text-left hover:bg-white/10 transition"
                >
                  <h3 className="text-xl font-semibold group-hover:text-blue-400">
                    View Cart
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    {cartCount > 0
                      ? `${cartCount} item${cartCount > 1 ? "s" : ""} in cart`
                      : "Your cart is empty"}
                  </p>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Link
                  href="/orders"
                  className="group block rounded-2xl border border-white/10 bg-white/5 p-6 text-left hover:bg-white/10 transition"
                >
                  <h3 className="text-xl font-semibold group-hover:text-green-400">
                    Order History
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    View past purchases
                  </p>
                </Link>
              </motion.div>

            </div>

            {/* Last Order Preview */}
            {lastOrder && (
              <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
                <p className="text-sm text-zinc-400 mb-2">Last Order</p>
                <div className="flex justify-between text-sm">
                  <span>{lastOrder.items.length} items</span>
                  <span>₹{lastOrder.total.toLocaleString()}</span>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
