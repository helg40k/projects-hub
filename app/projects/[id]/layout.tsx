'use client';

import {ReactNode} from "react";
import Subtabs from '@/app/ui/subtabs';

const tabs = ['info', 'team', 'documents', 'logs']

const Layout = ({ params, children }: { params:{ id:string }, children: ReactNode }) => {
  const id = params.id;

  return (
    <>
      {`PROJECT ${id}`}
      <Subtabs tabs={tabs} parentPath={`projects/${id}`} />
      {children}
    </>
  );
}

export default Layout;
