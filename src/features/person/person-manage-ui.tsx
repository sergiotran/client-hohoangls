import React from 'react';
import { IPerson } from '@/models/person';
import { closestCenter, DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { sortableClassName, sortableItemClassName } from './person-constant';
import { CSS } from '@dnd-kit/utilities';
import { find, findIndex } from 'lodash';
import { DragStartEvent, UniqueIdentifier } from '@dnd-kit/core/dist/types';

type SortablePerson = IPerson & {
  id: string;
  childrens: SortablePerson[];
}
type Props = {
  persons: SortablePerson[]
}
const PersonManageUI: React.FC<Props> = ({ persons }) => {
  const [items, setItems] = React.useState<SortablePerson[]>(
    (persons || []).map((person) => ({
      ...person,
      id: person._id,
    })),
  );
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  const handleDragStart = React.useCallback((e: DragStartEvent) => {
    const { active } = e;
    setActiveId(active.id);
  }, []);

  const handleDragEnd = React.useCallback((parentId?: string) => {
    return (e: DragEndEvent) => {
      if (e) {
        const { active, over } = e;

        if (!!over && active.id !== over.id) {
          setItems((items) => {
            const oldIndex = findIndex(items, {
              _id: active.id as string,
            });
            const newIndex = findIndex(items, {
              _id: over.id as string,
            });

            return arrayMove(items, oldIndex, newIndex);
          });
        }
        setActiveId(null);
      }
    };
  }, []);

  return (
    <SortableList
      items={items}
      activeId={activeId}
      handleDragEnd={handleDragEnd}
      handleDragStart={handleDragStart}
    />
  );
};

const SortableList: React.FC<{
  items: SortablePerson[];
  activeId: UniqueIdentifier | null,
  handleDragStart: (e: DragStartEvent) => void;
  handleDragEnd: (parentId?: string) => (e: DragEndEvent) => void;
  parentId?: string;
}> = ({ items, handleDragStart, handleDragEnd, parentId, activeId }) => {
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd(parentId)}
    >
      <SortableContext
        id={parentId}
        items={items.map((item) => item._id)}
        strategy={verticalListSortingStrategy}
        key={parentId}
      >
        <div className={sortableClassName}>
          {items.map((person) => {
            return (
              <SortableItem
                key={person._id}
                activeId={activeId}
                handleDragEnd={handleDragEnd}
                handleDragStart={handleDragStart}
                data={person}
              />
            );
          })}
        </div>
      </SortableContext>
      <DragOverlay>
        {!!activeId && <Item {...find(items, {
          _id: activeId as string
        }) as SortablePerson} />}
      </DragOverlay>
    </DndContext>
  );
};

const SortableItem: React.FC<{
  data: SortablePerson;
  activeId: UniqueIdentifier | null;
  handleDragStart: (e: DragStartEvent) => void;
  handleDragEnd: (parentId?: string) => (e: DragEndEvent) => void;
}> = ({ handleDragStart, handleDragEnd, data: person, activeId }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: person._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Item {...person} />
      <SortableList
        items={person.childrens || []}
        activeId={activeId}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        parentId={person._id}
      />
    </div>
  );
};

const Item: React.FC<SortablePerson> = (props) => {
  return <div className={sortableItemClassName}>{props.name}</div>;
};

export default PersonManageUI;