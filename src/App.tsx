import React, { useEffect, useState } from "react";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { Research } from "./pages/Research/Research";
import { Resources } from "./pages/Resources/Resources";
//@ts-ignore
import { Publications } from "./pages/Publications/Publications";
import People from "./pages/People/People";

import { Root } from "./components/Root";
import { Links } from "./types";

import MarkdownPage from "./components/MarkdownPage/MarkdownPage";
import { loadMarkdownFiles } from "./utils/loadMarkdownFiles";

const theme = createTheme({
    fontFamily: "futura-pt",
});

const staticLinks: Links = {
    internal: [
        { to: "/", label: "Home" },
        { to: "/research", label: "Research" },
        { to: "/publications", label: "Publications" },
        { to: "/people", label: "People" },
        { to: "/resources", label: "Resources" },
        {
            to: "https://serre-lab.clps.brown.edu/news-page/",
            label: "Sci-Comm",
        },
    ],
    social: [
        { to: "https://twitter.com/serre_lab", label: "Twitter" },
        { to: "https://www.linkedin.com/company/serre-lab", label: "LinkedIn" },
    ],
};

const toTitleCase = (str: string): string => {
    return str
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

const App = () => {
    const [routes, setRoutes] = useState<{ path: string; content: string }[]>(
        []
    );
    const [links, setLinks] = useState<Links>(staticLinks);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoutes = async () => {
            const markdownRoutes = await loadMarkdownFiles();

            setRoutes(markdownRoutes);

            const markdownLinks = markdownRoutes.map(({ path }) => ({
                to: path,
                label: toTitleCase(path.replace("/", "")),
            }));

            setLinks((prevLinks) => ({
                ...prevLinks,
                internal: [
                    ...prevLinks.internal,
                    ...markdownLinks.filter(
                        (link) =>
                            !prevLinks.internal.some(
                                (existing) => existing.to === link.to
                            )
                    ),
                ],
            }));

            setLoading(false);
        };

        fetchRoutes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root links={links} />,
            children: [
                // Static Routes
                { path: "/", element: <Home /> },
                { path: "/research", element: <Research /> },
                { path: "/publications", element: <Publications /> },
                { path: "/people", element: <People /> },
                { path: "/resources", element: <Resources /> },

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
