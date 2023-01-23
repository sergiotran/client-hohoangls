import { NextPageWithLayout } from '@/_app';
import AdminLayout from '@/common/layouts/admin-layout';
import React from 'react';

const GalleryPage: NextPageWithLayout = () => {
  return <div>GalleryPage</div>;
};

GalleryPage.getLayout = (page) => (
  <AdminLayout title='Quản lí tệp ảnh và video'>{page}</AdminLayout>
);

export default GalleryPage;
