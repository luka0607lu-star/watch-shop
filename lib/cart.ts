import { Product, CartItem } from "./types";

const KEY = "watch-shop-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(product: Product) {
  const cart = getCart();
  const existing = cart.find(x => x.id === product.id);
  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });
  saveCart(cart);
}

export function removeFromCart(id: string) {
  saveCart(getCart().filter(x => x.id !== id));
}

export function total(cart: CartItem[]) {
  return cart.reduce((sum, x) => sum + Number(x.price) * x.quantity, 0);
}