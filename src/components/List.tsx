import { FunctionComponent } from 'react';
import ListItem from './ListItem';
import { User } from '../interfaces';

type Props = {
  items: User[];
};

const List: FunctionComponent<Props> = ({ items }: Props) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
);

export default List;
