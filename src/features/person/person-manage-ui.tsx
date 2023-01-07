import React from 'react';
import { IPerson } from '@/models/person';
import { SimpleTreeItemWrapper, SortableTreeProps, TreeItemComponentProps } from 'dnd-kit-sortable-tree';
import { isEmpty } from 'lodash';
import dynamic from 'next/dynamic';
import { TreeItemComponentType } from 'dnd-kit-sortable-tree/dist/types';
import { sortableItemClassName } from './person-constant';
import classNames from 'classnames';

const SortableTree = dynamic<SortableTreeProps<SortablePerson, HTMLElement>>(() => import('dnd-kit-sortable-tree').then((lib) => lib.SortableTree), {
  ssr: false
});

type SortablePerson = IPerson & {
  id: string;
  children: SortablePerson[];
}
type Props = {
  persons: IPerson[]
}

const genderMapping = {
  "male": "Nam",
  "female": "Nữ"
};

const PersonManageUI: React.FC<Props> = ({ persons }) => {
  const [items, setItems] = React.useState<SortablePerson[]>([]);

  React.useEffect(() => {
    if (!isEmpty(persons)) {
      const personList = persons.map((person) => ({
        ...person,
        id: person._id,
      })) as SortablePerson[];
      setItems(personList);
    }
  }, [persons]);

  console.log(items);

  return (
    <div>
      <div className='panel border p-3 rounded mb-5 flex flex-row justify-start items-center gap-5'>
        <h1 className='text-lg text-left font-bold'>Quản lý & sắp xếp</h1>
        <div className='flex flex-row gap-1'>
          <button className='py-2 px-5 bg-green-700 hover:bg-green-800 transition text-white text-sm rounded'>
            Lưu
          </button>
          <button className='py-2 px-5 bg-purple-700 hover:bg-purple-800 transition text-white text-sm rounded'>
            Tạo mới
          </button>
        </div>
      </div>
      <SortableTree
        items={items}
        onItemsChanged={setItems}
        indentationWidth={60}
        indicator
        TreeItemComponent={
          Person as TreeItemComponentType<SortablePerson, HTMLElement>
        }
      />
    </div>
  );
};

const Person = React.forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<SortablePerson>
>(function _(props, ref) {
  const { item, isLast, depth, parent, indentationWidth, ...dndProps } = props;
  const deleteBtnClasses = classNames({
    'py-2 px-5 bg-red-700 hover:bg-red-800 transition text-white text-sm rounded': true,
    // 'opacity-5': !!item.children.length
  });

  return (
    <SimpleTreeItemWrapper
      {...dndProps}
      item={item}
      isLast={isLast}
      depth={depth}
      parent={parent}
      indentationWidth={indentationWidth}
      clone={false}
      showDragHandle
      indicator
      contentClassName='bg-white p-3'
      ref={ref}
    >
      <div className={sortableItemClassName}>
        <div className='flex flex-row justify-between select-none'>
          <div className='text-ellipsis overflow-hidden flex-nowrap'>
            <div className='info flex text-sm font-bold gap-3'>
              <span className='text-gray-500'>Tên:</span>
              <span>{props.item.name}</span>
            </div>
            <div className='info flex text-sm font-bold gap-3'>
              <span className='text-gray-500'>Ngày sinh:</span>
              <span>{props.item.date_of_birth}</span>
            </div>
            <div className='info flex text-sm font-bold gap-3'>
              <span className='text-gray-500'>Ngày mất:</span>
              <span>
                {props.item.date_of_death
                  ? props.item.date_of_death
                  : 'Chưa mất'}
              </span>
            </div>
            <div className='info flex text-sm font-bold gap-3'>
              <span className='text-gray-500'>Giới tính:</span>
              <span>
                {genderMapping[props.item.gender] || 'Không xác định'}
              </span>
            </div>
          </div>
          <div className='flex-1 flex flex-row justify-end items-center'>
            <div className='flex flex-col gap-1'>
              <button className='py-2 px-5 bg-green-700 hover:bg-green-800 transition text-white text-sm rounded'>
                Chỉnh sửa
              </button>
              <button className={deleteBtnClasses}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
    </SimpleTreeItemWrapper>
  );
});

export default PersonManageUI;