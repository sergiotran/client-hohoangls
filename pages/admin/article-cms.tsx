import { NextPageWithLayout } from '@/_app';
import AdminLayout from '@/common/layouts/admin-layout';
import React from 'react';

const ArticleCMSPage: NextPageWithLayout = () => {
  return <div>ArticleCMSPage</div>;
};

ArticleCMSPage.getLayout = (page) => <AdminLayout title='Quản lí bài viết'>{page}</AdminLayout>;

export default ArticleCMSPage;