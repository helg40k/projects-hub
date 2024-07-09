import {LinkIcon, ArrowRightEndOnRectangleIcon, UserIcon, PowerIcon} from '@heroicons/react/24/outline';

export interface MenuItem {
  title: string;
  icon?: typeof LinkIcon;
  route?: string;
  children?: MenuItem[];
}

const ACCOUNT_MENU: MenuItem[] = [
  {
    title: "Log out",
    icon: PowerIcon,
    route: "/",
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