import { Image } from "@mantine/core";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <header>
            <div className="left">
                <img src="/serre-logo.webp" alt="Serre Lab Logo" />
                <b>Serre Lab</b>
            </div>
            <div className="links">
                <Link to="">Home</Link>
                <Link to="research">Research</Link>
                <Link to="about">About</Link>
                <Link to="resources">Resources</Link>
                <Link to="scicomm">Sci-Comm</Link>
            </div>
        </header>
    );
};
export default Header;
