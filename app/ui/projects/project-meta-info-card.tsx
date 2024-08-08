import {Metadata} from "@/app/lib/constants/definitions";
import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";

const ProjectMetaInfoCard = ({ projectMetadata }:{ projectMetadata:Metadata|null|undefined }) => {
  return (
    <Card radius='none'>
      <div className='px-2'>
        <CardHeader className='pb-2'>
          Card name 1
        </CardHeader>
        <Divider/>
        <CardBody>
          INFO 1
        </CardBody>
      </div>
      <Divider className='py-0.5' />
      <div className='px-2'>
        <CardHeader>
          Card name 2
        </CardHeader>
        <Divider/>
        <CardBody>
          INFO 2
        </CardBody>
      </div>
    </Card>
  );
};

export default ProjectMetaInfoCard;
