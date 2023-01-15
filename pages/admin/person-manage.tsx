import React from 'react';
import { NextPageWithLayout } from '@/_app';
import AdminLayout from '@/common/layouts/admin-layout';
import PersonManageUI from '@/features/person/person-manage-ui';
import { fetchPersons } from '@/features/person/person-slice';
import { useAppDispatch } from '@/app/store';

const PersonManagePage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchPersons());
  }, []);

  return <PersonManageUI />;
};

PersonManagePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default PersonManagePage;