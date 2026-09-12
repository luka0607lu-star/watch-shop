export type Product = {
  id: string;
  title: string;
  slug: string;
  brand: string | null;
  category: string | null;
  description: string | null;
  price: number;
  old_price: number | null;
  image_url: string | null;
  gallery: string[] | null;
  stock: number;
  featured: boolean;
  active: boolean;
  created_at: string;
};

export type CartItem = Product & { quantity: number };