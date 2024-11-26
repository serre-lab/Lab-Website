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
            <div className="left">
                <img src="/serre-logo.webp" alt="Serre Lab Logo" />
                <b>Serre Lab</b>
            </div>
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
