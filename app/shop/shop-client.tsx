"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Product } from "@/lib/types";

export default function ShopClient({products}:{products:Product[]}) {
  const [q,setQ]=useState(""); const [brand,setBrand]=useState("Svi"); const [sort,setSort]=useState("new");
  const brands=["Svi",...Array.from(new Set(products.map(p=>p.brand).filter(Boolean) as string[]))];
  const list=useMemo(()=>products.filter(p=>(brand==="Svi"||p.brand===brand)&&p.title.toLowerCase().includes(q.toLowerCase())).sort((a,b)=>sort==="price-low"?a.price-b.price:sort==="price-high"?b.price-a.price:new Date(b.created_at).getTime()-new Date(a.created_at).getTime()),[products,q,brand,sort]);
  return <main className="container" style={{padding:"40px 0"}}>
    <div style={{display:"flex",justifyContent:"space-between",gap:15,flexWrap:"wrap",alignItems:"center"}}>
      <div><h1 style={{marginBottom:5}}>Svi satovi</h1><div className="muted">{list.length} proizvoda</div></div>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Pretraži sat..." style={{padding:12,border:"1px solid #ddd",borderRadius:10,width:230}}/>
    </div>
    <div style={{display:"flex",gap:10,margin:"25px 0",flexWrap:"wrap"}}>
      <select value={brand} onChange={e=>setBrand(e.target.value)} style={{padding:10,border:"1px solid #ddd",borderRadius:10}}>{brands.map(b=><option key={b}>{b}</option>)}</select>
      <select value={sort} onChange={e=>setSort(e.target.value)} style={{padding:10,border:"1px solid #ddd",borderRadius:10}}><option value="new">Najnoviji</option><option value="price-low">Cijena: najniža</option><option value="price-high">Cijena: najviša</option></select>
    </div>
    <div className="grid-products">{list.map(p=><Link className="card" key={p.id} href={`/shop/${p.slug}`}>
      {p.image_url?<img className="product-img" src={p.image_url} alt={p.title}/>:<div className="product-img" style={{display:"grid",placeItems:"center",fontSize:55}}>⌚</div>}
      <div style={{padding:14}}><div className="muted" style={{fontSize:13}}>{p.brand}</div><div style={{fontWeight:700,margin:"5px 0 10px"}}>{p.title}</div><div className="price">{Number(p.price).toLocaleString("bs-BA")} KM</div></div>
    </Link>)}</div>
  </main>
}