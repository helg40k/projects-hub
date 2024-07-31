import {UserIcon} from '@heroicons/react/24/outline';
import Dropdown from "@/app/lib/dropdown";
import {ACCOUNT_MENU} from '@/app/lib/constants/dropdown-menu';
import useUser from '@/app/lib/hooks/use-user';

const AccountMenu = () => {
  const { userName, iconURL } = useUser();

  return (
    <div className='flex h-full w-min mr-2 justify-end items-center active:bg-gray-600'>
      <Dropdown items={ACCOUNT_MENU} >
        <div className='flex flex-col justify-center items-center gap-0 md:gap-1 content-between text-white'>
          {iconURL && (
            <img alt='Account icon' src={iconURL} className='w-7 h-7' />
          )}
          {!iconURL && (
            <UserIcon className='w-5 h-5 md:w-6 md:h-6' />
          )}
          <p className='text-sm'>{userName}</p>
        </div>
      </Dropdown>
    </div>
  );
}

export default AccountMenu;
