import React from 'react';
import AdminNavigation from '../components/admin-navigation';
import Container from '../components/container';
import Head from 'next/head';

type Props = React.PropsWithChildren & {
  title: string;
  subtitle?: string;
};

const AdminLayout: React.FC<Props> = ({ children, title, subtitle }) => {
  return (
    <div className='flex flex-row h-full'>
      <Head>
        <title>{title}</title>
      </Head>
      <AdminNavigation />
      <main className='flex-1 p-5 overflow-auto max-h-full'>
        <Container>
          <header className='p-3 bg-green-500 text-white rounded shadow-lg mb-5'>
            <h2 className='text-xl text-left font-medium'>{title}</h2>
            {!!subtitle && (
              <p className='text-sm text-left font-normal'>{subtitle}</p>
            )}
          </header>
          {children}
        </Container>
      </main>
    </div>
  );
};

export default AdminLayout;
