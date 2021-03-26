import { FunctionComponent } from 'react';

import { User } from '../interfaces';

type Props = {
  user: User;
};

const ListDetail: FunctionComponent<Props> = ({ user }: Props) => (
  <div>
    <h1>Detail for {user.name}</h1>
    <p>ID: {user.id}</p>
  </div>
);

export default ListDetail;
