import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import classNames from 'classnames';

type NavigationItemProps = {
  value: string;
  href: string;
  active?: boolean;
}

const NAVIGATION_ITEMS: NavigationItemProps[] = [
  {value: 'Quản lí & Sắp xếp', href: '/admin/person-manage'},
  {value: 'Hệ thống bài viết', href: '/admin/blog-posts'},
  {value: 'Thư viện', href: '/admin/gallery'},
  {value: 'Về trang chính', href: '/'},
];

const AdminNavigation = () => {
  const router = useRouter();

  return (
    <nav className='relative w-64 bg-white shadow-lg h-full p-2'>
      <ul className=''>
        {NAVIGATION_ITEMS.map((itemProps) => {
          const isActive = router.pathname === itemProps.href;
          return (
            <NavigationItem
              key={itemProps.href}
              {...itemProps}
              active={isActive}
            />
          );
        })}
      </ul>
    </nav>
  );
};

const NavigationItem: React.FC<NavigationItemProps> = ({
  value,
  href,
  active,
}) => {
  const classes = classNames({
    'px-4 py-3 block transition m-3 rounded shadow-lg font-bold text-sm text-black border-l-4 border-green-800': true,
    'bg-green-600 text-white': active,
  });
  return (
    <li className='relative'>
      <Link className={classes} href={href}>
        {value}
      </Link>
    </li>
  );
};

export default AdminNavigation;
