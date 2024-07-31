import Link from 'next/link';
import Image from "next/image";
import {ClipboardDocumentListIcon} from '@heroicons/react/24/outline';
import Spin from '@/app/lib/spin';
import useGetProjectStatus from "@/app/lib/hooks/use-get-project-status";
import useGetEmployee from "@/app/lib/hooks/use-get-employee";
import {Project} from "@/app/lib/constants/definitions";
import {NA, RED, GREEN, AMBER} from "@/app/lib/constants/rag-statuses";
import moment from "moment";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Textarea} from "@nextui-org/react";
import { useMemo, useState } from 'react';

type TaVariant = 'faded' | 'bordered';

const ProjectStatus = ({ project }:{project:Project|null}) => {
  const [statusVariant, setStatusVariant] = useState<TaVariant>('bordered');
  const [actionsVariant, setActionsVariant] = useState<TaVariant>('bordered');

  const [projectStatus, loadingProjectStatus, errorProjectStatus] = useGetProjectStatus(project?.statusId);
  const [employee, loadingEmployee, errorEmployee] = useGetEmployee(projectStatus?.reporterId);

  const projectUrl = useMemo(() => {
    return process.env.NEXT_PUBLIC_PEOPLE_FORCE_PROJECT_URL;
  }, []);
  const employeeUrl = useMemo(() => {
    return process.env.NEXT_PUBLIC_PEOPLE_FORCE_EMPLOYEE_URL;
  }, []);

  const loading = useMemo(() => {
    return loadingProjectStatus && loadingEmployee;
  }, [loadingProjectStatus, loadingEmployee]);
  const projectCode = useMemo(() => {
    return project?.code ? ` (${project.code})` : '';
  }, [project]);
  const projectName = useMemo(() => {
    return project ? `${project.name}${projectCode}` : 'unknown';
  }, [project, projectCode]);
  const projectLink = useMemo(() => {
    return projectUrl && project ? `${projectUrl}/${project._idNative}` : null;
  }, [project, projectUrl]);
  const ragColor = useMemo(() => {
    switch (projectStatus?.rag) {
      case GREEN: return 'success';
      case AMBER: return 'warning';
      case RED: return 'danger';
      default: return 'default';
    }
  }, [projectStatus]);
  const rag = useMemo(() => {
    return projectStatus?.rag ? projectStatus.rag.toLowerCase() : NA;
  }, [projectStatus]);
  const reporter = useMemo(() => {
    return employee?.fullName ? employee.fullName : 'unknown';
  }, [employee]);
  const reporterLink = useMemo(() => {
    return employeeUrl && employee?._idNative ? `${employeeUrl}/${employee._idNative}` : null;
  }, [employeeUrl, employee]);
  const projectStatusDate = useMemo(() => {
    return projectStatus?._createdAt
    ? moment(projectStatus._createdAt?.toMillis()).format('MMM D YYYY') : 'none';
  }, [projectStatus]);

  const toggleStatusVariant = (variant:TaVariant) => {
    setStatusVariant(variant);
  };

  const toggleActionsVariant = (variant:TaVariant) => {
    setActionsVariant(variant);
  };

  return (
    <>
      <div className='flex flex-row justify-start pb-4'>
        <p className='font-semibold text-xl pr-2'>{projectName}</p>
        {projectLink && (
          <Link href={projectLink} target='_blank'>
            <Image className='pb-1 w-auto h-auto' src='/peopleforce.png' width='15' height='10' alt='Peopleforce'/>
          </Link>
        )}
      </div>
      <div className='border rounded-md p-2'>
        <div className='flex flex-row pb-2'>
          <ClipboardDocumentListIcon className='w-5'/>
          <p className='font-medium text-lg pl-1'>Health Status</p>
        </div>
        {!loading && (
          <div className='pl-6'>
            {!projectStatus && (
              <div className='h-10'/>
            )}
            {projectStatus && (
              <div>
                <div className='w-full bg-neutral-50 rounded-md p-4 mb-4'>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button color={ragColor}><div className='capitalize mx-8'>{rag}</div></Button>
                    </DropdownTrigger>
                    <DropdownMenu className='capitalize'>
                      <DropdownItem key='red' color='danger'>{RED.toLowerCase()}</DropdownItem>
                      <DropdownItem key='amber' color='warning'>{AMBER.toLowerCase()}</DropdownItem>
                      <DropdownItem key='green' color='success'>{GREEN.toLowerCase()}</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className='grid grid-rows-2 md:grid-rows-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  <Textarea
                    label={<div className='pb-2'>Status description:</div>}
                    variant={statusVariant}
                    defaultValue={projectStatus.status}
                    onFocus={() => toggleStatusVariant('faded')}
                    onBlur={() => toggleStatusVariant('bordered')}
                  />
                  <Textarea
                    label={<div className='pb-2'>Actions:</div>}
                    variant={actionsVariant}
                    defaultValue={projectStatus.actions}
                    onFocus={() => toggleActionsVariant('faded')}
                    onBlur={() => toggleActionsVariant('bordered')}
                  />
                </div>
                <hr className='my-4'/>
                <div className='flex flex-row justify-start pb-1'>
                  <div className='flex flex-row pr-4 text-sm'>
                    <p className='pr-1 text-gray-400'>Reported by:</p>
                    {reporterLink && (
                      <Link href={reporterLink} className='pr-1 text-cyan-600 hover:text-cyan-500' target='_blank'>
                        {reporter}
                      </Link>
                    )}
                    {!reporterLink && (
                      <p className='pr-1 text-cyan-600'>{reporter}</p>
                    )}
                    <p className='text-gray-400'>{projectStatusDate}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {loading && (
          <Spin/>
        )}
      </div>
    </>
  );
}

export default ProjectStatus;
