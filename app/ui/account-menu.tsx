import {UserIcon} from '@heroicons/react/24/outline';
import Dropdown from "@/app/lib/dropdown";
import {ACCOUNT_MENU} from '@/app/lib/constants/dropdown-menu';
import {useSession} from "next-auth/react";
import { useMemo } from 'react';

const AccountMenu = () => {
  const {data, status, update } = useSession();

  const userName = useMemo(
    () => 'authenticated' === status && data?.user?.name ? data.user.name : 'anonymous',
    [status, data]);
  const icon = useMemo(
    () => 'authenticated' === status && data?.user?.image ? data.user.image : null,
    [status, data]);

  return (
    <div className='flex h-full w-min mr-2 justify-end items-center active:bg-gray-600'>
      <Dropdown items={ACCOUNT_MENU} >
        <div className='flex flex-col justify-center items-center gap-0 md:gap-1 content-between text-white'>
          {icon && (
            <img alt='Account icon' src={icon} className='w-7 h-7' />
          )}
          {!icon && (
            <UserIcon className='w-5 h-5 md:w-6 md:h-6' />
          )}
          <p className='text-sm'>{userName}</p>
        </div>
      </Dropdown>
    </div>
  );
}

export default AccountMenu;
