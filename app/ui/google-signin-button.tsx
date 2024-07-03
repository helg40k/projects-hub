'use client';

import { FC, ReactNode } from 'react';
import { signIn } from 'next-auth/react';

interface GoogleSignInButtonProps {
  children?: ReactNode;
}

const GoogleSignInButton:FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = () => signIn('google', {callbackUrl: 'http://localhost:3000/projects'})

  return (
    <button onClick={loginWithGoogle} className='w-full bg-amber-200'>
      {children}
    </button>
  );
}

export default GoogleSignInButton;
