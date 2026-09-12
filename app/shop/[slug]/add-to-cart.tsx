"use client";
import { Product } from "@/lib/types"; import { addToCart } from "@/lib/cart"; import { useRouter } from "next/navigation";
export default function AddToCart({product}:{product:Product}) {
 const router=useRouter(); return <button className="btn btn-dark" disabled={product.stock<1} onClick={()=>{addToCart(product);router.push("/cart")}}>{product.stock<1?"Nije dostupno":"Dodaj u košaricu"}</button>
}