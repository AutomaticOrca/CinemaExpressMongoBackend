import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";

import NavLink from "../components/Navigation/NavLinks";

const CommonLayout = ({ children }) => {
  const auth = useContext(AuthContext);

  return (
    <div className="bg-creamy min-h-screen flex flex-col">
      <header>
        <div className="bg-ritzHeaderPink flex justify-end">
          {!auth.isLoggedIn ? (
            <Link to="/auth" className="mr-4">
              SIGN IN
            </Link>
          ) : (
            <Link to="/user-profile" className="mr-4">
              MY
            </Link>
          )}
        </div>
        <nav className="flex justify-between items-center m-2 p-4">
          <NavLink to="/" title="Now Showing" />
          <NavLink to="/" title="Coming Soon" />
          <NavLink to="/" title="Theatres" />
          <Link
            to="/"
            className="mr-4 font-playwrite text-3xl transition-colors duration-300 hover:text-warmGold px-2 py-1 rounded"
          >
            Paradiso
          </Link>
          <NavLink to="/" title="Find a Movie" />
          <NavLink to="/" title="Reviews" />
          <NavLink to="/" title="About Us" />
        </nav>
        <div className="border-t-4 border-ritzHeaderPink"></div>
      </header>
      <main className="flex-grow pt-16 p-4">{children}</main>
      <footer className="bg-ritzBgBlue text-white p-4 text-center mt-auto">
        &copy; Copyright 2024 Cinema Paradiso
      </footer>
    </div>
  );
};

export default CommonLayout;
