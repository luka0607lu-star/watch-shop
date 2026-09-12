import { createClient } from "@/lib/supabase-server";
import AddToCart from "./add-to-cart";
import { notFound } from "next/navigation";

export default async function ProductPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const supabase=await createClient();
  const {data:p}=await supabase.from("products").select("*").eq("slug",slug).eq("active",true).single();
  if(!p) notFound();
  return <main className="container" style={{padding:"45px 0"}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:45}}>
      <div>{p.image_url?<img src={p.image_url} alt={p.title} style={{width:"100%",borderRadius:20,aspectRatio:"1/1",objectFit:"cover"}}/>:<div style={{aspectRatio:"1/1",background:"#eef0f3",borderRadius:20,display:"grid",placeItems:"center",fontSize:100}}>⌚</div>}</div>
      <div style={{paddingTop:20}}><div className="muted">{p.brand}</div><h1 style={{fontSize:42,margin:"8px 0"}}>{p.title}</h1><div className="price" style={{fontSize:30}}>{Number(p.price).toLocaleString("bs-BA")} KM</div>
      <p style={{lineHeight:1.7,color:"#4b5563",whiteSpace:"pre-wrap"}}>{p.description || "Za ovaj proizvod trenutno nema dodatnog opisa."}</p>
      <div style={{margin:"25px 0",padding:15,background:"#f3f4f6",borderRadius:12}}>{p.stock>0?"Dostupno odmah":"Trenutno nije dostupno"}</div>
      <AddToCart product={p}/></div>
    </div>
  </main>
}