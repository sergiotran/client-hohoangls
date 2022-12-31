import { IPerson } from '@/models/person';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { rootListId, sortableClassName } from '../person-constant';
import SortablePersonItem from './sortable-person-item';
import classNames from 'classnames';

type Props = {
  list: IPerson[];
  parentId?: string;
};
const SortablePersonList: React.FC<Props> = ({
  list,
  parentId = rootListId,
}) => {
  return (
    <div>
      <Droppable droppableId={parentId}>
        {(provided, context) => {
          const classes = classNames({
            [sortableClassName]: true,
            'bg-gray-100 p-5': parentId !== rootListId,
            'bg-indigo-100': context.isDraggingOver,
          });
          return (
            <div
              ref={provided.innerRef}
              className={classes}
              {...provided.droppableProps}
            >
              {(() => {
                return list.map((person, index) => {
                  return (
                    <SortablePersonItem
                      key={person._id}
                      {...person}
                      index={index}
                    />
                  );
                });
              })()}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default SortablePersonList;
