<<<<<<< Updated upstream
import '@/app/ui/global.css';
import SideNav from '@/app/ui/sidenav'; // Az önce yaptığımız menüyü çağırıyoruz
=======
import '@/app/ui/global.css'; // Sadece bu satırı ekliyoruz!
>>>>>>> Stashed changes

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-50">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow md:overflow-y-auto">
          {children}
        </div>
      </body>
    </html>
  );
}