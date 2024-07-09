import {UserIcon} from '@heroicons/react/24/outline';
import Dropdown from "@/app/lib/dropdown";
import {ACCOUNT_MENU} from '@/app/lib/constants/dropdown-menu';

const AccountMenu = () => {
  return (
    <div className='flex h-full w-min mr-2 justify-end items-center active:bg-gray-600'>
      <Dropdown items={ACCOUNT_MENU} >
        <div className='flex flex-col justify-center items-center gap-0.5 md:gap-1 content-between text-white'>
          <UserIcon className='w-5 h-5 md:w-6 md:h-6' />
          <p className='text-sm'>NAME</p>
        </div>
      </Dropdown>
    </div>
  );
}

export default AccountMenu;
