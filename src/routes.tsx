import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import CocktailInfoPage from "./pages/CocktailInfoPage";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <LandingPage /> },
            { path: "search", element: <SearchPage /> },
            { path: "cocktail/:id", element: <CocktailInfoPage /> },
        ],
    },
]);