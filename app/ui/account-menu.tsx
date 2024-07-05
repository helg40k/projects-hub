import {UserIcon} from '@heroicons/react/24/outline';

const AccountMenu = () => {
  return (
    <div className='flex h-full w-min mr-2 px-2 justify-end items-center active:bg-gray-600'>
      <div className='flex flex-col justify-center items-center gap-0.5 md:gap-1 content-between text-white'>
        <UserIcon className='w-5 h-5 md:w-6 md:h-6' />
        <p className='text-sm'>NAME</p>
      </div>
    </div>
  );
}

export default AccountMenu;
