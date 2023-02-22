import React from 'react';
import AdminLayout from '@/common/layouts/admin-layout';
import FamilyManage from '@/features/family/family-manage';
import type { GetServerSideProps } from 'next';
import type { IFamilyModel } from '@/models/family';
import type { NextPageWithLayout } from '@/_app';

type PageProps = {
  familyList: IFamilyModel[]
}

const PersonManagePage: NextPageWithLayout = () => {
  return <FamilyManage />;
};

PersonManagePage.getLayout = (page) => (
  <AdminLayout
    title='Quản lí gia đình'
    subtitle='Sắp xếp, thay đổi danh sách gia đình trong gia phả'
  >
    {page}
  </AdminLayout>
);

const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default PersonManagePage;
