"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import productsData from "../../data/products";
import ProductCard from "../../components/ProductCard";
import { isLoggedIn } from "../../lib/auth";
import ProductSkeleton from "@/src/components/ProductSkeleton";

// 🔹 Debounce hook
function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("price")) || 200000
  );

  const debouncedSearch = useDebounce(search);
  const loggedIn = isLoggedIn();

  // ✅ Memoized categories
  const categories = useMemo(() => {
    const set = new Set(productsData.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  // ✅ Memoized filtering (MAIN PERFORMANCE FIX)
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [debouncedSearch, category, maxPrice]);

  // ✅ Memoized handlers
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(e.target.value);
    },
    []
  );

  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMaxPrice(Number(e.target.value));
    },
    []
  );

  // ✅ URL sync (no re-render loop)
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.set("q", search);
    if (category !== "All") params.set("category", category);
    if (maxPrice !== 200000) params.set("price", String(maxPrice));

    router.replace(`/products?${params.toString()}`, { scroll: false });
  }, [search, category, maxPrice, router]);

  useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 800); // realistic loading delay

  return () => clearTimeout(timer);
}, []);

  return (
    <div className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">Products</h1>

        {/* Filters */}
        {loggedIn && (
          <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              value={search}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none"
            />

            <select
              value={category}
              onChange={handleCategoryChange}
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400">
                Max Price: ₹{maxPrice.toLocaleString()}
              </label>
              <input
                type="range"
                min={0}
                max={200000}
                step={5000}
                value={maxPrice}
                onChange={handlePriceChange}
              />
            </div>
          </div>
        )}

    {loading ? (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <ProductSkeleton key={i} />
    ))}
  </div>
) : filteredProducts.length === 0 ? (
  <p className="text-zinc-400">No products found.</p>
) : (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {filteredProducts.map((product) => (
      <ProductCard
        key={product.id}
        id={product.id}
        title={product.title}
        price={product.price}
        image={product.image}
      />
    ))}
  </div>
)}
      </div>
    </div>
  );
}
