import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { NavLink, Outlet } from "react-router";
import { Menu, X } from "lucide-react";
import Logo from "../../components/shared/Logo";

const navItems = [
  { name: "Home", path: "/dashboard/home" },
  { name: "Profile", path: "/dashboard/profile" },
  { name: "Orders", path: "/dashboard/orders" },
  { name: "Settings", path: "/dashboard/settings" },
  // Add more routes as needed
];

const getNavLinkClass = ({ isActive }) =>
  `block w-full px-4 py-2 rounded-md text-sm font-medium transition-all ${
    isActive
      ? "bg-accent text-white"
      : "text-gray-700 hover:bg-accent hover:text-white"
  }`;

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-gray-100">
      {/* Mobile Sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="flex w-64 flex-col space-y-4 bg-green-50 p-4 dark:bg-gray-50">
                <div className="flex items-center justify-between">
                  <Logo />
                  <button onClick={() => setSidebarOpen(false)}>
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex-1">
                  <ul className="space-y-1">
                    {navItems.map(({ name, path }) => (
                      <li key={path}>
                        <NavLink
                          to={path}
                          className={getNavLinkClass}
                          onClick={() => setSidebarOpen(false)}
                        >
                          {name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-green-50 p-4 md:flex dark:bg-gray-50">
        <div className="pb-6">
          <Logo />
        </div>
        <nav className="flex-1">
          <ul className="space-y-1">
            {navItems.map(({ name, path }) => (
              <li key={path}>
                <NavLink to={path} className={getNavLinkClass}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex items-center gap-3 rounded-md bg-gray-200 p-3">
          <img
            src="https://source.unsplash.com/100x100/?portrait"
            alt="User"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <h2 className="text-sm font-semibold">Leroy Jenkins</h2>
            <a href="#" className="text-xs text-gray-600 hover:underline">
              View profile
            </a>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Top Bar */}
        <header className="flex items-center justify-between border-b p-4 md:hidden">
          <Logo />
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </header>

        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
