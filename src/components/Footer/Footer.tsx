import { Title, Text } from "@mantine/core";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";
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
        <footer className="footer-container">
            <div className="footer-content">
                {/* Left Column: Lab Info */}
                <div className="footer-column footer-lab-info">
                    <div className="footer-logo-section">
                        <img src="/brown-logo.webp" alt="Brown University Logo" />
                        <div>
                            <Title order={3} className="footer-lab-name">Serre Lab</Title>
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
                            <a href="mailto:serre-lab@brown.edu" className="footer-email-link">
                                <FaEnvelope size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                                Contact Us
                            </a>
                        </Text>
                    </div>
                </div>

                {/* Middle Column: Quick Links */}
                <div className="footer-column footer-links">
                    <Title order={4} className="footer-column-title">Quick Links</Title>
                    <nav className="footer-nav">
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
                        <Title order={4} className="footer-column-title">Follow Us</Title>
                        <div className="footer-social-icons">
                            <a 
                                href="https://twitter.com/serre_lab" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="footer-social-icon"
                                aria-label="Twitter"
                            >
                                <FaTwitter size={20} />
                            </a>
                            <a 
                                href="https://www.linkedin.com/company/serre-lab" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="footer-social-icon"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={20} />
                            </a>
                            <a 
                                href="https://github.com/serre-lab" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="footer-social-icon"
                                aria-label="GitHub"
                            >
                                <FaGithub size={20} />
                            </a>
                        </div>
                    </div>
                    <div className="footer-resources-section">
                        <Title order={4} className="footer-column-title">Resources</Title>
                        <nav className="footer-nav">
                            <a 
                                href="https://vivo.brown.edu/display/tserre" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="footer-link"
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
                       className="footer-legal-link">
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
