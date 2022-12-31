import React from 'react';
import { IPerson } from '@/models/person';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { rootListId } from './person-constant';
import { moveInArray, moveToOtherArray } from '@/utils/array-utils';
import { cloneDeep, isArray } from 'lodash';
import SortablePersonList from './components/sortable-person-list';

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

  const handleDragEnd = React.useCallback((result: DropResult) => {
    if (
      !result.destination ||
      result.draggableId === result.destination.droppableId
    ) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (
      result.source.droppableId === rootListId &&
      result.destination.droppableId === rootListId
    ) {
      // Reorder root
      setPersonList((prevList) => {
        const cloneList = cloneDeep(prevList);
        moveInArray(cloneList, sourceIndex, destIndex);
        return cloneList;
      });
    } else if (
      result.source.droppableId === rootListId &&
      result.destination.droppableId !== rootListId
    ) {
      // Reorder from root to childrens
      setPersonList((prevList) => {
        const clone = cloneDeep(prevList);
        if (result.destination?.droppableId) {
          const targetPerson = recursivelyFindKeyValue(
            '_id',
            result.destination.droppableId,
            clone,
          );
          console.log(targetPerson);
          if (targetPerson.found) {
            moveToOtherArray(
              clone,
              targetPerson.containingArray,
              sourceIndex,
              destIndex,
            );
          }
        }
        return clone;
      });
    } else if (
      result.source.droppableId !== rootListId &&
      result.destination.droppableId === rootListId
    ) {
      setPersonList((prevList) => {
        const clone = cloneDeep(prevList);
        if (result.destination?.droppableId) {
          const targetPerson = recursivelyFindKeyValue(
            '_id',
            result.source.droppableId,
            clone,
          );
          if (targetPerson.found) {
            moveToOtherArray(
              targetPerson.containingArray,
              clone,
              sourceIndex,
              destIndex,
            );
          }
        }
        return clone;
      });
    } else {
      setPersonList((prevList) => {
        const clone = cloneDeep(prevList);
        if (result.destination?.droppableId) {
          const targetPersonA = recursivelyFindKeyValue(
            '_id',
            result.source.droppableId,
            clone,
          );
          const targetPersonB = recursivelyFindKeyValue(
            '_id',
            result.destination.droppableId,
            clone,
          );
          if (targetPersonA.found && targetPersonB.found) {
            moveToOtherArray(
              targetPersonA.containingArray,
              targetPersonB.containingArray,
              sourceIndex,
              destIndex,
            );
          }
        }
        return clone;
      });
    }
  }, []);

  return (
    <DragDropContext enableDefaultSensors onDragEnd={handleDragEnd}>
      <SortablePersonList list={personList} />
    </DragDropContext>
  );
};

export default PersonManageUI;