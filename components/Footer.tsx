import Link from "next/link";

import {
  DISCORD,
  GITHUB_APP,
  GITHUB_FIRMWARE,
  X_TWITTER,
  YOUTUBE,
} from "@/lib/links";

import GithubIcon from "./GithubIcon";
import Logo from "./Logo";
import { DiscordIcon, XIcon, YoutubeIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand">
              <Logo />
              DashKit
            </Link>
            <p>Softwired Technologies Korlátolt Felelősségű Társaság</p>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li>
                <a href="https://softwiredtech.com" target="_blank" rel="noopener noreferrer">
                  softwiredtech.com
                </a>
              </li>
              <li>
                <a href="mailto:info@softwiredtech.com">info@softwiredtech.com</a>
              </li>
              <li>
                <a href="tel:+36308838435">+36 30 883 8435</a>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy policy</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Source</h4>
            <ul>
              <li>
                <a
                  href={GITHUB_FIRMWARE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-gh"
                >
                  <GithubIcon />
                  dashkit-firmware
                </a>
              </li>
              <li>
                <a
                  href={GITHUB_APP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-gh"
                >
                  <GithubIcon />
                  dashpilot
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Community</h4>
            <ul>
              <li>
                <a
                  href={DISCORD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-gh"
                >
                  <DiscordIcon />
                  Discord
                </a>
              </li>
              <li>
                <a
                  href={YOUTUBE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-gh"
                >
                  <YoutubeIcon />
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href={X_TWITTER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-gh"
                >
                  <XIcon />
                  X
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Address</h4>
            <ul>
              <li>Nagy Lajos király útja 14.</li>
              <li>fszt. 3.</li>
              <li>7622 Pécs, Hungary</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Softwired Technologies Kft.</span>
        </div>
      </div>
    </footer>
  );
}
