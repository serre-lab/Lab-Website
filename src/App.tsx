// import './App.css'
import '@mantine/core/styles.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import { 
  createTheme,
  // createTheme,
   MantineProvider } from '@mantine/core';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Header from './components/Header/Header';

//add theme to provider if you want to customize

const theme = createTheme({
  fontFamily: 'futura-pt',
})

const router = createBrowserRouter(
  [
    { path: "/", element: <Home />},
    { path: "/about", element: <About />}
  ]
)

function App() {
  
  return (
    <MantineProvider theme={theme} >
      <Header />
      <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default App
