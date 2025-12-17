import React from "react";
import Link from "next/link";

type Props = {
  id: string;
  title: string;
  price: number;
  image: string;
};

function ProductCard({ id, title, price, image }: Props) {
  return (
    <Link href={`/products/${id}`}>
      <div className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:scale-[1.02]">
        <img
          src={image}
          alt={title}
          className="aspect-square w-full rounded-xl object-cover"
        />
        <h3 className="mt-4 font-semibold">{title}</h3>
        <p className="text-zinc-400">
          ₹{price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}

export default React.memo(ProductCard);
