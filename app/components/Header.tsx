import Link from "next/link";
import type { Product } from "@/lib/types";

type HeaderProps = {
  products: Product[];
};

export default function Header({ products }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="logo">
            WATCHSHOP
          </Link>

          <nav className="header-nav">
            <Link href="/">Početna</Link>
            <Link href="/shop">Satovi</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}