import {Card, CardHeader, CardBody, Divider} from "@nextui-org/react";
import ProjectMetaInfoCard from "./project-meta-info-card";
import {Project} from "@/app/lib/constants/definitions";

const ProjectMetaInfoPane = ({ project }:{ project:Project|null }) => {
  return (
    <div className='flex flex-col lg:flex-row border rounded-md py-2'>
      <div className='w-auto lg:w-full ml-2 mr-2 lg:mr-0 mb-2 lg:mb-0'>
        <ProjectMetaInfoCard projectMetadata={project?.meta} />
      </div>
      <Card radius='none' className='w-auto lg:w-full ml-2 mr-2 lg:mr-0 mb-2 lg:mb-0'>
        <CardBody>
          {project?.name} INFO 2
        </CardBody>
      </Card>
      <Card radius='none' className='w-auto lg:w-full mx-2'>
        <CardBody>
          {project?.name} INFO 3
        </CardBody>
      </Card>
    </div>
  );
}

export default ProjectMetaInfoPane;
