// import './App.css'
import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
    createTheme,
    // createTheme,
    MantineProvider,
} from "@mantine/core";

import { Home } from "./pages/Home/Home";
import About from "./pages/About/About";
import { Research } from "./pages/Research/Research";
import { Resources } from "./pages/Resources/Resources";
import { SciComm } from "./pages/SciComm/SciComm";
import People from "./pages/People/People";

import { Root } from "./components/Root"; // Adjust the path as necessary

//add theme to provider if you want to customize

const theme = createTheme({
    fontFamily: "futura-pt",
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/research", element: <Research /> },
            { path: "/people", element: <People /> },
            // { path: "/about", element: <About /> },
            // { path: "/resources", element: <Resources /> },
            // { path: "/scicomm", element: <SciComm /> },
        ],
    },
]);

function App() {
    return (
        <MantineProvider theme={theme}>
            <RouterProvider router={router} />
        </MantineProvider>
    );
}

export default App;
