"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { CartItem } from "@/lib/types";
import { getCart,removeFromCart,total } from "@/lib/cart";

export default function CartPage(){
 const [cart,setCart]=useState<CartItem[]>([]);
 useEffect(()=>{setCart(getCart())},[]);
 const remove=(id:string)=>{removeFromCart(id);setCart(getCart())};
 return <main className="container" style={{padding:"40px 0"}}>
  <h1>Košarica</h1>
  {cart.length===0?<div className="card" style={{padding:30}}>Košarica je prazna. <Link href="/shop" style={{textDecoration:"underline"}}>Pogledaj satove</Link></div>:
  <div style={{display:"grid",gridTemplateColumns:"1fr 330px",gap:25}}>
   <div>{cart.map(p=><div className="card" key={p.id} style={{display:"flex",gap:15,padding:12,marginBottom:12}}>
    {p.image_url?<img src={p.image_url} style={{width:90,height:90,objectFit:"cover",borderRadius:10}}/>:<div style={{width:90,height:90,background:"#eee",display:"grid",placeItems:"center",borderRadius:10}}>⌚</div>}
    <div style={{flex:1}}><b>{p.title}</b><div className="muted">{p.quantity} × {p.price} KM</div></div>
    <button className="btn btn-danger" onClick={()=>remove(p.id)}>Ukloni</button>
   </div>)}</div>
   <div className="card" style={{padding:20,height:"fit-content"}}><h3>Ukupno</h3><div className="price">{total(cart).toLocaleString("bs-BA")} KM</div><Link className="btn btn-dark" style={{display:"block",textAlign:"center",marginTop:15}} href="/checkout">Nastavi na narudžbu</Link></div>
  </div>}
 </main>
}