import React from 'react';
import { NextPageWithLayout } from '@/_app';
import AdminLayout from '@/common/layouts/admin-layout';
import FamilyManageView from '@/features/generation-family/view/family-manage.view';

const PersonManagePage: NextPageWithLayout = () => {
  return <FamilyManageView />;
};

PersonManagePage.getLayout = (page) => (
  <AdminLayout title='Quản lí gia đình'>{page}</AdminLayout>
);

export default PersonManagePage;