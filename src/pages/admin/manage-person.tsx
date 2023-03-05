import AdminLayout from '@/common/layouts/admin-layout';
import type { NextPageWithLayout } from 'pages/_app';
import React from 'react';

const ManagePerson: NextPageWithLayout = () => {
  return <div>ManagePerson</div>;
};

ManagePerson.getLayout = (page) => (
  <AdminLayout title='Quản lí thành viên gia đình'>{page}</AdminLayout>
);

export default ManagePerson;
