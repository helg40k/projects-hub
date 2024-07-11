import {LinkIcon, ArrowRightEndOnRectangleIcon, UserIcon, PowerIcon} from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';

export interface MenuItem {
  title: string;
  icon?: typeof LinkIcon;
  route?: string;
  children?: MenuItem[];
  handleClick?: Function;
}

const ACCOUNT_MENU: MenuItem[] = [
  {
    title: "Log out",
    icon: PowerIcon,
    handleClick: () => signOut({ callbackUrl: '/' }),
  }
]

const TEST_MENU: MenuItem[] = [
  {
    title: "Hinkle Horns",
    route: "/products/hinkle-horns",
  },
  {
    title: "Zizzer-Zazzers",
    icon: UserIcon,
    children: [
      {
        title: "Zizzer",
        route: "/products/zizzer",
        icon: PowerIcon
      },
      {
        title: "Zazzers",
        route: "/products/zazzers",
      }
    ]
  },
  {
    title: "Doozers",
    route: "/products/doozers",
    icon: ArrowRightEndOnRectangleIcon,
  },
];

export {
  TEST_MENU,
  ACCOUNT_MENU
};