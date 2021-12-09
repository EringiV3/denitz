import { Box, Button, useToast } from '@chakra-ui/react';
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
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useGraphqlClient } from '../hooks/useGraphqlClient';
import type {
  DenimReport,
  UpdateDenimReportSortOrderInput,
} from '../lib/graphql';
import { queryKeys } from '../utils/queryKeyFactory';
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
  const toast = useToast();
  const { client, hasToken } = useGraphqlClient();
  const { data: currentUserData } = useQuery(
    queryKeys.currentUser(),
    () => client.GetCurrentUser(),
    {
      enabled: hasToken,
    }
  );

  const updateSortOrderMutation = useMutation(
    (input: UpdateDenimReportSortOrderInput) =>
      client.UpdateDenimReportSortOrder({ input }),
    {
      onSuccess: () => {
        toast({
          title: '並び順を更新しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        setIsEditting(false);
      },
      onError: () => {
        toast({
          title: 'エラーが発生しました',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      },
    }
  );

  const isEditable = currentUserData?.getCurrentUser?.accountId === accountId;

  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<DenimReport[]>([]);

  useEffect(() => {
    setItems(denimReportList);
  }, [denimReportList]);

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

  const getDenimReportById = (id: string) => {
    const target = denimReportList.find((report) => report.id === id);
    if (target === undefined) {
      throw new Error('Failed sorting');
    }
    return target;
  };

  const [isEditting, setIsEditting] = useState(false);

  const handleClickSortOrderEdit = () => {
    setIsEditting(true);
  };

  const handleClickUpdateSortOrder = () => {
    const sortOrder = items.map((report) => report.id);
    updateSortOrderMutation.mutate({ denimId, sortOrder });
  };

  return (
    <Box>
      {isEditable && (
        <Box display="flex" justifyContent="flex-end">
          {isEditting ? (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Box>ドラッグ・アンド・ドロップで並び順を変更できます。</Box>
              <Button onClick={handleClickUpdateSortOrder}>
                並び順を確定する
              </Button>
            </Box>
          ) : (
            <Button onClick={handleClickSortOrderEdit}>並び順を変更する</Button>
          )}
        </Box>
      )}
      {isEditable ? (
        <Box>
          {isEditting ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
              >
                {items.map((report) => (
                  <SortableItem key={report.id} id={report.id}>
                    <Box marginTop="20px">
                      <DenimReportCard denimReport={report} />
                    </Box>
                  </SortableItem>
                ))}
              </SortableContext>
              <DragOverlay>
                {activeId ? (
                  <Item id={activeId}>
                    <DenimReportCard
                      denimReport={getDenimReportById(activeId)}
                    />
                  </Item>
                ) : null}
              </DragOverlay>
            </DndContext>
          ) : (
            items.map((report) => (
              <Box key={report.id} marginTop="20px">
                <DenimReportCard
                  denimReport={report}
                  link={`/${accountId}/denims/${denimId}/reports/${report.id}`}
                />
              </Box>
            ))
          )}
        </Box>
      ) : (
        denimReportList.map((report) => (
          <Box key={report.id} marginTop="20px">
            <DenimReportCard
              denimReport={report}
              link={`/${accountId}/denims/${denimId}/reports/${report.id}`}
            />
          </Box>
        ))
      )}
    </Box>
  );
};

export default DenimReportList;
