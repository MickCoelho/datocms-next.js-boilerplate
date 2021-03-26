import { FunctionComponent } from 'react';

import { User } from '../interfaces';

type Props = {
  data: User;
};

const ListItem: FunctionComponent<Props> = ({ data }: Props) => (
  <div>
    {data.id}: {data.name}
  </div>
);

export default ListItem;
