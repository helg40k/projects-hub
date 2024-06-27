'use client';

import {CheckIcon, XMarkIcon, ChevronUpIcon, ChevronDownIcon} from '@heroicons/react/24/outline';
import {MouseEvent, useState} from "react";
import clsx from 'clsx';
import Spin from '@/app/lib/spin'
import {Presentable} from "@/app/lib/definitions";
import {NONE_NAME, ASC_DIRECTION, DESC_DIRECTION} from "@/app/lib/constants/sorting";

const TableComponent = ({ headers, data, loading, onSort, onSelect }: { headers:string[], data:Presentable[], loading:boolean, onSort?:Function, onSelect?:Function }) => {
  const [sortBy, setSortBy] = useState('none-none')

  const handleRowClick = (event:MouseEvent<HTMLDivElement>, id:string) => {
    if (onSelect) {
      onSelect(id)
    }
  }

  const handleSortClick = (event:MouseEvent<HTMLElement>) => {
    if (onSort) {
      const target = event.target;

      let columnTitleElement
      if (target instanceof SVGPathElement) {
        columnTitleElement = target.parentNode?.parentNode as HTMLElement;
      } else if (target instanceof SVGSVGElement) {
        columnTitleElement = target.parentNode as HTMLElement;
      } else if (target instanceof HTMLElement) {
        columnTitleElement = target as HTMLElement;
      }

      const columnName = columnTitleElement ? (columnTitleElement.textContent || NONE_NAME) : NONE_NAME;
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
      return (<div className='flex flex-row justify-center'>{columnName}<ChevronUpIcon className='w-5' /></div>);
    } else if (DESC_DIRECTION === direction) {
      return (<div className='flex flex-row justify-center'>{columnName}<ChevronDownIcon className='w-5' /></div>);
    }
    return columnName;
  }

  return (
    <table className='rounded-sm border-collapse border-2 mt-1 table-fixed'>
      <thead>
        <tr className="capitalize bg-gray-200 border-gray-300">
          {headers.map((header) => {
            return (
              <th key={header} onClick={handleSortClick}
                  className='p-2 border border-gray-300 active:bg-gray-300' >
                {getColumnTitle(header)}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {!loading && data.map((row) => {
          return (
            <tr key={row.id} className='text-left truncate odd:bg-white even:bg-gray-100 hover:bg-sky-50 active:bg-sky-100'
                onClick={(event) => (handleRowClick(event, row.id))}>
              {headers.map((header) => {
                const content = (row as any)[header];
                const isBoolean = typeof content === 'boolean';
                return (
                  <td key={`${header}-${row.id}`} className={clsx(
                    'py-2 px-3',
                    {
                      'flex justify-center items-center': isBoolean
                    }
                  )}>
                    {isBoolean
                      ? content
                        ? <CheckIcon className='w-5 h-5 border rounded-xl text-white bg-green-600 border-green-600' />
                        : <XMarkIcon className='w-5 h-5 border rounded-xl text-white bg-red-600 border-red-600' />
                      : content}
                  </td>
                )
              })}
            </tr>
          )
        })}
        {loading && (<tr><td><Spin /></td></tr>)}
      </tbody>
    </table>
  )
}

export default TableComponent
