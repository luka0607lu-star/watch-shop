"use client";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { CartItem } from "@/lib/types";
import { getCart,total,saveCart } from "@/lib/cart";

export default function Checkout(){
 const router=useRouter(); const [cart,setCart]=useState<CartItem[]>([]); const [loading,setLoading]=useState(false); const [form,setForm]=useState({name:"",phone:"",address:"",city:"",note:""});
 useEffect(()=>setCart(getCart()),[]);
 const submit=async(e:any)=>{e.preventDefault(); if(!cart.length)return; setLoading(true); const supabase=createClient();
  const {error}=await supabase.from("orders").insert({customer_name:form.name,phone:form.phone,address:form.address,city:form.city,note:form.note,total:total(cart),items:cart.map(x=>({id:x.id,title:x.title,price:x.price,quantity:x.quantity}))});
  setLoading(false); if(error){alert(error.message);return;} saveCart([]); router.push("/order-success");
 };
 return <main className="container" style={{padding:"40px 0",maxWidth:700}}><h1>Podaci za narudžbu</h1><form onSubmit={submit} className="card" style={{padding:22,display:"grid",gap:13}}>
 {Object.entries(form).map(([key,val])=><label key={key} style={{display:"grid",gap:6}}><b>{key==="name"?"Ime i prezime":key==="phone"?"Telefon":key==="address"?"Adresa":key==="city"?"Grad":"Napomena"}</b>{key==="note"?<textarea rows={4} value={val} onChange={e=>setForm({...form,[key]:e.target.value})}/>:<input required={key!=="note"} value={val} onChange={e=>setForm({...form,[key]:e.target.value})} style={{padding:12,border:"1px solid #ddd",borderRadius:9}}/>}</label>)}
 <div style={{fontWeight:800,fontSize:20}}>Ukupno: {total(cart).toLocaleString("bs-BA")} KM</div>
 <button className="btn btn-dark" disabled={loading}>{loading?"Slanje...":"Pošalji narudžbu"}</button>
 </form></main>
}