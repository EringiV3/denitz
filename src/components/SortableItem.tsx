import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Item from './Item';

type Props = {
  id: string;
};
const SortableItem: React.FC<Props> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Item id={id} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </Item>
  );
};

export default SortableItem;
