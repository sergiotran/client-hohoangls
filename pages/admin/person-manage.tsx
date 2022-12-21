import React from 'react';
import { NextPageWithLayout } from '@/_app';
import AdminLayout from '@/common/layouts/admin-layout';

const PersonManagePage: NextPageWithLayout = () => {
  return <div>
    fasdf<br />
  </div>;
};

PersonManagePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default PersonManagePage;