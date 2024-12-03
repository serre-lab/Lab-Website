// import './App.css'
import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
    createTheme,
    // createTheme,
    MantineProvider,
} from "@mantine/core";

import { Home } from "./pages/Home/Home";
import { Research } from "./pages/Research/Research";
import { Resources } from "./pages/Resources/Resources";
import { Publications } from "./pages/Publications/Publications";
import People from "./pages/People/People";

import { Root } from "./components/Root"; // Adjust the path as necessary
import { Links } from "./types";

//add theme to provider if you want to customize
const theme = createTheme({
    fontFamily: "futura-pt",
});

// for future devs: header and footer links can be updated here
const links: Links = {
    internal: [
        { to: "/", label: "Home" },
        { to: "/research", label: "Research" },
        { to: "/publications", label: "Publications" },
        { to: "/people", label: "People" },
        // { to: "/about", label: "About" },
        { to: "/resources", label: "Resources" },
        // { to: "/scicomm", label: "Sci-Comm" },
    ],
    social: [
        { to: "https://twitter.com/serre_lab", label: "Twitter" },
        { to: "https://www.linkedin.com/company/serre-lab", label: "LinkedIn" },
    ],
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root links={links} />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/research", element: <Research /> },
            { path: "/publications", element: <Publications /> },
            { path: "/people", element: <People /> },
            { path: "/resources", element: <Resources /> },
        ],
    },
]);

const App = () => (
    <MantineProvider theme={theme}>
        <RouterProvider router={router} />
    </MantineProvider>
);

export default App;
