'use client';

import useLoadProjectList from "@/app/lib/hooks/use-load-project-list";
import {useState, useMemo, useCallback, Key, ReactElement} from "react";
import { useRouter } from 'next/navigation'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Input
} from "@nextui-org/react";
import {Project} from "@/app/lib/constants/definitions";
import {CheckIcon, XMarkIcon, MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import Spin from '@/app/lib/spin';

const columns = [
  { key: "code" },
  { key: "name" },
  { key: "manager" },
  { key: "upwork" },
  { key: "status" }
];

const ProjectTable = () => {
  const [filterValue, setFilterValue] = useState<string>('');
  const [projects, loading, error] = useLoadProjectList();
  const router = useRouter();

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredProjects:Project[] = projects.items;
    if (hasSearchFilter) {
      const searchString:string = filterValue.toLowerCase();
      filteredProjects = filteredProjects.filter((project) =>
          project.code?.toLowerCase().includes(searchString) ||
          project.name?.toLowerCase().includes(searchString) ||
          project.manager?.toLowerCase().includes(searchString)
      );
    }
    return filteredProjects;
  }, [projects, filterValue, hasSearchFilter]);

  const renderCell = useCallback((project: Project, columnKey: Key):ReactElement|string|undefined => {
    const cellValue = project[columnKey as keyof Project];
    switch (columnKey) {
      case 'upwork':
        const isBoolean = typeof cellValue === 'boolean';
        return (
          isBoolean
          ? cellValue
            ? <CheckIcon className='w-5 h-5 border rounded-xl text-white bg-green-600 border-green-600' />
            : <XMarkIcon className='w-5 h-5 border rounded-xl text-white bg-red-600 border-red-600' />
          : cellValue
        ) as ReactElement;
      default:
        return cellValue as string;
    }
  }, []);

  const handleSelect = (projectId:string) => {
    router.push(`/projects/${projectId}`);
  };

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      // setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  return (
      <>
        <Input
            type='text'
            inputMode='text'
            placeholder='Search...'
            size='sm'
            radius='sm'
            isClearable={true}
            variant='bordered'
            disabled={false}
            startContent={<MagnifyingGlassIcon className='w-6 h-6 text-neutral-600'/>}
            className='w-60 mb-2 py-1'
            value={filterValue}
            onClear={() => setFilterValue('')}
            onValueChange={onSearchChange}
        />
        <Table removeWrapper
               aria-label='Project Table'
               sortDescriptor={projects.sortDescriptor}
               onSortChange={projects.sort}
               onRowAction={(key) => handleSelect(key as string)}>
          <TableHeader columns={columns}>
            {(header) =>
                <TableColumn key={header.key} className='uppercase font-bold text-sm'
                             allowsSorting>{header.key}</TableColumn>}
          </TableHeader>
          <TableBody
              items={filteredItems}
              isLoading={loading}
              emptyContent={'No projects to display'}
              loadingContent={<Spin/>}
          >
            {(item) => (
                <TableRow key={item._id} className='hover:bg-sky-50 active:bg-sky-100'>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
            )}
          </TableBody>
        </Table>
      </>
  )
}

export default ProjectTable
