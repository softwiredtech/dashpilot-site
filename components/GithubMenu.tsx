"use client";

import { useEffect, useRef, useState } from "react";

import { GITHUB_APP, GITHUB_FIRMWARE } from "@/lib/links";

import GithubIcon from "./GithubIcon";

const REPOS = [
  {
    href: GITHUB_FIRMWARE,
    name: "dashkit-firmware",
    blurb: "The firmware running on the device",
  },
  {
    href: GITHUB_APP,
    name: "dashpilot",
    blurb: "The companion phone app",
  },
];

/**
 * There are two public repos, so the nav mark opens a small menu instead of
 * linking straight through — picking one repo to promote would bury the other.
 */
export default function GithubMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="gh-menu" ref={wrapRef}>
      <button
        type="button"
        className={`gh-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Source on GitHub"
      >
        <GithubIcon />
        <span>GitHub</span>
      </button>

      {open && (
        <div className="gh-dropdown" role="menu">
          {REPOS.map((repo) => (
            <a
              key={repo.href}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className="gh-dropdown-item"
              onClick={() => setOpen(false)}
            >
              <GithubIcon />
              <span>
                <strong>{repo.name}</strong>
                <em>{repo.blurb}</em>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
