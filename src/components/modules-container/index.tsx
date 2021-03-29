import { FunctionComponent } from 'react';
import ModuleExample1 from 'components/modules/module-example-1';
import ModuleExample2 from 'components/modules/module-example-2';
import ModuleExample3 from 'components/modules/module-example-3';
import { CMSModuleBase } from 'interfaces';

const ModularComponent: FunctionComponent<CMSModuleBase | undefined> = (
  module,
) => {
  let component;
  switch (module.type) {
    case 'module_example1':
      component = <ModuleExample1 {...module} />;
      break;
    case 'module_example2':
      component = <ModuleExample2 {...module} />;
      break;
    case 'module_example3':
      component = <ModuleExample3 {...module} />;
      break;
    default:
      component = <div />;
      break;
  }
  return (
    <div
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        border: '1px solid rgba(0, 0, 0, 0.2)',
      }}
    >
      {component}
    </div>
  );
};

export default ModularComponent;
