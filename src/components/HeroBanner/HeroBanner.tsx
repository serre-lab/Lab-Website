import type { ReactNode, CSSProperties } from "react";
import { Title, Text } from "@mantine/core";
import { motion } from "motion/react";
import { FaTwitter, FaGithub } from "react-icons/fa6";
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
  const bannerBackground = backgroundImage || "/hero-texture.svg";

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
          <div className="hero-banner-social-icons">
              <a
                href="https://x.com/tserre"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hero-banner-social-icon"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://github.com/serre-lab"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hero-banner-social-icon"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://bsky.app/profile/thomasserre.bsky.social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bluesky"
                className="hero-banner-social-icon"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Bluesky_logo_%28black%29.svg/869px-Bluesky_logo_%28black%29.svg.png"
                  alt="Bluesky"
                  width={18}
                  height={18}
                  style={{ display: "block", filter: "brightness(0) invert(1)" }}
                />
              </a>
            </div>
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
