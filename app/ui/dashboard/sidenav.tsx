import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <nav
      className="
        fixed bottom-0 left-0 z-50
        flex w-full items-center justify-around
        border-t bg-white px-3 py-2
        md:static md:h-full md:w-full md:flex-col md:justify-start md:border-none
      "
    >
      {/* Logo — hidden on mobile */}
      <Link
        href="/"
        className="hidden md:flex mb-4 h-20 items-end justify-start rounded-md bg-blue-600 p-4"
      >
        <div className="w-32 text-white">
          <AcmeLogo />
        </div>
      </Link>

      {/* Links */}
      <div className="flex w-full justify-around md:flex-col md:space-y-2">
        <NavLinks />
      </div>

      {/* Sign out */}
      <form className="hidden md:block mt-auto w-full">
        <button className="flex h-[48px] w-full items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600">
          <PowerIcon className="w-6" />
          <span>Sign Out</span>
        </button>
      </form>
    </nav>
  );
}

