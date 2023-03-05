import withAuth from '@/common/hoc/withAuth';
import React from 'react';
import type { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = () => {
  return <div>HomePage</div>;
};

export default withAuth(HomePage);
