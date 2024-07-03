// import Image from "next/image";
import Logo from '@/app/ui/logo';
import Link from "next/link";
import StartHeader from '@/app/ui/start-header';
import GoogleSignInButton from '@/app/ui/google-signin-button'

const AUTH_URL = process.env.NEXTAUTH_URL!;

const Home = () => {
  const callbackAuthUrl = `${AUTH_URL}/projects`;
  return (
    <>
      <StartHeader />
      <main className="flex min-h-screen flex-col p-6">
        <GoogleSignInButton callbackAuthUrl={callbackAuthUrl}>LOGIN</GoogleSignInButton>
        {/*<div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-16">*/}
        {/*  <Logo/>*/}
        {/*</div>*/}
        {/*<Link*/}
        {/*  key='Link1'*/}
        {/*  href='/'*/}
        {/*  className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"*/}
        {/*>*/}
        {/*  <p className="hidden md:block">TEST</p>*/}
        {/*</Link>*/}
      </main>
    </>
  );
}

export default Home
