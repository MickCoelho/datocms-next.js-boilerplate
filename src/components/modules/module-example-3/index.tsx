import { CMSModuleExample3 } from 'interfaces';
import { StructuredText } from 'react-datocms';

const ModuleExample3: any = (module: CMSModuleExample3) => {
  const { content } = module;
  return (
    <>
      <StructuredText data={content} />
    </>
  );
};

export default ModuleExample3;
