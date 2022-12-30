import { IPerson } from '@/models/person';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { sortableItemClassName } from '../person-constant';
import { faUpDownLeftRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

const SortablePersonList = dynamic(
  () => import('./sortable-person-list'),
  // { ssr: false },
);

type Props = IPerson & {
  index: number;
};
const SortablePersonItem: React.FC<Props> = (person) => {
  return (
    <Draggable draggableId={person._id} index={person.index}>
      {(provided, context) => {
        const classes = classNames({
          [sortableItemClassName]: true,
          'flex flex-col flex-wrap items-start': true,
        });
        return (
          <div
            className={classes}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div
              className='px-3 rounded bg-gray-100 hover:bg-gray-200 mr-3 mt-3 ml-3'
              {...provided.dragHandleProps}
            >
              <FontAwesomeIcon icon={faUpDownLeftRight} />
            </div>
            {person.name}
            {!context.isDragging && (
              <SortablePersonList
                list={person.childrens || []}
                parentId={person._id}
              />
            )}
          </div>
        );
      }}
    </Draggable>
  );
};

export default React.memo(SortablePersonItem);
