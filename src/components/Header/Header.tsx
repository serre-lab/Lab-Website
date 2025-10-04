import { Link } from "react-router-dom";
import "./Header.css";

interface LinkType {
    to: string;
    label: string;
}

interface HeaderProps {
    links: LinkType[];
}

const Header = (props: HeaderProps) => {
    return (
        <header>
            <Link to="/" className="left">
                <img src="/brown-logo.webp" alt="Brown University Logo" />
                <div className="lab-info">
                    <b>Serre Lab</b>
                    <span className="lab-tagline">Visual Cognition, Neuroscience & AI</span>
                </div>
            </Link>

            <div className="links">
                {props.links.map((link, index) => (
                    <Link key={index} to={link.to}>
                        {link.label}
                    </Link>
                ))}
            </div>
        </header>
    );
};

export default Header;
