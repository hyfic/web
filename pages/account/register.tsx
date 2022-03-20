import React from 'react';
import type { NextPage } from 'next';
import { Layout } from '@/components/core/Layout';
import { RegisterForm } from '@/components/account/register/RegisterForm';

const Register: NextPage = () => {
  return (
    <Layout title='Register' description='Register to use hyfic'>
      <RegisterForm />
    </Layout>
  );
};

export default Register;
