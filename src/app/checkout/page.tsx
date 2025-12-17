"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useSelector((state: RootState) => state.cart);

  // 🔑 Hydration guard
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent SSR / client mismatch
  if (!mounted) return null;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <ProtectedRoute>
      {items.length === 0 ? (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          Your cart is empty
        </div>
      ) : (
        <div className="min-h-screen bg-black px-6 py-12 text-white">
          <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Left: Shipping + Info */}
            <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Checkout</h2>

              <form className="space-y-5">
                <input
                  placeholder="Full Name"
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3"
                />

                <input
                  placeholder="Email"
                  type="email"
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3"
                />

                <input
                  placeholder="Shipping Address"
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="City"
                    className="rounded-lg bg-black/40 border border-white/10 px-4 py-3"
                  />
                  <input
                    placeholder="Pincode"
                    className="rounded-lg bg-black/40 border border-white/10 px-4 py-3"
                  />
                </div>
              </form>
            </div>

            {/* Right: Order Summary */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <button
                onClick={() => router.push("/payment")}
                className="mt-6 w-full rounded-xl bg-white py-4 font-semibold text-black hover:bg-zinc-200 transition"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
