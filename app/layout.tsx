import "./globals.css";
import { createClient } from "@/lib/supabase-server";
import Header from "./components/Header";
import type { Product } from "@/lib/types";

export const metadata = {
  title: "WATCHSHOP | Satovi",
  description: "Online trgovina satovima",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  const products = (data ?? []) as Product[];

  return (
    <html lang="bs">
      <body>
        <Header products={products} />

        {children}

        <footer className="site-footer">
          <div className="container">
            <div className="footer-inner">
              <div>
                <div className="logo">WATCHSHOP</div>
                <p className="footer-muted">
                  Kvalitetni satovi za svaki stil.
                </p>
              </div>

              <div>
                <p className="footer-muted">
                  © {new Date().getFullYear()} WATCHSHOP
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}