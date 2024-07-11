'use client';

import {ReactNode, useState} from 'react';
import Link from 'next/link';
import {LinkIcon} from '@heroicons/react/24/outline';
import useWindowSize from "@/app/lib/hooks/use-window-size";

import { MenuItem } from '@/app/lib/constants/dropdown-menu';

const Dropdown = ({ items, icon, children }:{ items:MenuItem[], icon?:typeof LinkIcon, children:ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [positionClass, setPositionClass] = useState<string>('left-0');

  const ButtonIcon = icon;
  const windowSize = useWindowSize();

  const toggle = () => {
    setIsOpen(old => !old);
  }

  const transClass = isOpen ? "flex" : "hidden";

  const handleDropdownPosition = (element:HTMLElement|null) => {
    if (element) {
      const x = element.getBoundingClientRect().x;
      if (windowSize.width) {
        if (windowSize.width / 2 < x) {
          setPositionClass('right-0');
        } else {
          setPositionClass('left-0');
        }
      }
      return;
    }
  }

  return (
    <>
      <div className="relative text-gray-700">
        <button ref={handleDropdownPosition} className="grid grid-flow-col auto-cols-max gap-1 items-center hover:text-cyan-300 whitespace-nowrap px-3 py-1" onClick={toggle}>
          {ButtonIcon && (
            <ButtonIcon className='w-5 h-5' />
          )}
          {children}
        </button>
        <div className={`absolute ${positionClass} z-30 flex flex-col w-fit py-1 bg-gray-300 rounded-md ${transClass}`}>
          {items.map((item:MenuItem) => {
            const itemTitle = item.title;
            const LinkIcon = item.icon;
            const children = item.children;
            return children && 0 < children.length ?
              (
                <div key={`node-${itemTitle}`} className='hover:bg-gray-400 hover:text-cyan-300 whitespace-nowrap'>
                  <Dropdown items={children} icon={LinkIcon} >{`${itemTitle} >>`}</Dropdown>
                </div>
              ) : (
                <Link
                  key={item.route || `link-${itemTitle}`}
                  className="grid grid-flow-col auto-cols-max gap-1 items-center hover:bg-gray-400 hover:text-cyan-300 px-3 py-1 whitespace-nowrap"
                  href={item.route || ''}
                  onClick={() => {
                    toggle();
                    if (item.handleClick) {
                      item.handleClick();
                    }
                  }}
                >
                  {LinkIcon && (
                    <LinkIcon className='w-5 h-5' />
                  )}
                  {itemTitle}
                </Link>
              );
            }
          )}
        </div>
      </div>
      {isOpen && (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black/10" onClick={toggle} />
      )}
    </>
  )
}

export default Dropdown;
