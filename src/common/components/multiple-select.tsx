import React from 'react';
import useClickOutside from '../hooks/useClickOutside';
import type { Path, PathValue, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import { filter, find, findIndex } from 'lodash';
import classNames from 'classnames';
import { removeVietnameseTones } from '../utils/unicode-utils';

type Props<T extends object> = {
  data: T[];
  valueField: keyof T;
  searchField: keyof T;
  inputProps: UseFormRegisterReturn;
  setValue: UseFormSetValue<T>;
  label: string;
  multiple?: boolean;
};
const MultipleSelect = <T extends object>({
  label,
  data,
  valueField,
  searchField,
  inputProps,
  multiple = true,
  setValue,
}: Props<T>) => {
  const ref = React.createRef<HTMLDivElement>();
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  const [selectedValues, setSelectedValues] = React.useState<T[]>([]);
  const [searchText, setSearchText] = React.useState<string>('');

  // Handle click outside
  useClickOutside(ref, () => {
    setIsFocus(false);
  });

  const handleFocus = () => {
    setIsFocus(!isFocus);
  };

  const handleSelectItem = React.useCallback((item: T) => {
    return () => {
      if (multiple) {
        setSelectedValues((prev) => {
          if (
            find(prev, {
              [valueField]: item[valueField],
            })
          ) {
            return filter(prev, (filterItem) => {
              return filterItem[valueField] !== item[valueField];
            });
          }

          return [...prev, item];
        });
        return;
      }
      setSelectedValues((prev) => {
        if (
          find(prev, {
            [valueField]: item[valueField],
          })
        ) {
          return filter(prev, (filterItem) => {
            return filterItem[valueField] !== item[valueField];
          });
        }

        return [item];
      });
    };
  }, []);

  const dataWithSearch = React.useMemo(() => {
    return filter(data, (item) => {
      const textA = removeVietnameseTones(('' + item[searchField]).toLowerCase());
      const textB = removeVietnameseTones(searchText.toLowerCase());
      return textA.search(new RegExp(textB, 'gi')) > -1;
    });
  }, [searchText, data]);

  React.useEffect(() => {
    const [selectedValue] = selectedValues;
    setValue(
      inputProps.name as Path<T>,
      (multiple ? selectedValues : selectedValue) as PathValue<T, Path<T>>,
    );
  }, [selectedValues, multiple]);

  return (
    <div
      ref={ref}
      tabIndex={0}
      onClick={handleFocus}
      className='relative pointer-event-none select-none my-3'
    >
      <h4 className='font-bold text-sm mb-1' onClick={handleFocus}>
        {label}
      </h4>
      <div className='p-3 border border-teal-500 cursor-pointer rounded overflow-hidden'>
        <div className='flex flex-row gap-3'>
          {!selectedValues.length ? (
            <p className='text-xs text-gray-600'>Chọn thành viên...</p>
          ) : (
            selectedValues.map((item, index) => (
              <div
                key={index}
                className='px-3 py-1 rounded bg-green-200 text-xs'
              >
                {'' + item[searchField]}
              </div>
            ))
          )}
        </div>
      </div>
      {isFocus && (
        <div
          className='absolute mt-3 left-0 w-full top-full rounded bg-teal-100 z-20 divide-y divide-y-1 overflow-hidden p-3 shadow'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='border border-teal-300 text-white rounded overflow-hidden'>
            <input
              className='p-2 w-full  outline-none text-black text-bold placeholder-black'
              type='text'
              onChange={(e) => setSearchText(e.target.value)}
              placeholder='Tìm kiếm ...'
            />
          </div>
          <div className='flex flex-col gap-2 pt-2 max-h-36 overflow-auto rounded mt-3'>
            {(() => {
              if(!dataWithSearch) {
                return "Không có dữ liệu";
              }
              return dataWithSearch.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={classNames({
                      'p-2 text-sm cursor-pointer rounded bg-teal-200': true,
                      'bg-teal-500 text-white drop-shadow':
                        findIndex(
                          selectedValues,
                          (filterItem) =>
                            filterItem[valueField] === item[valueField],
                        ) > -1,
                    })}
                    onClick={handleSelectItem(item)}
                  >
                    {'' + item[searchField]}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}
      <input type='text' className='hidden' {...inputProps} />
    </div>
  );
};

export default MultipleSelect;
