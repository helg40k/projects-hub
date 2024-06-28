import "@/app/ui/globals.css";
import { inter } from '@/app/ui/fonts';
import type { Metadata } from "next";
import MainTabs from '@/app/ui/main-tabs';

const tabs = ['projects', 'opportunities', 'customers', 'documents']

export const metadata: Metadata = {
  title: "ProjectsHub",
  description: "The ProjectsHub application to manage projects and opportunities",
};

const RootLayout = ({
                      children,
                    }: Readonly<{children: React.ReactNode}>) => {

  return (
    <html lang="en">
    <body className={`${inter.className} antialiased`}>
      <MainTabs tabs={tabs} />
      <main className="flex min-h-screen flex-col m-4">
        {children}
      </main>
    </body>
    </html>
);
}

export default RootLayout
