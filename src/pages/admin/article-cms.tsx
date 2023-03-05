import AdminLayout from '@/common/layouts/admin-layout';
import type { NextPageWithLayout } from 'pages/_app';
import React from 'react';

const ArticleCMSPage: NextPageWithLayout = () => {
  return <div>ArticleCMSPage</div>;
};

ArticleCMSPage.getLayout = (page) => (
  <AdminLayout title='Quản lí bài viết'>{page}</AdminLayout>
);

export default ArticleCMSPage;
