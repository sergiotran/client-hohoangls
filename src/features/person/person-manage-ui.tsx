import React from 'react';
import { IPerson } from '@/models/person';
import { isArray } from 'lodash';
import DragDropContext from '@/common/components/drag-drop-context';
import Droppable from '@/common/components/droppable';
import Draggable from '@/common/components/draggable';
import { sortableClassName, sortableItemClassName } from './person-constant';

type Props = {
  persons: IPerson[];
};
const PersonManageUI: React.FC<Props> = ({ persons }) => {
  const [personList, setPersonList] = React.useState<IPerson[]>(persons || []);

  const recursivelyFindKeyValue = React.useCallback(
    (
      _key: keyof IPerson,
      keyValue: string,
      list: IPerson[],
    ): { found: boolean; containingArray: IPerson[] } => {
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        for (const key of Object.keys(item)) {
          if (isArray(item[key as keyof IPerson])) {
            const res = recursivelyFindKeyValue(
              key as keyof IPerson,
              keyValue,
              item[key as keyof IPerson] as IPerson[],
            );
            if (res.found === true) return res;
          }
          //Test the keyValue
          else if (item[key as keyof IPerson] === keyValue) {
            return { found: true, containingArray: item.childrens || [] };
          }
        }
      }

      return { found: false, containingArray: [] };
    },
    [],
  );
  return (
    <DragDropContext>
      <Droppable className={sortableClassName} droppableId='root'>
        {personList.map((person) => {
          return (
            <Draggable className={sortableItemClassName} key={person._id} draggableId={person._id}>
              {person.name}
            </Draggable>
          );
        })}
      </Droppable>
    </DragDropContext>
  );
};

export default PersonManageUI;