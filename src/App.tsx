
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-5">
            <a href="/" className="text-xl font-extrabold text-slate-900">
              DevStore
            </a>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />
        </Routes>

        <footer className="mt-12 border-t border-slate-200 bg-white px-5 py-6 text-center text-sm text-slate-500">
          DevStore · React + TypeScript + Python API
        </footer>
      </div>
    </BrowserRouter>
  );
}