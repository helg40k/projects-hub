import {ArrowPathIcon} from '@heroicons/react/24/outline';

const Spin = () => {
  return (
    <div className='flex text-gray-600 justify-center p-2 m-2'>
      <ArrowPathIcon className='w-5 h-5 border-0 animate-spin'/>
      <p className='ml-1' >Loading...</p>
    </div>
  )
}

export default Spin
