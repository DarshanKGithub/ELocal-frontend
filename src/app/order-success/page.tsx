export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-6">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
        <h1 className="text-4xl font-bold text-green-400">
          Order Confirmed 🎉
        </h1>

        <p className="mt-4 text-zinc-400">
          You have successfully purchased your product.
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          A confirmation email will be sent shortly.
        </p>

        <a
          href="/products"
          className="inline-block mt-8 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-zinc-200"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
}
