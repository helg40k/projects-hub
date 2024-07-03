// import Image from 'next/image';
import Link from "next/link";

const Logo = () => {
  return (
    <div className='flex flex-row items-center md:justify-center justify-start leading-none text-white' >
      {/*<Image*/}
      {/*  src="/logo.svg"*/}
      {/*  width={50}*/}
      {/*  height={50}*/}
      {/*  className="hidden md:block"*/}
      {/*  alt="Logo"*/}
      {/*/>*/}
      <p className="lg:text-2xl md:text-xl font-semibold">ProjectsHub</p>
    </div>
  );
}

export default Logo
