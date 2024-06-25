'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/app/ui/logo';
import clsx from 'clsx';

const MainTabs = ({ tabs }: { tabs:string[] }) => {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-row m-4">
      <div className="w-60 p-4 justify-center items-end rounded-l-md bg-gray-500">
        <Logo />
      </div>
      <div className="flex grow flex-row justify-between">
        {tabs.map((tab) => {
          const link = `/${tab}`
          return (
            <Link
              key={tab}
              href={link}
              className={clsx(
                "flex grow items-center justify-center gap-2 p-4 font-medium hover:bg-gray-600 hover:text-cyan-400",
                {
                  'bg-gray-600 text-cyan-400': pathname.includes(link),
                },
                {
                  'bg-gray-500 text-white': !pathname.includes(link),
                }
              )}
            >
              <p className="hidden md:block uppercase">{tab}</p>
            </Link>
          )
        })}
        <div className="h-auto w-full grow rounded-r-md bg-gray-500"></div>
      </div>
    </div>
  );
}

export default MainTabs
