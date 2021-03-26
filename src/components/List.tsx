import { FunctionComponent } from 'react';
import ListItem from './ListItem';
import { User } from '../interfaces';

type Props = {
  users: User[];
};

const List: FunctionComponent<Props> = ({ users }: Props) => (
  <ul>
    {users.map((user) => (
      <li key={user.id}>
        <ListItem data={user} />
      </li>
    ))}
  </ul>
);

export default List;
