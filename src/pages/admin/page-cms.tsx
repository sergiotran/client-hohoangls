import AdminLayout from '@/common/layouts/admin-layout';
import type { NextPageWithLayout } from 'pages/_app';
import React from 'react';

const BlogPostsPage: NextPageWithLayout = () => {
  return <div>BlogPostsPage</div>;
};

BlogPostsPage.getLayout = (page) => (
  <AdminLayout title='Quản lí trang tĩnh'>{page}</AdminLayout>
);

export default BlogPostsPage;
