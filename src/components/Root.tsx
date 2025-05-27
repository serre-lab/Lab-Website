import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
// import Footer from "./Footer/Footer"; // Commented out
import { Links } from "../types";

interface RootProps {
    links: Links;
}

export function Root(props: RootProps) {
    return (
        <div>
            <Header links={props.links.internal} />
            <Outlet />
            {/* <Footer links={props.links} /> */}
        </div>
    );
}
