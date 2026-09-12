import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import AdminProducts from "./products";
export default async function Admin(){
 const s=await createClient(); const {data:user}=await s.auth.getUser(); const {data:products}=await s.from("products").select("*").order("created_at",{ascending:false});
 return <main className="container" style={{padding:"35px 0"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,marginBottom:25}}><div><h1 style={{margin:0}}>Admin panel</h1><div className="muted">{user.user?.email}</div></div><Link className="btn btn-dark" href="/admin/product/new">+ Novi proizvod</Link></div><AdminProducts products={products||[]}/></main>
}