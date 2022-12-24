import { IPerson } from "@/models/person";
import React from "react";
import { ReactSortable } from "react-sortablejs";
import { sortableItemClassName, sortableCommonOption, sortableClassName, sortableChoosenItemClassName } from "../person-constant";

const ChildList: React.FC<{
  id: string;
  indexes: number[];
  list: IPerson[];
  setList: React.Dispatch<React.SetStateAction<IPerson[]>>;
}> = ({ id, indexes, list, setList }) => {
  const handleSetList = React.useCallback((currentList: IPerson[]) => {
    console.log('sortedList', currentList);
    setList((sourceList) => {
      const tempList = [...sourceList];
      const _indexs = [...indexes];
      const lastIndex = _indexs.pop() as number;
      const lastArr = _indexs.reduce(
        (arr, i) => arr[i].childrens ?? [],
        tempList,
      );

      lastArr[lastIndex].childrens = currentList;
      return tempList;
    });
  }, []);

  const renderPersons = React.useMemo(
    () =>
      list.map((person, index) => (
        <div className={sortableItemClassName} key={person._id}>
          {person.name}
          {!!person.childrens && person.childrens.length > 0 && <ChildList
              id={person._id}
              indexes={[...indexes, index]}
              list={person.childrens || []}
              setList={setList}
            />}
        </div>
      )),
    [list],
  );

  return (
    <ReactSortable
      {...sortableCommonOption}
      className={sortableClassName}
      animation={150}
      chosenClass={sortableChoosenItemClassName}
      key={id}
      list={list}
      setList={handleSetList}
    >
      {renderPersons}
    </ReactSortable>
  );
};

export default ChildList;