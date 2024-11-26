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
                <img src="/serre-logo.webp" alt="Serre Lab Logo" />
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
        </div>
    );
}
