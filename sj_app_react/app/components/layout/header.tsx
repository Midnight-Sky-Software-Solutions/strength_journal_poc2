import { Bars3Icon, UserCircleIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

const navItems = [
  { name: 'Dashboard', href: '' },
  { name: 'Exercises', href: '/exercises' },
  { name: 'Workouts', href: '/workouts' },
]

export default function Header() {
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setShowNav(false);
  }, [location]);
  return (
    <div className="w-full flex justify-center bg-white">
      <div className="grow max-w-6xl px-2 py-1">

        <div className="flex">
          <button
            className="sm:hidden"
            onClick={() => setShowNav(!showNav)}
          >
            <Bars3Icon className="h-12" />
          </button>
          <ul className="hidden sm:flex flex-row gap-5 items-center">
            {navItems.map(navItem => (
              <li key={navItem.name} className="text-xl font-medium"><NavLink to={navItem.href}>{navItem.name}</NavLink></li>
            ))}
          </ul>
          <div className="grow"></div>
          <UserCircleIcon className="h-12" />
        </div>

        {showNav && (
          <ul className="flex flex-col items-center gap-3 py-2 sm:hidden">
            {navItems.map(navItem => (
              <li key={navItem.name} className="text-lg font-medium"><Link to={navItem.href}>{navItem.name}</Link></li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}