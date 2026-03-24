import type { ReactNode, CSSProperties } from "react";
import { Title, Text } from "@mantine/core";
import { motion } from "motion/react";
import { FaTwitter, FaGithub, FaBluesky } from "react-icons/fa6";
import { SiZotero } from "react-icons/si";
import "./HeroBanner.css";

interface HeroBannerProps {
  title: string;
  subtitle?: string | ReactNode;
  showSocialIcons?: boolean;
  height?: string;
  backgroundImage?: string;
  blur?: boolean;
}

const fadeZoom = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function HeroBanner({ title, subtitle, showSocialIcons = true, height, backgroundImage, blur = false }: HeroBannerProps) {
  const bannerBackground = backgroundImage || "/metcalf.webp";

  return (
    <motion.div
      className={`hero-banner-wrapper ${blur ? 'hero-banner-blur' : ''}`}
      variants={fadeZoom}
      initial="hidden"
      animate="visible"
      style={{ 
        height: height || undefined,
        backgroundImage: blur ? 'none' : `url(${bannerBackground})`,
        '--bg-image': `url(${bannerBackground})`
      } as CSSProperties & { '--bg-image': string }}
    >
      <div className="hero-banner-content">
        {showSocialIcons && (
        <div className="hero-banner-social">
          <span className="hero-banner-social-label">Follow Us</span>
          <nav className="hero-banner-social-icons" aria-label="Social links">
              <a
                href="https://x.com/tserre"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter (opens in new tab)"
                title="Opens in new tab"
                className="hero-banner-social-icon"
              >
                <FaTwitter size={18} aria-hidden="true" />
              </a>
              <a
                href="https://github.com/serre-lab"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (opens in new tab)"
                title="Opens in new tab"
                className="hero-banner-social-icon"
              >
                <FaGithub size={18} aria-hidden="true" />
              </a>
              <a
                href="https://bsky.app/profile/thomasserre.bsky.social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bluesky (opens in new tab)"
                title="Opens in new tab"
                className="hero-banner-social-icon"
              >
                <FaBluesky size={18} aria-hidden="true" />
              </a>
              <a
                href="https://www.zotero.org/users/277107"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zotero (opens in new tab)"
                title="Opens in new tab"
                className="hero-banner-social-icon"
              >
                <SiZotero size={18} aria-hidden="true" />
              </a>
            </nav>
          </div>
        )}

        <div className={`hero-banner-text ${showSocialIcons ? '' : 'centered-text'}`}>
          <Title order={1} className="hero-banner-title">{title}</Title>
          {subtitle && (
            <div className="hero-banner-subtitle">
              {typeof subtitle === 'string' ? (
                <Text className="hero-banner-subtitle-text">{subtitle}</Text>
              ) : (
                subtitle
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
