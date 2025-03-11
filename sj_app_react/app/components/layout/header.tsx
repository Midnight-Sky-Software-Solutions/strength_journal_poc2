import { Bars3Icon, UserCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Link } from "react-router";

const navItems = [
  { name: 'Dashboard', href: '' },
  { name: 'Exercises', href: '/exercises' },
  { name: 'Workouts', href: '/workouts' },
]

export default function Header() {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="w-full flex justify-center bg-white">
      <div className="grow max-w-6xl px-2 py-1">

        <div className="flex">
          <button
            onClick={() => setShowNav(!showNav)}
          >
            <Bars3Icon className="h-12" 
            />
          </button>
          <div className="grow"></div>
          <UserCircleIcon className="h-12" />
        </div>

        {showNav && (
          <ul className="flex flex-col items-center gap-3 py-2">
            {navItems.map(navItem => (
              <li key={navItem.name} className="text-lg font-medium"><Link to={navItem.href}>{navItem.name}</Link></li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}