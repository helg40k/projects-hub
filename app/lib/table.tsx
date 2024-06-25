'use client';

import {CheckIcon, XMarkIcon, ChevronUpIcon, ChevronDownIcon} from '@heroicons/react/24/outline';
import {MouseEvent, useState} from "react";
import clsx from 'clsx';
import Spin from '@/app/lib/spin'
import {Presentable} from "@/app/lib/definitions";
import {NONE_NAME, ASC_DIRECTION, DESC_DIRECTION} from "@/app/lib/constants/sorting";

const Table = ({ headers, data, loading, onSort, onSelect }: { headers:string[], data:Presentable[], loading:boolean, onSort?:Function, onSelect?:Function }) => {
  const [sortBy, setSortBy] = useState('none-none')

  const handleRowClick = (event:MouseEvent<HTMLDivElement>, id:string) => {
    if (onSelect) {
      onSelect(id)
    }
  }

  const handleSortClick = (event:MouseEvent<HTMLDivElement>) => {
    if (onSort) {
      const target = event.target;

      let columnTitleDiv
      if (target instanceof SVGPathElement) {
        columnTitleDiv = target.parentNode?.parentNode as HTMLDivElement;
      } else if (target instanceof SVGSVGElement) {
        columnTitleDiv = target.parentNode as HTMLDivElement;
      } else if (target instanceof HTMLDivElement) {
        columnTitleDiv = target as HTMLDivElement;
      }

      const columnName = columnTitleDiv ? (columnTitleDiv.textContent || NONE_NAME) : NONE_NAME;
      const [savedColumnName, direction] = sortBy.split('-');

      let sortingKey = 'none-none'
      if (NONE_NAME === columnName && (NONE_NAME !== savedColumnName || NONE_NAME !== direction)) {
        sortingKey = `${NONE_NAME}-${NONE_NAME}`;
      } else if (NONE_NAME !== columnName) {
        sortingKey = `${columnName}-${getNextSortDirection(columnName, savedColumnName, direction)}`;
      }
      onSort(sortingKey)
      setSortBy(sortingKey)
    }
  }

  const getNextSortDirection = (currentColumnName:string, savedColumnName:string, currentDirection:string):string => {
    if (currentColumnName !== savedColumnName) {
      return ASC_DIRECTION;
    }
    switch (currentDirection) {
      case NONE_NAME: return ASC_DIRECTION;
      case ASC_DIRECTION: return DESC_DIRECTION;
      case DESC_DIRECTION:
      default: {
        return NONE_NAME;
      }
    }
  }

  const getColumnTitle = (columnName:string) => {
    const [savedColumnName, direction] = sortBy.split('-');
    if (savedColumnName !== columnName) {
      return columnName;
    }
    if (ASC_DIRECTION === direction) {
      return (<>{columnName}<ChevronUpIcon className='w-5' /></>);
    } else if (DESC_DIRECTION === direction) {
      return (<>{columnName}<ChevronDownIcon className='w-5' /></>);
    }
    return columnName;
  }

  return (
    <div className='rounded-sm border-2 mt-1'>
      <div className="flex flex-row text-center capitalize bg-gray-200 border-b-[1px] border-gray-300">
        {headers.map((header, index) => {
          const isLastColumn = headers.length - 1 === index
          return (
            <div key={header} onClick={handleSortClick} className={clsx(
              'basis-1/6 p-2 flex flex-row justify-center active:bg-gray-300',
              {
                'border-r-[1px] border-gray-300': !isLastColumn
              }
            )}>
              {getColumnTitle(header)}
            </div>
          )
        })}
      </div>
      {!loading && data.map((row) => {
        return (
          <div key={row.id} className='truncate py-2 even:bg-white odd:bg-gray-100 hover:bg-sky-50 active:bg-sky-100'>
            <div className="flex flex-row text-left" onClick={(event) => (handleRowClick(event, row.id))}>
              {headers.map((header) => {
                const content = (row as any)[header];
                const isBoolean = typeof content === 'boolean';
                return (
                  <div key={`${header}-${row.id}`} className={clsx(
                    'basis-1/6 px-3',
                    {
                      'flex justify-center items-center': isBoolean
                    }
                  )}>
                    {isBoolean
                      ? content
                        ? <CheckIcon className='w-5 h-5 border-[1px] rounded-xl text-white bg-green-600 border-green-600' />
                        : <XMarkIcon className='w-5 h-5 border-[1px] rounded-xl text-white bg-red-600 border-red-600' />
                      : content}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      {loading && (<Spin />)}
    </div>
  )
}

export default Table
