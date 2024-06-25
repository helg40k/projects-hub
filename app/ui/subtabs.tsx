'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const Subtabs = ({ tabs, parentPath }: { tabs:string[], parentPath:string }) => {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-row my-4">
      <div className="flex grow flex-row justify-between">
        {tabs.map((tab, index) => {
          const link = `/${parentPath}/${tab}`
          console.log(link)
          return (
            <Link
              key={tab}
              href={link}
              className={clsx(
                "flex grow items-center justify-center gap-2 p-3 font-medium text-sm hover:bg-gray-400 hover:text-cyan-300",
                {
                  'rounded-l-md': index === 0,
                },
                {
                  'bg-gray-400 text-cyan-300': pathname.includes(tab),
                },
                {
                  'bg-gray-300 text-gray-700': !pathname.includes(tab),
                }
              )}
            >
              <p className="hidden md:block uppercase">{tab}</p>
            </Link>
          )
        })}
        <div className="h-auto w-full grow rounded-r-md bg-gray-300"></div>
      </div>
    </div>
  );
}

export default Subtabs
