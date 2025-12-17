"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { isLoggedIn } from "../lib/auth";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { motion } from "framer-motion";
import { Moon, Sun, ShoppingCart, Package, IndianRupee } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [lastOrder, setLastOrder] = useState<any>(null);
  const [ordersCount, setOrdersCount] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  useEffect(() => {
    setLoggedIn(isLoggedIn());

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.name) setUserName(user.name);

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrdersCount(orders.length);

    if (orders.length > 0) {
      setLastOrder(orders[orders.length - 1]);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-6 overflow-hidden">

      {/* Ambient Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-48 -left-48 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-0 -right-48 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 z-10 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm backdrop-blur hover:bg-white/10"
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        {darkMode ? "Light" : "Dark"}
      </button>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-6xl w-full rounded-3xl border border-white/10 bg-zinc-900/80 backdrop-blur-xl p-12 shadow-[0_0_60px_rgba(0,0,0,0.6)]"
      >

        {/* LOGGED OUT */}
        {!loggedIn && (
          <motion.div variants={item} className="text-center">
            <span className="inline-block mb-4 rounded-full border border-white/10 px-4 py-1 text-xs text-zinc-400">
              Modern E-Commerce Platform
            </span>

            <h1 className="text-5xl font-bold tracking-tight">
              Build Faster. Sell Smarter.
            </h1>

            <p className="mt-4 text-zinc-400 text-lg max-w-xl mx-auto">
              Auth, cart, payments, order tracking and analytics — ready for scale.
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
          </motion.div>
        )}

        {/* LOGGED IN */}
        {loggedIn && (
          <>
            <motion.div variants={item} className="text-center">
              <span className="inline-block mb-4 rounded-full border border-white/10 px-4 py-1 text-xs text-green-400">
                Dashboard
              </span>

              <h1 className="text-5xl font-bold">
                Welcome back{userName && `, ${userName}`}
              </h1>

              <p className="mt-3 text-zinc-400 text-lg">
                Your shopping overview
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={container}
              className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <StatCard
                icon={<ShoppingCart />}
                label="Cart Items"
                value={cartCount}
              />
              <StatCard
                icon={<Package />}
                label="Total Orders"
                value={ordersCount}
              />
              <StatCard
                icon={<IndianRupee />}
                label="Last Order"
                value={lastOrder ? `₹${lastOrder.total}` : "—"}
              />
            </motion.div>

            {/* Actions */}
            <motion.div
              variants={container}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <ActionCard href="/products" title="Browse Products" desc="Explore catalog" color="purple" />
              <ActionCard href="/cart" title="View Cart" desc="Manage items" color="blue" />
              <ActionCard href="/orders" title="Orders" desc="Track purchases" color="green" />
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}

/* ---------- Components ---------- */

function StatCard({ icon, label, value }: any) {
  return (
    <motion.div
      variants={item}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-white/10">{icon}</div>
        <div>
          <p className="text-sm text-zinc-400">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ActionCard({ href, title, desc, color }: any) {
  return (
    <motion.div variants={item}>
      <Link
        href={href}
        className="group block rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:-translate-y-1 transition-all"
      >
        <h3 className={`text-xl font-semibold group-hover:text-${color}-400`}>
          {title}
        </h3>
        <p className="mt-2 text-sm text-zinc-400">{desc}</p>
      </Link>
    </motion.div>
  );
}
