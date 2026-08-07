import '@/app/ui/global.css';
import SideNav from '@/app/ui/sidenav';
import AuthGuard from '@/app/ui/auth-guard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-brand-surface dark:bg-slate-900 transition-colors duration-200">
        <div className="w-full flex-none md:w-[300px] md:py-4 md:px-6 md:pr-2">
          <SideNav />
        </div>
        <div className="flex-grow md:overflow-y-auto md:py-4 md:px-6 md:pl-4">
          {children}
        </div>
      </div>
    </AuthGuard>
  );
}