import clsx from 'clsx';
import Link from 'next/link';
import Image from "next/image";
import {ClipboardDocumentListIcon} from '@heroicons/react/24/outline';
import Spin from '@/app/lib/spin';
import useGetProjectStatus from "@/app/lib/hooks/use-get-project-status";
import useGetEmployee from "@/app/lib/hooks/use-get-employee";
import {Project} from "@/app/lib/definitions";
import {NA, RED, GREEN, AMBER} from "@/app/lib/constants/rag-statuses";
import moment from "moment";

const ProjectStatus = ({ project }:{project:Project|null}) => {
  const [projectStatus, loadingProjectStatus, errorProjectStatus] = useGetProjectStatus(project?.statusId);
  const [employee, loadingEmployee, errorEmployee] = useGetEmployee(projectStatus?.reporterId);

  const projectUrl = process.env.NEXT_PUBLIC_PEOPLE_FORCE_PROJECT_URL;
  const employeeUrl = process.env.NEXT_PUBLIC_PEOPLE_FORCE_EMPLOYEE_URL;
  const loading = loadingProjectStatus && loadingEmployee;

  const projectCode = project?.code ? ` (${project.code})` : '';
  const projectName = project ? `${project.name}${projectCode}` : 'unknown';
  const projectLink = projectUrl && project ? `${projectUrl}/${project._idNative}` : null;
  const ragColor = projectStatus?.rag ? projectStatus.rag : NA;
  const rag = NA === ragColor ? NA : ragColor.toLowerCase();
  const reporter = employee?.fullName ? employee.fullName : 'unknown';
  const reporterLink = employeeUrl && employee?._idNative ? `${employeeUrl}/${employee._idNative}` : null;
  const projectStatusDate = projectStatus?._createdAt
    ? moment(projectStatus._createdAt?.toMillis()).format('MMM D YYYY') : 'none';

  console.log('Color: ' + ragColor);

  return (
    <div className='border p-2'>
      <div className='flex flex-row justify-start pb-4'>
        <p className='font-semibold text-xl pr-2'>{projectName}</p>
        {projectLink && (
          <Link href={projectLink} target='_blank'>
            <Image className='pb-1' src='/peopleforce.png' width='15' height='10' alt='Peopleforce'/>
          </Link>
        )}
      </div>
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
              <div className='w-full bg-gray-50 rounded-md p-4 mb-4'>
                <div className={clsx(
                  'p-1.5 w-fit rounded-sm border',
                  {'bg-grey-300 border-gray-200': NA === ragColor},
                  {'bg-red-400 border-red-300': RED === ragColor},
                  {'bg-amber-300 border-amber-300': AMBER === ragColor},
                  {'bg-green-400 border-green-300': GREEN === ragColor},
                )}>
                  <p className='capitalize text-sm mx-10'>{rag}</p>
                </div>
              </div>
              <div className='grid grid-rows-2 md:grid-rows-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              <p>{projectStatus.status}</p>
              <p>{projectStatus.actions}</p>
              </div>
              <hr className='my-4'/>
              <div className='flex flex-row justify-start'>
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
  );
}

export default ProjectStatus;
