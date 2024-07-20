import { Link } from "react-router-dom";

function NavLink({ to, title }) {
  return (
    <Link to={to} className="group relative font-raleway">
      <span className="absolute top-[-2px] left-1/2 w-0 h-0.5 bg-ritzHeaderPink transition-all duration-500 group-hover:w-full group-hover:left-0"></span>
      {title}
    </Link>
  );
}

export default NavLink;
