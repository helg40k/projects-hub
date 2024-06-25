import ProjectTable from '@/app/ui/projects/project-table'

const Page = async () => {
  return (
    <>
      <input type='text' inputMode='text' placeholder='Search...' disabled={true} title='disabled'
             className='w-60 mb-2 p-1 rounded-sm text-sm border-2 border-gray-300 placeholder-shown:text-gray-500'/>
      <ProjectTable/>
    </>
  )
}

export default Page
