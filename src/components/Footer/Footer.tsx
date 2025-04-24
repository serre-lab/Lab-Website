import { Title } from "@mantine/core";
import "./Footer.css";
import { Link } from "react-router-dom";

interface FooterProps {
    links: {
        social: { to: string; label: string }[];
        internal: { to: string; label: string }[];
    };
}
export default function Footer(props: FooterProps) {
    return (
        <div className="footer-container">
            <div className="footer-left">
                <img src="/brown-logo.webp" alt="Brown University Logo" />
                <p>Serre Lab</p>
            </div>
            <div className="footer-right">
                <div className="footer-list">
                    <Title order={3}>Social</Title>
                    {props.links.social.map((link, index) => (
                        <Link key={index} to={link.to}>
                            {link.label}
                        </Link>
                    ))}
                </div>
                <div className="footer-list">
                    <Title order={3}>Links</Title>
                    {props.links.internal.map((link, index) => (
                        <Link key={index} to={link.to}>
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
            <p className="footer-copy">
                © {new Date().getFullYear()} Serre Lab · Brown University
            </p>
        </div>
    );
}
