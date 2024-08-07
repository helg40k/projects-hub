'use client';

import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import ProjectStatus from '@/app/ui/projects/project-status';
import useGetProject from "@/app/lib/hooks/use-get-project";
import Spin from "@/app/lib/spin";

const tabs = [
  {
    id: 'info'
  },
  {
    id: 'team'
  },
  {
    id: 'documents'
  },
  {
    id: 'logs'
  }
]

const Page = ({ params }:{ params:{ id:string } }) => {
  const id = params.id;
  const [project, loading, error] = useGetProject(id);

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
              <Tab key={item.id} title={item.id}>
                <Card radius='sm' >
                  <CardBody>
                    {item.id}
                  </CardBody>
                </Card>
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
