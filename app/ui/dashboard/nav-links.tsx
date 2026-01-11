'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Overview', href: '/dashboard', icon: '/assets/images/icon-nav-overview.svg' },
  { name: 'Transaction', href: '/dashboard/transactions', icon: '/assets/images/icon-nav-transactions.svg' },
  { name: 'Budgets', href: '/dashboard/budgets', icon: '/assets/images/icon-nav-budgets.svg' },
  { name: 'Pots', href: '/dashboard/pots', icon: '/assets/images/icon-nav-pots.svg' },
  { name: 'Recurring Bills', href: '/dashboard/recurring-bills', icon: '/assets/images/icon-recurring-bills.svg' },
];




export default function NavLinks() {
  const pathname = usePathname();

  return (
    
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
           className={clsx(
              // Base styles
              'group flex h-[48px] grow items-center justify-center gap-2 rounded-r-xl p-3 text-sm font-medium transition-all md:flex-none md:justify-start md:p-2 md:px-3',
              // Default (Inactive) state
              'bg-[#201F24] text-[#B3B3B3] hover:bg-[#F8F4F0] hover:text-[#201F24]',
              {
                // Active state: White background, dark text, and the GREEN LINE
                'bg-[#F8F4F0] text-[#201F24] border-l-4 border-[#277C78]': isActive,
                // Inactive state: No border
                'border-l-4 border-transparent': !isActive,
              }
            )}
          >
            <div
              className={clsx(
                'transition-colors duration-200',
                // Apply the green color based on your logic
                pathname === link.href
                  ? 'bg-[#277C78]'
                  : 'bg-white group-hover:bg-[#277C78]'
              )}
              style={{
                width: '15px',
                height: '15px',
                // This creates the "cutout" effect using your SVG path
                maskImage: `url(${link.icon})`,
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                maskSize: 'contain',
                WebkitMaskImage: `url(${link.icon})`,
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                WebkitMaskSize: 'contain',
              }}
            />
            <p className="hidden md:block ">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
