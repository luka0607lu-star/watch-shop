import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function Home() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  const allProducts = products ?? [];
  const featured = allProducts.filter((p) => p.featured);
  const shownProducts = featured.length ? featured.slice(0, 8) : allProducts.slice(0, 8);

  const categories = Array.from(
    new Set(allProducts.map((p) => p.category).filter(Boolean))
  );

  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-kicker">WATCHSHOP</div>

            <h1>Vrijeme izgleda bolje.</h1>

            <p>
              Otkrijte kolekciju satova pažljivo odabranih za svaki stil.
              Moderan dizajn, jednostavna kupovina i sigurna narudžba.
            </p>

            <Link href="/shop" className="btn btn-dark">
              Pogledaj satove
            </Link>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="features">
          <div className="feature">
            <div>🚚</div>
            <h3>Brza dostava</h3>
            <p>Brza i jednostavna dostava na vašu adresu.</p>
          </div>

          <div className="feature">
            <div>✓</div>
            <h3>Sigurna narudžba</h3>
            <p>Jednostavan proces naručivanja bez komplikacija.</p>
          </div>

          <div className="feature">
            <div>◉</div>
            <h3>Podrška kupcima</h3>
            <p>Tu smo ako vam treba pomoć prije ili nakon kupovine.</p>
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>Kategorije</h2>
                <p>Pronađite sat prema kategoriji.</p>
              </div>
            </div>

            <div className="category-grid">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/shop?category=${encodeURIComponent(category as string)}`}
                  className="category-card"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>{featured.length ? "Izdvojeni satovi" : "Najnoviji satovi"}</h2>
              <p>Odabrani modeli iz naše ponude.</p>
            </div>

            <Link href="/shop">Pogledaj sve →</Link>
          </div>

          {shownProducts.length > 0 ? (
            <div className="product-grid">
              {shownProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="product-card"
                >
                  {product.old_price && Number(product.old_price) > Number(product.price) && (
                    <span className="sale-badge">AKCIJA</span>
                  )}

                  <div className="product-image">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.title} />
                    ) : (
                      <div className="product-image-placeholder">⌚</div>
                    )}
                  </div>

                  <div className="product-info">
                    <div className="product-brand">
                      {product.brand || "SAT"}
                    </div>

                    <div className="product-title">
                      {product.title}
                    </div>

                    <div className="price">
                      <span className="new-price">
                        {Number(product.price).toFixed(2)} KM
                      </span>

                      {product.old_price && (
                        <span className="old-price">
                          {Number(product.old_price).toFixed(2)} KM
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>Trenutno nema proizvoda.</p>
          )}
        </div>
      </section>
    </main>
  );
}