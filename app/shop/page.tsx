import { createClient } from "@/lib/supabase-server";
import ShopClient from "./shop-client";

export default async function ShopPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("products").select("*").eq("active", true).order("created_at", {ascending:false});
  return <ShopClient products={data || []} />;
}