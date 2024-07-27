import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";

import NavLink from "../components/Navigation/NavLinks";

const CommonLayout = ({ children }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const isNowShowingPage = location.pathname === "/nowshowing";
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
        <nav className="flex justify-between items-center m-2 p-4  mx-auto max-w-screen-2xl">
          <Link
            to="/"
            className="mr-4 font-playwrite text-3xl transition-colors duration-300 hover:text-warmGold px-2 py-1 rounded"
          >
            Paradiso
          </Link>
          <NavLink to="/nowshowing" title="Now Showing" />
          <NavLink to="/" title="Coming Soon" />
          <NavLink to="/cinemas" title="Cinemas" />

          <NavLink to="/" title="Find a Movie" />
          <NavLink to="/" title="Reviews" />
          <NavLink to="/" title="About Us" />
        </nav>
        <div className="border-t-4 border-ritzHeaderPink"></div>
      </header>
      <main
        className={`flex-grow pt-10 p-4 mx-auto ${
          isNowShowingPage ? "max-w-screen-lg" : "max-w-screen-xl"
        }`}
      >
        {children}
      </main>
      <footer className="bg-ritzBgBlue text-white p-4 text-center mt-auto">
        &copy; Copyright 2024 Cinema Paradiso
      </footer>
    </div>
  );
};

export default CommonLayout;
