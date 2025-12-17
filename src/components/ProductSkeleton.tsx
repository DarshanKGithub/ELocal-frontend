export default function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="aspect-square w-full rounded-xl bg-white/10" />

      <div className="mt-4 h-4 w-3/4 rounded bg-white/10" />
      <div className="mt-2 h-4 w-1/3 rounded bg-white/10" />
    </div>
  );
}