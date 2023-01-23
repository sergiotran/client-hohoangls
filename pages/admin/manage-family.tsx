import React from 'react';
import { NextPageWithLayout } from '@/_app';
import AdminLayout from '@/common/layouts/admin-layout';
import PersonManageUI from '@/features/generation-family/view/family-manage.view';
import { fetchPersons } from '@/features/generation-family/generation-slice';
import { useAppDispatch } from '@/common/app/store';

const PersonManagePage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchPersons());
  }, []);

  return <PersonManageUI />;
};

PersonManagePage.getLayout = (page) => <AdminLayout title='Quản lí gia đình'>{page}</AdminLayout>;

export default PersonManagePage;