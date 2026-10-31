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
        <header role="banner">
            <div className="header-content">
                <Link to="/" className="left">
                    <img src="/brown-logo-small.webp" alt="Brown University crest" className="brown-logo" width={40} height={46} />
                    <span className="brand-divider" aria-hidden="true" />
                    <img src="/brand/serre-lab-logo-transparent-for-light-bg.svg" alt="Serre Lab: Vision, Neuroscience & AI" className="lab-logo" height={56} />
                </Link>

                <nav className="links" aria-label="Primary navigation">
                    {props.links.map((link, index) => (
                        <Link key={index} to={link.to} className={link.to === "/lab-links" ? "internal-nav-link" : undefined}>
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
