import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function Home() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select("*").eq("active", true).eq("featured", true).order("created_at", {ascending:false}).limit(8);

  return (
    <main>
      <section style={{padding:"70px 0",background:"linear-gradient(135deg,#111827,#374151)",color:"#fff"}}>
        <div className="container" style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:35,alignItems:"center"}}>
          <div>
            <div style={{opacity:.7,fontWeight:700}}>WATCH SHOP</div>
            <h1 style={{fontSize:"clamp(40px,7vw,72px)",lineHeight:.95,margin:"14px 0"}}>Pronađi sat koji odgovara tvom stilu.</h1>
            <p style={{fontSize:18,opacity:.8,maxWidth:580}}>Garmin, Casio, Huawei, Suunto i drugi modeli na jednom mjestu.</p>
            <Link className="btn" style={{display:"inline-block",background:"#fff",color:"#111827",marginTop:15}} href="/shop">Pogledaj ponudu</Link>
          </div>
          <div style={{background:"#ffffff12",borderRadius:25,padding:15}}>
            <div style={{aspectRatio:"1/1",borderRadius:18,background:"#ffffff18",display:"grid",placeItems:"center",fontSize:100}}>⌚</div>
          </div>
        </div>
      </section>

      <section className="container" style={{padding:"50px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
          <h2 style={{margin:0}}>Izdvojeni satovi</h2><Link href="/shop">Svi proizvodi →</Link>
        </div>
        <div className="grid-products">
          {(products || []).map((p:any) => (
            <Link href={`/shop/${p.slug}`} className="card" key={p.id}>
              {p.image_url ? <img className="product-img" src={p.image_url} alt={p.title}/> : <div className="product-img" style={{display:"grid",placeItems:"center",fontSize:55}}>⌚</div>}
              <div style={{padding:14}}><div className="muted" style={{fontSize:13}}>{p.brand}</div><div style={{fontWeight:700,margin:"5px 0 10px"}}>{p.title}</div><div className="price">{Number(p.price).toLocaleString("bs-BA")} KM</div></div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}