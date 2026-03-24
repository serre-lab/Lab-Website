import { lazy, Suspense, useEffect, useState } from "react";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { createHashRouter, RouterProvider } from "react-router-dom";

import { Home } from "./pages/Home/Home";
const Research = lazy(() => import("./pages/Research/Research").then(m => ({ default: m.Research })));
const Resources = lazy(() => import("./pages/Resources/Resources").then(m => ({ default: m.Resources })));
//@ts-ignore
const Publications = lazy(() => import("./pages/Publications/Publications").then(m => ({ default: m.Publications })));
const People = lazy(() => import("./pages/People/People"));
const SciComm = lazy(() => import("./pages/SciComm/SciComm").then(m => ({ default: m.SciComm })));

import { Root } from "./components/Root";
import { Links } from "./types";

import MarkdownPage from "./components/MarkdownPage/MarkdownPage";
import { loadMarkdownFiles } from "./utils/loadMarkdownFiles";

const theme = createTheme({
    // fontFamily: "futura-pt",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    components: {
        // Text: {
        //     defaultProps: {
        //         size: "lg",
        //     }
        // }
        // Title: {
        //     defaultProps: {

        //     }
        // }
    }
});

const staticLinks: Links = {
    internal: [
        { to: "/", label: "Home" },
        { to: "/research", label: "Research" },
        { to: "/publications", label: "Publications" },
        { to: "/people", label: "People" },
        { to: "/resources", label: "Resources" },
        {
            to: "/sci-comm",
            label: "Media",
        },
    ],
    social: [
        { to: "https://twitter.com/serre_lab", label: "Twitter" },
        { to: "https://www.linkedin.com/company/serre-lab", label: "LinkedIn" },
        { to: "https://bsky.app/profile/thomasserre.bsky.social", label: "Bluesky" },
        { to: "https://www.zotero.org/users/277107", label: "Zotero" },
    ],
};

// const toTitleCase = (str: string): string => {
//     return str
//         .replace(/-/g, " ")
//         .replace(/\b\w/g, (char) => char.toUpperCase());
// };

const App = () => {
    const [routes, setRoutes] = useState<{ path: string; content: string }[]>(
        []
    );
    const [links] = useState<Links>(staticLinks);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoutes = async () => {
            const markdownRoutes = await loadMarkdownFiles();

            setRoutes(markdownRoutes);

            setLoading(false);
        };

        fetchRoutes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const router = createHashRouter([
        {
            path: "/",
            element: <Root links={links} />,
            children: [
                // Static Routes (lazy-loaded)
                { path: "/", element: <Home /> },
                { path: "/research", element: <Suspense fallback={null}><Research /></Suspense> },
                { path: "/publications", element: <Suspense fallback={null}><Publications /></Suspense> },
                { path: "/people", element: <Suspense fallback={null}><People /></Suspense> },
                { path: "/resources", element: <Suspense fallback={null}><Resources /></Suspense> },
                { path: "/sci-comm", element: <Suspense fallback={null}><SciComm /></Suspense> },


                // Dynamic Markdown Routes
                ...routes.map(({ path, content }) => ({
                    path,
                    element: <MarkdownPage content={content} />,
                })),
            ],
        },
    ]);

    console.log("routes", routes);
    console.log("links", links);

    return (
        <MantineProvider theme={theme}>
            <RouterProvider router={router} />
        </MantineProvider>
    );
};

export default App;
