import "@/app/ui/globals.css";
import { inter } from '@/app/ui/fonts';
import {ReactNode} from "react";
import type { Metadata } from "next";
import {NextUIProvider} from "@nextui-org/react";
import MainTabs from '@/app/ui/main-tabs';
import { MAIN_TABS } from '@/app/lib/constants/tab-menu';

export const metadata: Metadata = {
  title: "ProjectsHub",
  description: "The ProjectsHub application to manage projects and opportunities",
};

const RootLayout = ({
                      children,
                    }: Readonly<{children: ReactNode}>) => {

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NextUIProvider>
          <MainTabs tabs={MAIN_TABS} />
          <main className="flex min-h-screen flex-col m-4">
            {children}
          </main>
        </NextUIProvider>
      </body>
    </html>
  );
}

export default RootLayout
