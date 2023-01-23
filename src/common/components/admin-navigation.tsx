import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import ChevronDown from '../assets/icons/chevron-down';
import ChevronUp from '../assets/icons/chevron-up';
import UsersIcon from '../assets/icons/users-icon';
import BookOpen from '../assets/icons/book-open';
import ImageIcon from '../assets/icons/image-icon';

type NavigationItemProps = {
  value: string;
  icon?: React.ReactNode;
  href: string;
  active?: boolean;
  isChildren?: boolean;
  children?: NavigationItemProps[];
};
type NavigationListProps = {
  items: NavigationItemProps[];
  isChildren?: boolean;
}

const ICON_SIZE = 20;
const NAVIGATION_ITEMS: NavigationItemProps[] = [
  {
    value: 'Thiết lập cây thế hệ',
    icon: <UsersIcon width={ICON_SIZE} height={ICON_SIZE} />,
    href: '/admin/manage-family',
    children: [
      { value: 'Gia đình', href: '/admin/manage-family' },
      { value: 'Thành viên gia đình', href: '/admin/manage-person' },
    ],
  },
  {
    value: 'Bài viết & Trang tĩnh',
    href: '/admin/article-cms',
    icon: <BookOpen width={ICON_SIZE} height={ICON_SIZE} />,
    children: [
      { value: 'Bài viết', href: '/admin/article-cms' },
      { value: 'Trang tĩnh', href: '/admin/page-cms' },
    ],
  },
  {
    value: 'Ảnh và videos',
    icon: <ImageIcon width={ICON_SIZE} height={ICON_SIZE} />,
    href: '/admin/gallery',
  },
  { value: 'Về trang chính', href: '/' },
];

const AdminNavigation = () => {
  return (
    <nav className='relative w-64 bg-white shadow-lg h-full p-0'>
      <header className='relative shadow-lg p-3 bg-gray-100 h-40 overflow-hidden w-full'>
        <h1 className='text-lg font-bold text-black absolute bottom-0 left-0 w-full p-3 text-white drop-shadow-xl z-10'>
          HoHoangLS Quản trị
        </h1>
        <Image src='/images/lang-son.jpg' fill alt='HoHoangLS' />
      </header>
      <NavigationList items={NAVIGATION_ITEMS} />
    </nav>
  );
};

const NavigationList: React.FC<NavigationListProps> = ({
  items,
  isChildren = false,
}) => {
  const router = useRouter();
  const classes = classNames({
    'divide-y divide-y-1': true,
    'p-2 bg-gray-100': isChildren,
  });
  return (
    <ul className={classes}>
      {items.map((itemProps) => {
        const isActive =
          router.pathname === itemProps.href ||
          (itemProps.children &&
            itemProps.children.some(
              (childrenItem) => router.pathname === childrenItem.href,
            ));
        return (
          <NavigationItem
            key={itemProps.value}
            {...itemProps}
            active={isActive}
            isChildren={isChildren}
          />
        );
      })}
    </ul>
  );
};

const NavigationItem: React.FC<NavigationItemProps> = ({
  value,
  href,
  active,
  children,
  icon,
  isChildren,
}) => {
  const classes = classNames({
    'px-4 py-3 flex flex-row transition font-bold text-sm text-black': true,
    'bg-green-600 text-white': active && !isChildren,
    'bg-gray-300 text-black rounded': active && isChildren,
  });
  return (
    <li className='relative'>
      <Link className={classes} href={href}>
        {icon && <i className='mr-3'>{icon}</i>}
        <span className='flex-1'>{value}</span>
        {children && children.length > 0 ? (
          active ? (
            <ChevronUp width={ICON_SIZE} height={ICON_SIZE} />
          ) : (
            <ChevronDown width={ICON_SIZE} height={ICON_SIZE} />
          )
        ) : null}
      </Link>
      {active && children && children.length > 0 && (
        <NavigationList items={children} isChildren />
      )}
    </li>
  );
};

export default AdminNavigation;
