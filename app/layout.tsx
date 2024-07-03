import "@/app/ui/globals.css";
import { inter } from '@/app/ui/fonts';
import type { Metadata } from "next";

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
      <main className="flex min-h-screen flex-col">
        {children}
      </main>
    </body>
    </html>
);
}

export default RootLayout
