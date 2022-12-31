import { IPerson } from '@/models/person';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { rootListId, sortableClassName, sortableItemClassName } from '../person-constant';
import { faUpDownLeftRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

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
          '!h-auto': context.isDragging,
        });
        return (
          <div
          {...provided.draggableProps}
            className={classes}
            ref={provided.innerRef}
          >
            <div className='flex items-start flex-row w-full p-3 bg-violet-100 h-full'>
              <div className='px-3 w-8 h-8 justify-center rounded-full bg-gray-100 hover:bg-gray-200 mr-4 flex items-center' {...provided.dragHandleProps}>
                <FontAwesomeIcon icon={faUpDownLeftRight} />
              </div>
              <div className='relative flex flex-col'>
                <div className="flex flex-row text-sm mb-1 font-bold">
                  <span className='text-gray-400'>Họ và tên:</span>
                  <span className="text-black inline-block ml-2">{person.name}</span>
                </div>
                <div className="flex flex-row text-sm mb-1 font-bold">
                  <span className='text-gray-400'>Ngày sinh:</span>
                  <span className="text-black inline-block ml-2">{person.date_of_birth}</span>
                </div>
              </div>
            </div>
            <div className='flex relative w-full my-3 px-3'>
              <Droppable droppableId={person._id}>
                {(provided, dropContext) => {
                  const classes = classNames({
                    [sortableClassName]: true,
                    'bg-gray-100 p-5': person._id !== rootListId,
                    'bg-indigo-100': dropContext.isDraggingOver,
                    hidden: context.isDragging,
                  });
                  return (
                    <div
                      ref={provided.innerRef}
                      className={classes}
                      style={{ minHeight: '50px' }}
                      {...provided.droppableProps}
                    >
                      {(() => {
                        return (person.childrens || []).map(
                          (children, index) => {
                            return (
                              <SortablePersonItem
                                key={children._id}
                                {...children}
                                index={index}
                              />
                            );
                          },
                        );
                      })()}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default React.memo(SortablePersonItem);
