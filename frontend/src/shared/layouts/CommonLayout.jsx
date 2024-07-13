import React from "react";
import { Link } from "react-router-dom";
import NavLink from "../UIElements/NavLink";

const CommonLayout = ({ children }) => {
  return (
    <div className="bg-creamy min-h-screen flex flex-col">
      <header>
        <div className="bg-ritzHeaderPink flex justify-end">
          <Link to="/" className="mr-4">
            Register
          </Link>
          <Link to="/" className="mr-4">
            Sign In
          </Link>
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
