'use client';

import { signIn } from 'next-auth/react';

const LoginForm = () => {
  const loginWithGoogle = () => signIn('google');

  return (
    <div className='flex w-full justify-center'>
      <div className='lg:w-1/4 md:w-1/3 sm:w-2/3 min-w-min p-2 border border-gray-100 rounded-md'>
        <p className='pb-2 font-semibold'>Login:</p>
        <button onClick={loginWithGoogle} className='flex w-full min-w-min my-5 p-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-s-sm justify-center'>
          <div className='flex flex-row items-center'>
            <div className='flex mr-3 h-6 w-6 border-2 border-black rounded-2xl justify-center items-center font-semibold'>G</div>
            Login with Google
          </div>
        </button>
      </div>
    </div>
  );
}

export default LoginForm
