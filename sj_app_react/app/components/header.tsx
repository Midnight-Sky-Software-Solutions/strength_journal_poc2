import { Bars3Icon, UserCircleIcon } from "@heroicons/react/16/solid";

export default function Header() {
  return (
    <div className="w-full flex justify-center">
      <div className="bclass-name grow max-w-6xl flex px-3 py-1">

        <Bars3Icon  className="h-12" />
        <div className="grow"></div>
        <UserCircleIcon className="h-12" />

      </div>
    </div>
  );
}