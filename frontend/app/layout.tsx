import '@/app/ui/global.css';

import { ThemeProvider } from '@/app/ui/theme-provider';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr" suppressHydrationWarning>
            <body className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}