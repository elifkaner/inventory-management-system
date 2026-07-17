import '@/app/ui/global.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr">
            <body className="bg-gray-50 text-slate-800 font-sans">
                {children}
            </body>
        </html>
    );
}