"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const isActive = (path: string) => (pathname === path ? "active" : "");

  return (
    <header>
      <nav>
        <Link href="/" className="brand">
          <Logo />
          DashKit
        </Link>
        <div className="nav-right">
          <div className="nav-links">
            <Link href="/specs" className={isActive("/specs")}>
              Specs
            </Link>
            <Link href="/#features" className="">
              Features
            </Link>
            <Link href="/dashboards" className={isActive("/dashboards")}>
              Dashboards
            </Link>
            <Link href="/install" className={isActive("/install")}>
              Install
            </Link>
          </div>
          <Link href="/order" className="nav-cta">
            Order DashKit
          </Link>
        </div>
      </nav>
    </header>
  );
}
