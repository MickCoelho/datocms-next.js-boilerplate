import { CMSModuleExample1 } from 'interfaces';
import { Image } from 'react-datocms';

const ModuleExample1: any = (module: CMSModuleExample1) => {
  const { headline, image } = module;
  return (
    <>
      <h3>{headline}</h3>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        data={image.responsiveImage}
        style={{
          maxWidth: '500px',
          margin: 'auto',
        }}
      />
    </>
  );
};

export default ModuleExample1;
