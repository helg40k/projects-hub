'use client';

import {ReactNode} from "react";
import ProjectStatus from '@/app/ui/projects/project-status';
import Subtabs from '@/app/ui/subtabs';
import Spin from '@/app/lib/spin';
import useGetProject from "@/app/lib/hooks/use-get-project";

const tabs = ['info', 'team', 'documents', 'logs']

const Layout = ({ params, children }: { params:{ id:string }, children: ReactNode }) => {
  const id = params.id;
  const [project, loading, error] = useGetProject(id);

  return (
    <>
      {!loading && (
        <>
          <ProjectStatus project={project} />
          <Subtabs tabs={tabs} parentPath={`projects/${id}`} />
        </>
      )}
      {loading && (
        <Spin/>
      )}
      {children}
    </>
  );
}

export default Layout;
