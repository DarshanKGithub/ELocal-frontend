import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsClient />
    </Suspense>
  );
}

function ProductsLoading() {
  return (
    <div className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="aspect-square bg-white/10 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
