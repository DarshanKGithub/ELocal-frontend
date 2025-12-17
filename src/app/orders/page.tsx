"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";

type Order = {
  id: string;
  items: any[];
  total: number;
  date: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("orders");
    if (data) {
      setOrders(JSON.parse(data));
    }
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black px-6 py-12 text-white">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold mb-8">Order History</h1>

          {orders.length === 0 ? (
            <p className="text-zinc-400">No orders found.</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex justify-between mb-4">
                    <span className="text-sm text-zinc-400">
                      Order ID: {order.id}
                    </span>
                    <span className="text-sm text-zinc-400">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item) => (
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

                  <div className="mt-4 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}