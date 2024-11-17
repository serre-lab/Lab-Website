import { Title } from "@mantine/core";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-left">
                <img src="/serre-logo.webp" alt="Serre Lab Logo" />
                <p>© 2021 Serre Lab</p>
            </div>
            <div className="footer-right">
                <div className="footer-list">
                    <Title order={3}>Social</Title>
                    <Link to="https://twitter.com/serre_lab">Twitter</Link>
                    <Link to="https://www.linkedin.com/company/serre-lab">
                        LinkedIn
                    </Link>
                </div>
                <div className="footer-list">
                    <Title order={3}>Links</Title>
                    <Link to="/">Home</Link>
                    <Link to="/research">Research</Link>
                    <Link to="/about">About</Link>
                    <Link to="/resources">Resources</Link>
                    <Link to="/scicomm">Sci-Comm</Link>
                </div>
            </div>
        </div>
    );
}
