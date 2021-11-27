import { Box } from '@chakra-ui/react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import type { DenimReport } from '../lib/graphql';
import DenimReportCard from './DenimReportCard';
import Item from './Item';
import SortableItem from './SortableItem';

type Props = {
  accountId: string;
  denimId: string;
  denimReportList: DenimReport[];
};
const DenimReportList: React.FC<Props> = ({
  accountId,
  denimId,
  denimReportList,
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState(denimReportList);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id && over) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
  };

  console.log({ items });

  const getDenimReportById = (id: string) => {
    const target = denimReportList.find((report) => report.id === id);
    if (target === undefined) {
      throw new Error('Failed sorting');
    }
    return target;
  };

  return (
    <Box>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((report) => (
            <SortableItem key={report.id} id={report.id}>
              <Box marginTop="20px">
                <DenimReportCard
                  denimReport={report}
                  link={`/${accountId}/denims/${denimId}/reports/${report.id}`}
                />
              </Box>
            </SortableItem>
          ))}
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <Item id={activeId}>
              <DenimReportCard
                denimReport={getDenimReportById(activeId)}
                link={`/${accountId}/denims/${denimId}/reports/${
                  getDenimReportById(activeId).id
                }`}
              />
            </Item>
          ) : null}
        </DragOverlay>
      </DndContext>
    </Box>
  );
};

export default DenimReportList;
