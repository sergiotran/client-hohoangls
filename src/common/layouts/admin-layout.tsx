import React from 'react';
import AdminNavigation from '../components/admin-navigation';
import Container from '../components/container';

type Props = React.PropsWithChildren;

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className='flex flex-row h-full'>
      <AdminNavigation />
      <main className='flex-1 p-5 overflow-auto max-h-full'>
        <Container>{children}</Container>
      </main>
    </div>
  );
};

export default AdminLayout;
