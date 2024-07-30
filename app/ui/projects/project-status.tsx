import Link from 'next/link';
import {ClipboardDocumentListIcon} from '@heroicons/react/24/outline';
import Spin from '@/app/lib/spin';
import useGetProjectStatus from "@/app/lib/hooks/use-get-project-status";
import useGetEmployee from "@/app/lib/hooks/use-get-employee";
import {Project} from "@/app/lib/definitions";
import {NA} from "@/app/lib/constants/rag-statuses";
import moment from "moment";

const ProjectStatus = ({ project }:{project:Project|null}) => {
  const [projectStatus, loadingProjectStatus, errorProjectStatus] = useGetProjectStatus(project?.statusId);
  const [employee, loadingEmployee, errorEmployee] = useGetEmployee(projectStatus?.reporterId);

  const employeeUrl = process.env.NEXT_PUBLIC_PEOPLE_FORCE_EMPLOYEE_URL;
  const loading = loadingProjectStatus && loadingEmployee;

  const projectCode = project?.code ? ` (${project.code})` : '';
  const projectName = project ? `${project.name}${projectCode}` : 'unknown';
  const rag = projectStatus?.rag ? projectStatus.rag.toLowerCase() : NA;
  const ragColor = projectStatus?.rag ? rag : 'grey';
  const reporter = employee?.fullName ? employee.fullName : 'unknown';
  const reporterUrl = employeeUrl && employee?._idNative ? `${employeeUrl}/${employee._idNative}` : null;
  const projectStatusDate = projectStatus?._createdAt
    ? moment(projectStatus._createdAt?.toMillis()).format('MMM D YYYY') : 'none';

  return (
    <div className='border p-2'>
      <p className='font-semibold text-xl pb-4'>{projectName}</p>
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
                <div className={`bg-${ragColor}-300 p-1.5 w-fit rounded-sm`}>
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
                  {reporterUrl && (
                    <Link href={reporterUrl} className='pr-1 text-cyan-600 hover:text-cyan-500'>
                      {reporter}
                    </Link>
                  )}
                  {!reporterUrl && (
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
