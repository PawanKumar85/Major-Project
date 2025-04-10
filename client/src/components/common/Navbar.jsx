import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`sticky top-0 z-50 flex h-16 items-center justify-center border-b border-richblack-700 shadow-md ${
        location.pathname !== "/" ? "bg-richblack-800" : "bg-transparent"
      } transition-all duration-300`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold text-3xl">
            EduSphere
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Navigation links */}
          <nav className="hidden md:block">
            <ul className="flex gap-x-6 text-richblack-25">
              {NavbarLinks.map((link, index) => (
                <li key={index} className="relative group">
                  {link.title === "Catalog" ? (
                    <div
                      className={`flex cursor-pointer items-center gap-1 transition-colors duration-200 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-blue-300"
                          : "text-richblack-25"
                      }`}
                    >
                      <p className="hover:text-blue-200 transition-all">
                        {link.title}
                      </p>
                      <BsChevronDown />

                      {/* Dropdown */}
                      <div className="invisible absolute left-[50%] top-[100%] z-[1000] w-[250px] -translate-x-[50%] translate-y-2 transform rounded-md bg-richblack-5 px-4 py-3 text-richblack-900 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded bg-richblack-5" />
                        {loading ? (
                          <p className="text-center text-sm">Loading...</p>
                        ) : subLinks && subLinks.length ? (
                          subLinks
                            .filter((sub) => sub?.courses?.length > 0)
                            .map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="block rounded-md px-3 py-2 text-sm hover:bg-richblack-100 transition-all"
                                key={i}
                              >
                                {subLink.name}
                              </Link>
                            ))
                        ) : (
                          <p className="text-center text-sm">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`transition-all hover:text-blue-200 ${
                          matchRoute(link?.path)
                            ? "text-blue-300"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Cart / Auth Buttons / Profile */}
          <div className="hidden items-center md:flex gap-3">
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-blue-200">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {!token && (
              <>
                <Link to="/login">
                  <button className="rounded-md border border-richblack-700 bg-richblack-800 px-4 py-2 text-sm text-richblack-100 transition-all hover:bg-richblack-700">
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-md border border-richblack-700 bg-richblack-800 px-4 py-2 text-sm text-richblack-100 transition-all hover:bg-richblack-700">
                    Sign up
                  </button>
                </Link>
              </>
            )}
            {token && <ProfileDropdown />}
          </div>
        </div>

        {/* Mobile Menu */}
        <button className="mr-4 p-2 rounded-md hover:bg-richblack-700 transition md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
