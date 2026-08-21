"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ORDER_CTA_LABEL, ORDER_CTA_LABEL_SHORT } from "@/lib/flags";
import { DISCORD } from "@/lib/links";

import GithubMenu from "./GithubMenu";
import Logo from "./Logo";
import { DiscordIcon } from "./SocialIcons";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (path: string) => (pathname === path ? "active" : "");
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
          <a
            href={DISCORD}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social"
            aria-label="Join the DashKit Discord"
          >
            <DiscordIcon />
            <span>Discord</span>
          </a>
          <GithubMenu />
          <Link href="/order" className="nav-cta" aria-label={ORDER_CTA_LABEL}>
            {/* Both labels ship and CSS picks one, so the swap happens at the
                real viewport width instead of after a client-side measure. */}
            <span className="nav-cta-long">{ORDER_CTA_LABEL}</span>
            <span className="nav-cta-short" aria-hidden="true">
              {ORDER_CTA_LABEL_SHORT}
            </span>
          </Link>
          <button
            type="button"
            className={`nav-toggle ${menuOpen ? "open" : ""}`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M4 4l12 12M16 4L4 16" />
              ) : (
                <path d="M3 5.5h14M3 10h14M3 14.5h14" />
              )}
            </svg>
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <Link
            href="/specs"
            className={isActive("/specs")}
            onClick={closeMenu}
          >
            Specs
          </Link>
          <Link href="/#features" onClick={closeMenu}>
            Features
          </Link>
          <Link
            href="/dashboards"
            className={isActive("/dashboards")}
            onClick={closeMenu}
          >
            Dashboards
          </Link>
          <Link
            href="/install"
            className={isActive("/install")}
            onClick={closeMenu}
          >
            Install
          </Link>
        </div>
      )}
    </header>
  );
}
