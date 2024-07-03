'use client';

import { FC, ReactNode } from 'react';
import { signIn } from 'next-auth/react';

interface GoogleSignInButtonProps {
  children?: ReactNode;
  callbackAuthUrl: string;
}


const GoogleSignInButton:FC<GoogleSignInButtonProps> = ({ children, callbackAuthUrl }) => {
  const loginWithGoogle = () => signIn('google', {callbackUrl: callbackAuthUrl})

  return (
    <button onClick={loginWithGoogle} className='w-full bg-amber-200'>
      {children}
    </button>
  );
}

export default GoogleSignInButton;
