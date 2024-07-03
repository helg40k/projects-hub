import Logo from '@/app/ui/logo';

const StartHeader = () => {
  return (
    <div className="flex h-full md:flex-row flex-col m-4">
      <div className="lg:w-60 md:w-48 p-4 md:justify-center justify-start items-end md:rounded-l-md md:rounded-r-none rounded-t-md bg-gray-500 border-b border-gray-600">
        <Logo />
      </div>
      <div className="flex grow md:flex-row flex-col justify-between">
        <div className="hidden md:block h-auto w-full grow rounded-r-md bg-gray-500"></div>
      </div>
    </div>
  );
}

export default StartHeader
