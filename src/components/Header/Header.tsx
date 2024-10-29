import { Image } from '@mantine/core';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="left">
                <Image radius="sm
                " src='serre-logo.webp'/>
                {/* TODO: increase size of Serre Lab Text, then work on home page */}
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
    )
}
export default Header;