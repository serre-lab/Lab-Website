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

import { Root } from "./components/Root"; // Adjust the path as necessary
import { Links } from "./types";

import MarkdownPage from "./components/MarkdownPage/MarkdownPage";
import { loadMarkdownFiles } from "./utils/loadMarkdownFiles"; // For runtime scanning

// Add theme to provider if you want to customize
const theme = createTheme({
    fontFamily: "futura-pt",
});

// Static Header and Footer Links
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

// Utility function to convert a string to Title Case
const toTitleCase = (str: string): string => {
    return str
        .replace(/-/g, " ") // Replace dashes with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

const App = () => {
    const [routes, setRoutes] = useState<{ path: string; content: string }[]>(
        []
    );
    const [links, setLinks] = useState<Links>(staticLinks); // Initialize with static links
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchRoutes = async () => {
            const markdownRoutes = await loadMarkdownFiles(); // Wait for the Promise to resolve

            // Update routes state
            setRoutes(markdownRoutes);

            // Dynamically add Markdown links to the internal links array (avoid duplicates)
            const markdownLinks = markdownRoutes.map(({ path }) => ({
                to: path,
                label: toTitleCase(path.replace("/", "")), // Generate a readable Title Case label
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
                    ), // Avoid duplicate links
                ],
            }));

            setLoading(false); // Set loading to false once routes are loaded
        };

        fetchRoutes();
    }, []);

    // Show a loading spinner or placeholder while routes are loading
    if (loading) {
        return <div>Loading...</div>;
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root links={links} />, // Pass updated links dynamically
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
