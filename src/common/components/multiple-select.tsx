import React from 'react';
import useClickOutside from '../hooks/useClickOutside';
import type { Path, PathValue, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import { filter, find, findIndex } from 'lodash';
import classNames from 'classnames';

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
      return ('' + item[searchField]).search(new RegExp(searchText, 'gi')) > -1;
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
      <div className='p-3 bg-gray-100 border cursor-pointer rounded shadow overflow-hidden'>
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
          className='absolute left-0 w-full top-full rounded bg-white shadow-lg z-20 divide-y divide-y-1 overflow-hidden'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='border'>
            <input
              className='p-2 w-full'
              type='text'
              onChange={(e) => setSearchText(e.target.value)}
              placeholder='Tìm kiếm ...'
            />
          </div>
          <div className='flex flex-col gap-2 p-2'>
            {(() => {
              if(!dataWithSearch) {
                console.log('hehe');
                return "Không có dữ liệu";
              }
              return dataWithSearch.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={classNames({
                      'p-2 text-sm cursor-pointer rounded border': true,
                      'bg-green-200 hover:bg-green-200':
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
