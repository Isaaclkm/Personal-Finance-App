import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { publicSans } from '../fonts';
import Image from 'next/image';
import { signOut } from '@/auth';
import logo from '../../../public/assets/images/logo-large.svg'

export default function SideNav() {
  return (
    <nav
      className="
        fixed bottom-0 left-0 z-50
        flex w-full items-center justify-around
        border-t bg-[#201F24] pr-3 py-2
        md:static md:h-full md:w-[80%] md:flex-col md:justify-start md:border-none
      "
    >
      {/* Logo — hidden on mobile */}
      <Link
        href="/"
        className="hidden md:flex mb-1 h-10 items-end justify-start rounded-r-md p-r-1"
      >
        <div className="w-32 m-3 text-[#B3B3B3]">
          <Image 
          src={logo}
          width= {75}
          height = {65}
          alt= "logo"
          />      
        </div>
      </Link>

      {/* Links */}
      <div className="flex w-full justify-around pl-2 mt-3 md:flex-col md:space-y-2">
        <NavLinks />
      </div>

      {/* Sign out */}
      <form className="hidden md:block mt-auto w-full"
        action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}>
        <button className="flex h-[48px] w-full items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600">
          <PowerIcon className="w-6" />
          <span>Sign Out</span>
        </button>
      </form>
    </nav>
  );
}

