"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Product } from "@/lib/types";

type Props = {
  products: Product[];
};

export default function ShopClient({ products }: Props) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("Sve");
  const [category, setCategory] = useState("Sve");
  const [sort, setSort] = useState("newest");

  const brands = useMemo(() => {
    return Array.from(
      new Set(products.map((p) => p.brand).filter(Boolean))
    ) as string[];
  }, [products]);

  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((p) => p.category).filter(Boolean))
    ) as string[];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const text = search.trim().toLowerCase();

    let result = products.filter((product) => {
      const matchesSearch =
        !text ||
        product.title.toLowerCase().includes(text) ||
        (product.brand || "").toLowerCase().includes(text) ||
        (product.category || "").toLowerCase().includes(text);

      const matchesBrand =
        brand === "Sve" || product.brand === brand;

      const matchesCategory =
        category === "Sve" || product.category === category;

      return matchesSearch && matchesBrand && matchesCategory;
    });

    if (sort === "price-low") {
      result = [...result].sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    }

    if (sort === "price-high") {
      result = [...result].sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    if (sort === "newest") {
      result = [...result].sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );
    }

    return result;
  }, [products, search, brand, category, sort]);

  return (
    <main className="section">
      <div className="container">

        <div className="shop-heading">
          <div>
            <span className="hero-kicker">WATCHSHOP</span>
            <h1>Satovi</h1>
            <p>
              Pronađite model koji odgovara vašem stilu.
            </p>
          </div>
        </div>

        {/* PRETRAGA */}
        <div className="shop-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Pretraži po nazivu, brendu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FILTERI */}
        <div className="shop-filters">

          <div className="filter-item">
            <label>
              <SlidersHorizontal size={15} />
              Brend
            </label>

            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="Sve">Svi brendovi</option>

              {brands.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>Kategorija</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Sve">Sve kategorije</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>Sortiranje</label>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Najnovije</option>
              <option value="price-low">Cijena: najniža</option>
              <option value="price-high">Cijena: najviša</option>
            </select>
          </div>

        </div>

        {/* REZULTATI */}
        <div className="shop-result-count">
          Pronađeno: <strong>{filteredProducts.length}</strong> proizvoda
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">

            {filteredProducts.map((product) => {
              const hasSale =
                product.old_price &&
                Number(product.old_price) > Number(product.price);

              return (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="product-card"
                >
                  {hasSale && (
                    <span className="sale-badge">
                      AKCIJA
                    </span>
                  )}

                  <div className="product-image">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.title}
                      />
                    ) : (
                      <div className="product-image-placeholder">
                        ⌚
                      </div>
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
              );
            })}

          </div>
        ) : (
          <div className="empty-state">
            <h2>Nema pronađenih proizvoda</h2>
            <p>
              Pokušajte promijeniti pretragu ili filtere.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}