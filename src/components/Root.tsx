import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export function Root() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
