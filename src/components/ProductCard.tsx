
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({
  product,
  onClick,
}: ProductCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <p className="text-sm font-medium text-indigo-600">
          {product.category}
        </p>

        <h2 className="mt-2 text-lg font-bold text-slate-900">
          {product.name}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm text-slate-500">
          {product.description}
        </p>

        <p className="mt-4 text-xl font-bold text-slate-900">
          ${product.price.toFixed(2)}
        </p>

        <span className="mt-4 inline-block text-sm font-semibold text-indigo-600">
          View details →
        </span>
      </div>
    </button>
  );
}