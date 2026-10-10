import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Links } from "../types";
import { SEOHead } from "./SEOHead";

interface RootProps {
    links: Links;
}

const pageTitles: Record<string, string> = {
    "/": "Serre Lab",
    "/research": "Research",
    "/publications": "Publications",
    "/people": "People",
    "/resources": "Resources",
    "/sci-comm": "Media & Science Communication",
};

export function Root(props: RootProps) {
    const location = useLocation();
    const mainRef = useRef<HTMLElement>(null);
    const liveRegionRef = useRef<HTMLDivElement>(null);
    const previousPath = useRef(location.pathname);

    // SPA route announcement for screen readers
    useEffect(() => {
        const path = location.pathname;
        const title = pageTitles[path] || (path.startsWith("/resources/")
            ? path.replace("/resources/", "").replace(/-/g, " ")
            : path.replace(/^\//, "").replace(/-/g, " ")) || "Serre Lab";
        const displayTitle = typeof title === "string" && title.length > 0
            ? title.charAt(0).toUpperCase() + title.slice(1)
            : "Serre Lab";
        const announcement = `${displayTitle} page loaded`;

        if (liveRegionRef.current) {
            liveRegionRef.current.textContent = announcement;
        }

        // Focus main content on route changes (not first load, so the skip link stays first in tab order)
        if (previousPath.current === location.pathname) return;
        previousPath.current = location.pathname;
        const focusedElement = document.activeElement;
        const timer = setTimeout(() => {
            // Preserve focus if the visitor has already moved to another control.
            if (document.activeElement !== focusedElement) return;
            const heading = mainRef.current?.querySelector<HTMLElement>("h1");
            if (heading) heading.tabIndex = -1;
            (heading ?? mainRef.current)?.focus({ preventScroll: true });
        }, 100);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <div>
            <div
                ref={liveRegionRef}
                className="sr-only"
                aria-live="polite"
                aria-atomic="true"
            />
            <SEOHead />
            <Header links={props.links.internal} />
            <main id="main-content" ref={mainRef} tabIndex={-1} role="main">
                <Outlet />
            </main>
            <Footer />
            <ScrollRestoration />
        </div>
    );
}
