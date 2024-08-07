'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/app/ui/logo';
import AccountMenu from '@/app/ui/account-menu';
import clsx from 'clsx';
import { SessionProvider } from 'next-auth/react';

const MainTabs = ({ tabs }: { tabs:string[] }) => {
  const pathname = usePathname();
  const isRootPage = '/' === pathname || !pathname;

  return (
    <div className="flex h-full md:flex-row flex-col m-4">
      <SessionProvider>
        {isRootPage ? (
          <>
            <div className="lg:w-60 md:w-48 md:justify-center justify-start items-end md:rounded-l-md md:rounded-r-none rounded-t-md bg-gray-500 border-b border-gray-600">
              <Logo/>
            </div>
            <div className="flex grow md:flex-row flex-col justify-between">
              <div className="hidden md:block h-auto w-full grow rounded-r-md bg-gray-500" />
            </div>
          </>
        ) : (
          <>
            <div
              className="flex lg:w-60 md:w-48 md:justify-center justify-start md:rounded-l-md md:rounded-r-none rounded-t-md bg-gray-500 border-b border-gray-600">
              <Logo/>
              <div className="md:hidden block h-auto w-full bg-gray-500"/>
              <div className="md:hidden flex h-12 min-w-24 rounded-r-md rounded-b-none bg-gray-500 justify-end">
                <AccountMenu />
              </div>
            </div>
            <div className="flex grow md:flex-row flex-col justify-between">
            {tabs.map((tab, index) => {
                const link = `/${tab}`
                const isLastItem = tabs.length - 1 === index
                const isSelected = pathname === link || pathname?.includes(`${link}/`)
                return (
                  <Link
                    key={tab}
                    href={link}
                    className={clsx(
                      "flex grow items-center md:justify-center justify-start lg:p-4 md:p-2 p-1 pl-4 font-medium hover:bg-gray-600 hover:text-cyan-400 md:rounded-b-none",
                      {
                        'bg-gray-600 text-cyan-400': isSelected,
                      },
                      {
                        'bg-gray-500 text-white': !isSelected,
                      },
                      {
                        'rounded-b-md': isLastItem,
                      }
                    )}
                  >
                    <p className="uppercase">{tab}</p>
                  </Link>
                )
              })}
              <div className="hidden md:block h-auto w-full grow bg-gray-500" />
              <div className="hidden md:flex h-auto min-w-24 grow rounded-r-md bg-gray-500 justify-end">
                <AccountMenu />
              </div>
            </div>
          </>
        )}
      </SessionProvider>
    </div>
  );
}

export default MainTabs
