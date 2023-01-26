import React from 'react';
import AdminNavigation from '../components/admin-navigation';
import Container from '../components/container';
import Head from 'next/head';

type Props = React.PropsWithChildren & {
  title: string;
};

const AdminLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <div className='flex flex-row h-full'>
      <Head>
        <title>{title}</title>
      </Head>
      <AdminNavigation />
      <main className='flex-1 p-5 overflow-auto max-h-full'>
        <Container>
          <header className='p-3 bg-gray-100 rounded shadow-lg mb-5'>
            <h2 className='text-xl text-left'>{title}</h2>
          </header>
          {children}
        </Container>
      </main>
    </div>
  );
};

export default AdminLayout;
