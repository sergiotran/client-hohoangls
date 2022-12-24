import { IPerson } from '@/models/person';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import ChildList from './components/child-list';
import { sortableItemClassName, sortableCommonOption, sortableChoosenItemClassName, sortableClassName } from './person-constant';

type Props = {
  persons: IPerson[];
  isChildList?: boolean;
};

const PersonManageUI: React.FC<Props> = ({ persons = [] }) => {
  const [personList, setPersonList] = React.useState<IPerson[]>(persons);

  const renderPersons = React.useMemo(
    () =>
      personList.map((person, index) => (
        <div className={sortableItemClassName} key={person._id}>
          {person.name}
          {!!person.childrens && person.childrens.length > 0 && (
            <ChildList
              key={person._id}
              id={person._id}
              indexes={[index]}
              list={person.childrens}
              setList={setPersonList}
            />
          )}
        </div>
      )),
    [personList],
  );

  return (
    <div>
      <div className='flex mb-3'>
        <h1 className='text-lg font-bold border-b-2 pt-2 pb-1'>
          Person Manager
        </h1>
      </div>
      <div className='flex flex-col'>
        <ReactSortable
          {...sortableCommonOption}
          chosenClass={sortableChoosenItemClassName}
          className={sortableClassName}
          list={personList}
          setList={setPersonList}
        >
          {renderPersons}
        </ReactSortable>
        <button>Save</button>
      </div>
    </div>
  );
};

export default PersonManageUI;