import { NextPageWithLayout } from '@/_app';
import AdminLayout from '@/common/layouts/admin-layout';
import React from 'react';

const BlogPostsPage: NextPageWithLayout = () => {
  return <div>BlogPostsPage</div>;
};

BlogPostsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default BlogPostsPage;
