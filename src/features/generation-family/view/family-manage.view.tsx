import { useAppDispatch } from '@/common/app/store';
import classNames from 'classnames';
import type {
  SortableTreeProps,
  TreeItemComponentProps,
} from 'dnd-kit-sortable-tree';
import {
  TreeItemComponentType,
  TreeItems,
} from 'dnd-kit-sortable-tree/dist/types';
import dynamic from 'next/dynamic';
import React from 'react';
import { useSelector } from 'react-redux';
import { IPerson, selectPersonList, setListPerson, updatePersons } from '../generation-slice';
import FamilyFactoryModal from './inc/family-factory-modal';
import { PrimaryButton } from '@/common/components/buttons';

const SortableTree = dynamic<SortableTreeProps<IPerson, HTMLElement>>(
  () => import('dnd-kit-sortable-tree').then((lib) => lib.SortableTree),
  {
    ssr: false,
  },
);

const SimpleTreeItemWrapper = dynamic(
  () =>
    import('dnd-kit-sortable-tree').then((lib) => lib.SimpleTreeItemWrapper),
  {
    ssr: false,
  },
);

const genderMapping = {
  male: 'Nam',
  female: 'Nữ',
};

const PersonManageUI: React.FC = () => {
  const dispatch = useAppDispatch();
  const [familyFactoryOpen, setFamilyFactoryOpen] =
    React.useState<boolean>(false);
  const persons = useSelector(selectPersonList);

  const handlePersonListChanged = (items: TreeItems<IPerson>) => {
    dispatch(setListPerson(items));
  };

  const handleSaveChange = () => {
    dispatch(updatePersons(persons));
  };

  const handleShowFamilyFactoryModal = () => {
    setFamilyFactoryOpen(true);
  };
  const handleCloseFamilyFactoryModal = () => {
    setFamilyFactoryOpen(false);
  };

  return (
    <div>
      <div className='panel border p-3 rounded mb-5 flex flex-row justify-start items-center gap-5'>
        <h2 className='text-lg text-left font-bold'>Quản lý & sắp xếp</h2>
        <div className='flex flex-row gap-1'>
          <button
            onClick={handleSaveChange}
            className='py-2 px-5 bg-green-700 hover:bg-green-800 transition text-white text-sm rounded'
          >
            Lưu
          </button>
          <PrimaryButton
            onClick={handleShowFamilyFactoryModal}
          >
            Thêm gia đình
          </PrimaryButton>
        </div>
      </div>
      <ul className='p-3 border rounded shadow-lg'>
        <SortableTree
          items={
            persons.map((person) => ({
              ...person,
              id: person._id,
            })) as TreeItems<IPerson>
          }
          onItemsChanged={handlePersonListChanged}
          indentationWidth={60}
          // indicator
          TreeItemComponent={
            Person as TreeItemComponentType<IPerson, HTMLElement>
          }
        />
      </ul>
      <FamilyFactoryModal
        open={familyFactoryOpen}
        handleClose={handleCloseFamilyFactoryModal}
      />
    </div>
  );
};

const Person = React.forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<IPerson>
>(function _(props, ref) {
  const { item, isLast, depth, parent, indentationWidth, ...dndProps } = props;

  const deleteBtnClasses = classNames({
    'py-2 px-5 bg-red-700 hover:bg-red-800 transition text-white text-sm rounded':
      true,
    hidden: !(item.children || []).length,
  });

  return (
    <SimpleTreeItemWrapper
      {...dndProps}
      item={item}
      isLast={isLast}
      depth={depth}
      parent={parent}
      indentationWidth={indentationWidth}
      showDragHandle
      indicator
      contentClassName='bg-white p-3'
      ref={ref}
    >
      <div className='border w-full bg-slate-100 px-5 py-2 rounded ml-3'>
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
          <div className='flex-1 flex flex-row justify-end items-center ml-5'>
            <div className='flex flex-col gap-1'>
              <button className='py-2 px-5 bg-green-700 hover:bg-green-800 transition text-white text-sm rounded'>
                Chỉnh sửa
              </button>
              <button className={deleteBtnClasses}>Xóa</button>
            </div>
          </div>
        </div>
      </div>
    </SimpleTreeItemWrapper>
  );
});

export default PersonManageUI;
