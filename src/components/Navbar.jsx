import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Logo from "./shared/Logo";
import Button from "./Button/Button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto w-11/12 max-w-7xl">
        <div className="flex h-20 items-center justify-between">
          {/* Logo and Site Name */}
          <Logo />

          {/* Desktop Menu */}
          <ul className="hidden space-x-8 font-medium text-gray-700 md:flex">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-accent text-accent"
                    : "duration-300 hover:text-accent"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-accent text-accent"
                    : "duration-300 hover:text-accent"
                }
              >
                Community
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-accent text-accent"
                    : "duration-300 hover:text-accent"
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/trips"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-accent text-accent"
                    : "duration-300 hover:text-accent"
                }
              >
                Trips
              </NavLink>
            </li>
          </ul>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Desktop Auth Buttons / User Dropdown */}
            <div className="relative hidden items-center md:flex">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="mr-5 font-semibold text-accent underline-offset-8 transition-all duration-300 hover:underline"
                  >
                    Login
                  </Link>
                  <Link to="/register">
                    <Button>Register</Button>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setDropdownOpen((open) => !open)}
                    className="focus:outline-none"
                  >
                    <img
                      src={user.photoURL || "/default-profile.png"}
                      alt="User profile"
                      className="h-10 w-10 rounded-full border-2 border-accent"
                    />
                  </button>

                  {dropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 z-50 mt-2 w-56 rounded-md bg-white py-3 font-medium text-gray-700 shadow-lg"
                    >
                      <div className="mb-2 border-b border-gray-200 px-4">
                        <p className="truncate font-semibold">
                          {user.displayName}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {user.email}
                        </p>
                      </div>

                      <ul>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={() => setDropdownOpen(false)}
                            className="block px-4 py-2 hover:bg-indigo-100"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/offer-announcements"
                            onClick={() => setDropdownOpen(false)}
                            className="block px-4 py-2 hover:bg-indigo-100"
                          >
                            Offer Announcements
                          </Link>
                        </li>
                      </ul>

                      <div className="mt-2 border-t border-gray-200 px-4 pt-2">
                        <button
                          onClick={() => {
                            logout();
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left text-red-600 hover:text-red-800"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-accent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
              >
                {/* Hamburger icon */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="bg-white shadow-lg md:hidden">
          <ul className="flex flex-col space-y-3 px-4 pt-4 pb-6 font-medium text-gray-700">
            <li>
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-accent pb-1 text-accent" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-accent pb-1 text-accent" : ""
                }
              >
                Community
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-accent pb-1 text-accent" : ""
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/trips"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-accent pb-1 text-accent" : ""
                }
              >
                Trips
              </NavLink>
            </li>

            {!user ? (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-semibold text-accent hover:underline"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded bg-accent px-4 py-1 text-white transition hover:bg-indigo-700"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="border-t border-gray-200 pt-3">
                  <p className="truncate font-semibold">{user.displayName}</p>
                  <p className="truncate text-sm text-gray-500">{user.email}</p>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded px-2 py-1 hover:bg-indigo-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/offer-announcements"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded px-2 py-1 hover:bg-indigo-100"
                  >
                    Offer Announcements
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full rounded px-2 py-1 text-left text-red-600 hover:text-red-800"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
