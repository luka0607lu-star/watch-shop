import { createClient } from "@/lib/supabase-server";
import ShopClient from "./shop-client";

export default async function ShopPage() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="section">
        <div className="container">
          <h1>Satovi</h1>
          <p>Došlo je do greške pri učitavanju proizvoda.</p>
        </div>
      </main>
    );
  }

  return <ShopClient products={products ?? []} />;
}