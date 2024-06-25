'use client';

import Subtabs from '@/app/ui/subtabs';

const tabs = ['team', 'info', 'documents', 'logs']

export default function Layout({ params, children }: { params:{ id:string }, children: React.ReactNode }) {
  const id = params.id;

  return (
    <>
      {`PROJECT ${id}`}
      <Subtabs tabs={tabs} parentPath={`projects/${id}`} />
      {children}
    </>
  );
}
