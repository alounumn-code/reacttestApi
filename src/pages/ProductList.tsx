
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError(
          "Cannot load products. Please check that the Python API is running."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <p className="p-10 text-center text-slate-600">
        Loading products...
      </p>
    );
  }

  if (error) {
    return (
      <p role="alert" className="p-10 text-center text-red-600">
        {error}
      </p>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <div className="mb-8">
        <p className="font-semibold text-indigo-600">
          PRODUCT CATALOG
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Explore our products
        </h1>

        <p className="mt-3 text-slate-500">
          Products loaded from a Python FastAPI backend.
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-slate-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/products/${product.id}`)}
            />
          ))}
        </div>
      )}
    </main>
  );
}