import React from 'react';
import { NextPageWithLayout } from '@/_app';
import AdminLayout from '@/common/layouts/admin-layout';
import { GetServerSideProps } from 'next';
import { IPerson } from '@/models/person';
import { getPersons } from '@/features/person/person-api';
import PersonManageUI from '@/features/person/person-manage-ui';

type Props = {
  persons: SortablePerson[];
};
export type SortablePerson = IPerson & {
  id: string;
  childrens: SortablePerson[];
};

const PersonManagePage: NextPageWithLayout<Props> = ({ persons }) => {
  return (
    <PersonManageUI
      persons={persons.map((person) => ({
        ...person,
        id: person._id,
      }))}
    />
  );
};

PersonManagePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export const getServerSideProps: GetServerSideProps = async () => {
  const persons = await getPersons();
  return {
    props: {
      persons,
    },
  };
};

export default PersonManagePage;