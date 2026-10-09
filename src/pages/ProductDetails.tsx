
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../api/products";
import type { Product } from "../types";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        if (!id || !/^\d+$/.test(id)) {
          throw new Error("Invalid product ID");
        }

        const data = await getProductById(Number(id));
        setProduct(data);
      } catch {
        setError("Product not found or API is unavailable.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <p className="p-10 text-center">Loading details...</p>
    );
  }

  if (error || !product) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-12">
        <p role="alert" className="mb-6 text-red-600">
          {error || "Product not found."}
        </p>

        <Link
          to="/"
          className="font-semibold text-indigo-600 hover:underline"
        >
          ← Back to products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <Link
        to="/"
        className="font-semibold text-indigo-600 hover:underline"
      >
        ← Back to products
      </Link>

      <div className="mt-8 grid gap-10 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-xl object-cover"
        />

        <div>
          <p className="font-semibold text-indigo-600">
            {product.category}
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
            {product.name}
          </h1>

          <p className="mt-5 text-2xl font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </p>

          <h2 className="mt-8 text-lg font-bold">
            Product description
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            {product.description}
          </p>

          <p className="mt-8 text-sm text-slate-400">
            Product ID: {product.id}
          </p>
        </div>
      </div>
    </main>
  );
}