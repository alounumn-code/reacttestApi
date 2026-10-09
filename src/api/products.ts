
import type { Product } from "../types";

const API_URL = "http://127.0.0.1:8001/api/products";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json() as Promise<Product[]>;
}

export async function getProductById(
  id: number
): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Product not found");
  }

  return response.json() as Promise<Product>;
}