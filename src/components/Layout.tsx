import { Link, Outlet } from "react-router-dom";
import FloatingDrinksBackground from "./FloatingDrinksBackground";

export default function Layout() {
  return (
    <div>
      <FloatingDrinksBackground />
      <header className="header">
        <Link to="/">Cocktail Wiki</Link>
        <Link to="/search">Search</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
