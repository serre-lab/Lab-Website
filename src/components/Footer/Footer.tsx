import { Text } from "@mantine/core";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaTwitter, FaGithub } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";

interface FooterProps {
    links: {
        social: { to: string; label: string }[];
        internal: { to: string; label: string }[];
    };
}

export default function Footer(props: FooterProps) {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="footer-container" role="contentinfo">
            <div className="footer-content">
                {/* Left Column: Lab Info */}
                <div className="footer-column footer-lab-info">
                           <div className="footer-logo-section">
                               <img src="/brown-logo-small.webp" alt="Brown University Logo" className="footer-brown-logo" width={40} height={46} loading="lazy" />
                               <span className="footer-logo-divider" aria-hidden="true" />
                               <div className="footer-logo-text">
                                   <p className="footer-lab-name"><strong>Serre Lab</strong></p>
                                   <Text className="footer-lab-tagline">Vision, Neuroscience & AI</Text>
                               </div>
                    </div>
                    <div className="footer-contact">
                        <Text size="sm" className="footer-contact-item">
                            <strong>Brown University</strong>
                        </Text>
                        <Text size="sm" className="footer-contact-item">
                            Providence, RI 02912
                        </Text>
                        <Text size="sm" className="footer-contact-item">
                            <a href="mailto:serre-lab@brown.edu" className="footer-email-link" style={{ color: '#2c3e50' }}>
                                <FaEnvelope size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                                Contact Us
                            </a>
                        </Text>
                    </div>
                </div>

                {/* Middle Column: Quick Links */}
                <div className="footer-column footer-links">
                    <span className="footer-column-title">Quick Links</span>
                    <nav className="footer-nav" aria-label="Quick links">
                        {props.links.internal.map((link, index) => (
                            <Link key={index} to={link.to} className="footer-link">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right Column: Social & Resources */}
                <div className="footer-column footer-social-resources">
                    <div className="footer-social-section">
                        <span className="footer-column-title">Follow Us</span>
                        <nav className="footer-social-icons" aria-label="Social links">
                            <a 
                                href="https://x.com/tserre" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="footer-social-icon"
                                aria-label="Twitter (opens in new tab)"
                                title="Opens in new tab"
                            >
                                <FaTwitter size={20} aria-hidden="true" />
                            </a>
                            <a 
                                href="https://github.com/serre-lab" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="footer-social-icon"
                                aria-label="GitHub (opens in new tab)"
                                title="Opens in new tab"
                            >
                                <FaGithub size={20} aria-hidden="true" />
                            </a>
                            <a 
                                href="https://bsky.app/profile/thomasserre.bsky.social" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="footer-social-icon"
                                aria-label="Bluesky (opens in new tab)"
                                title="Opens in new tab"
                            >
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Bluesky_logo_%28black%29.svg/869px-Bluesky_logo_%28black%29.svg.png"
                                    alt=""
                                    width="20"
                                    height="20"
                                    style={{ display: 'block' }}
                                    aria-hidden="true"
                                />
                            </a>
                        </nav>
                    </div>
                    <div className="footer-resources-section">
                        <span className="footer-column-title">Resources</span>
                        <nav className="footer-nav" aria-label="External resources">
                            <a 
                                href="https://vivo.brown.edu/display/tserre" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="footer-link"
                                title="Opens in new tab"
                            >
                                Brown Profile
                            </a>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <Text size="xs" className="footer-copyright">
                    © {currentYear} Serre Lab · Brown University
                </Text>
                <div className="footer-legal-links">
                    <a href="https://www.brown.edu/about/administration/institutional-accessibility" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="footer-legal-link"
                       title="Opens in new tab">
                        Accessibility
                    </a>
                    <span className="footer-separator">·</span>
                    <a href="/sitemap.xml" className="footer-legal-link">
                        Sitemap
                    </a>
                </div>
            </div>
        </footer>
    );
}
