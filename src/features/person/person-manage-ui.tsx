import React from 'react';
import { IPerson } from '@/models/person';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import dynamic from 'next/dynamic';
import { rootListId } from './person-constant';
import { moveInArray, moveToOtherArray } from '@/utils/array-utils';
import { find } from 'lodash';

const SortablePersonList = dynamic(
  () => import('./components/sortable-person-list'),
  { ssr: false },
);

type Props = {
  persons: IPerson[];
};
const PersonManageUI: React.FC<Props> = ({ persons }) => {
  const [personList, setPersonList] = React.useState<IPerson[]>(persons || []);

  const handleFindPersonById = React.useCallback((list: IPerson[], id: string) => {
    if(!list.length) return null;
    const founded = find(list, {
      _id: id
    });
    if(!founded) {
      list.forEach((person) => {
        handleFindPersonById(person.childrens || [], id);
      });
    }
    return founded;
  }, []);

  const handleDragEnd = React.useCallback((result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if(result.source.droppableId === rootListId && result.destination.droppableId === rootListId) {
      // Reorder root
      setPersonList((prevList) => moveInArray(prevList, sourceIndex, destIndex));
    }

    if(result.source.droppableId === rootListId && result.destination.droppableId !== rootListId) {
      const targetPerson = handleFindPersonById(personList, result.destination.droppableId);
      // Reorder from root to childrens
      if(targetPerson && targetPerson.childrens) {
        const cloneList = [...personList];
        moveToOtherArray(cloneList, targetPerson.childrens, sourceIndex, destIndex);
        setPersonList(cloneList);
      }
    }

    if(result.source.droppableId !== rootListId && result.destination.droppableId === rootListId) {
      const targetPerson = handleFindPersonById(personList, result.source.droppableId);
      if(targetPerson && targetPerson.childrens) {
        const cloneList = [...personList];
        console.log(cloneList);
        moveToOtherArray(targetPerson.childrens, cloneList, sourceIndex, destIndex);
        setPersonList(cloneList);
      }
    }
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <SortablePersonList list={personList} />
    </DragDropContext>
  );
};

export default PersonManageUI;