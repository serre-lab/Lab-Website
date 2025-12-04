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
            <div className="header-content">
                <Link to="/" className="left">
                    <img src="/brown-logo.webp" alt="Brown University crest" className="brown-logo" />
                    <span className="brand-divider" aria-hidden="true" />
                    <div className="lab-info">
                        <b className="lab-name">Serre Lab</b>
                        <span className="lab-tagline">Vision, Neuroscience & AI</span>
                    </div>
                </Link>

                <div className="links">
                    {props.links.map((link, index) => (
                        <Link key={index} to={link.to}>
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;
