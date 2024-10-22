import { Image } from '@mantine/core';

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
                <a>Home</a>
                <a>Research</a>
                <a>About</a>
                <a>Resources</a>
                <a>Sci-Comm</a>
            </div>

        </header>
    )
}
export default Header;