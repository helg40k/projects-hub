'use client';

import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import ProjectStatus from '@/app/ui/projects/project-status';
import ProjectMetaInfoPane from '@/app/ui/projects/project-meta-info';
import useGetProject from "@/app/lib/hooks/use-get-project";
import Spin from "@/app/lib/spin";

const Page = ({ params }:{ params:{ id:string } }) => {
  const id = params.id;
  const [project, loading, error] = useGetProject(id);

  const tabs = [
    {
      id: 'info',
      content: <ProjectMetaInfoPane project={project}/>
    },
    {
      id: 'team',
      content: <div className='border rounded-md p-2'>team content</div>
    },
    {
      id: 'documents',
      content: <div className='border rounded-md p-2'>documents content</div>
    },
    {
      id: 'logs',
      content: <div className='border rounded-md p-2'>logs content</div>
    }
  ]

  return (
    <div>
      {!loading && (
        <>
          <ProjectStatus project={project} />
          <Tabs
              aria-label='Project Details'
              size='lg'
              radius='sm'
              variant='underlined'
              className='py-1 mt-2'
              items={tabs} >
            {(item) => (
              <Tab key={item.id} title={item.id} className='capitalize'>
                {item.content}
              </Tab>
            )}
          </Tabs>
        </>
      )}
      {loading && (
          <Spin/>
      )}
    </div>
  );
}

export default Page
