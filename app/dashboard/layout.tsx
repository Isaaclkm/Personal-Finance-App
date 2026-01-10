import SideNav from '@/app/ui/dashboard/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Sidebar (desktop) */}
      <div className="hidden md:block md:w-64">
        <SideNav />
      </div>

      {/* Main content */}
      <div className="grow overflow-y-auto p-6 md:p-12 pb-20 md:pb-12">
        {children}
      </div>

      {/* Bottom nav (mobile) */}
      <div className="md:hidden">
        <SideNav />
      </div>
    </div>
  );
}
