import {FC, ReactNode} from "react";
import MainTabs from '@/app/ui/main-tabs';
import { MAIN_TABS } from '@/app/lib/constants/tab-menu';

interface LayoutProps {
  children?: ReactNode;
}

const Layout:FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <MainTabs tabs={MAIN_TABS} />
      <main className="flex min-h-screen flex-col m-4">
        {children}
      </main>
    </>
  );
}

export default Layout;
