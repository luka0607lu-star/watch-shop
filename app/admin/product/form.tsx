"use client";
import { useState } from "react"; import { useRouter } from "next/navigation"; import { createClient } from "@/lib/supabase-browser"; import { Product } from "@/lib/types";
const slugify=(s:string)=>s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-");
export default function ProductForm({product}:{product?:Product}){
 const router=useRouter(); const [loading,setLoading]=useState(false); const [image,setImage]=useState<File|null>(null);
 const [f,setF]=useState({title:product?.title||"",brand:product?.brand||"",category:product?.category||"",price:String(product?.price||""),old_price:String(product?.old_price||""),description:product?.description||"",stock:String(product?.stock??1),featured:product?.featured||false,active:product?.active??true,image_url:product?.image_url||""});
 const set=(k:string,v:any)=>setF(x=>({...x,[k]:v}));
 async function submit(e:any){e.preventDefault();setLoading(true);const s=createClient();let image_url=f.image_url;
  if(image){const ext=image.name.split(".").pop();const path=`${crypto.randomUUID()}.${ext}`;const up=await s.storage.from("product-images").upload(path,image,{upsert:true});if(up.error){alert(up.error.message);setLoading(false);return;}image_url=s.storage.from("product-images").getPublicUrl(path).data.publicUrl;}
  const payload={title:f.title,slug:slugify(f.title),brand:f.brand||null,category:f.category||null,price:Number(f.price),old_price:f.old_price?Number(f.old_price):null,description:f.description||null,stock:Number(f.stock),featured:f.featured,active:f.active,image_url};
  const res=product?await s.from("products").update(payload).eq("id",product.id):await s.from("products").insert(payload);
  setLoading(false);if(res.error){alert(res.error.message);return;}router.push("/admin");router.refresh();
 }
 return <form onSubmit={submit} className="card" style={{padding:22,display:"grid",gap:14}}>
 {["title","brand","category","price","old_price","stock"].map(k=><label key={k}><b>{k==="title"?"Naziv":k==="brand"?"Brend":k==="category"?"Kategorija":k==="price"?"Cijena (KM)":k==="old_price"?"Stara cijena (KM)":"Zaliha"}</b><input required={k==="title"||k==="price"} type={["price","old_price","stock"].includes(k)?"number":"text"} value={(f as any)[k]} onChange={e=>set(k,e.target.value)} style={{display:"block",width:"100%",padding:11,border:"1px solid #ddd",borderRadius:9,marginTop:6}}/></label>)}
 <label><b>Opis</b><textarea rows={7} value={f.description} onChange={e=>set("description",e.target.value)} style={{display:"block",width:"100%",padding:11,border:"1px solid #ddd",borderRadius:9,marginTop:6}}/></label>
 <label><b>Slika proizvoda</b><input type="file" accept="image/*" onChange={e=>setImage(e.target.files?.[0]||null)} style={{display:"block",marginTop:6}}/></label>
 {f.image_url&&<img src={f.image_url} style={{width:180,aspectRatio:"1/1",objectFit:"cover",borderRadius:12}}/>}
 <label><input type="checkbox" checked={f.featured} onChange={e=>set("featured",e.target.checked)}/> Izdvojeni proizvod</label>
 <label><input type="checkbox" checked={f.active} onChange={e=>set("active",e.target.checked)}/> Prikaži na web shopu</label>
 <button className="btn btn-dark" disabled={loading}>{loading?"Spremanje...":"Spremi proizvod"}</button>
 </form>
}