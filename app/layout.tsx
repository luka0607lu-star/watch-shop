import "./globals.css";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export const metadata = {
  title: "Watch Shop",
  description: "Online trgovina satova"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr">
      <body>
        <header
          style={{
            background: "#fff",
            borderBottom: "1px solid #e5e7eb",
            position: "sticky",
            top: 0,
            zIndex: 20
          }}
        >
          <div
            className="container"
            style={{
              height: 68,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Link href="/" style={{ fontWeight: 900, fontSize: 22 }}>
              WATCH<span style={{ color: "#6b7280" }}>SHOP</span>
            </Link>

            <nav style={{ display: "flex", gap: 18, alignItems: "center" }}>
              <Link href="/">Početna</Link>
              <Link href="/shop">Satovi</Link>
              <Link
                href="/cart"
                style={{
                  display: "flex",
                  gap: 6,
                  alignItems: "center"
                }}
              >
                <ShoppingBag size={19} />
                Košarica
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <footer
          style={{
            marginTop: 60,
            padding: "35px 0",
            background: "#111827",
            color: "#fff"
          }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap"
            }}
          >
            <div>
              <b>WATCHSHOP</b>
              <div style={{ opacity: 0.7, marginTop: 8 }}>
                Kvalitetni satovi po povoljnim cijenama.
              </div>
            </div>

            <div style={{ opacity: 0.7 }}>
              © {new Date().getFullYear()} Watch Shop
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}