import { CMSModuleExample2 } from 'interfaces';

const ModuleExample2: any = (module: CMSModuleExample2) => {
  const { ctaLabel, ctaUrl } = module;
  return (
    <>
      <a href={ctaUrl}>{ctaLabel}</a>
    </>
  );
};

export default ModuleExample2;
