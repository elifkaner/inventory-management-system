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
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-50">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow md:overflow-y-auto">
          {children}
        </div>
      </div>
    </AuthGuard>
  );
}