import { NextPageWithLayout } from '@/_app';
import AdminLayout from '@/common/layouts/admin-layout';
import React from 'react';

const BlogPostsPage: NextPageWithLayout = () => {
  return <div>BlogPostsPage</div>;
};

BlogPostsPage.getLayout = (page) => <AdminLayout title='Quanr lí trang tĩnh'>{page}</AdminLayout>;

export default BlogPostsPage;
