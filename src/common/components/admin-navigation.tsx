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
  {value: 'Person Manage', href: '/admin/person-manage'},
  {value: 'Blog & Posts', href: '/admin/blog-posts'},
  {value: 'View Pages', href: '/'},
];

const AdminNavigation = () => {
  const router = useRouter();

  return (
    <nav className='relative w-64 bg-white shadow-lg h-full'>
      <ul className='divide-y divide-gray'>
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
    'px-4 py-3 block hover:bg-gray-100 transition': true,
    'bg-gray-100': active,
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
