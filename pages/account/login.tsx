import { LoginForm } from '@/components/account/login/LoginForm';
import { Layout } from '@/components/core/Layout';
import type { NextPage } from 'next';

const Login: NextPage = () => {
  return (
    <Layout title='Login' description='Login to use hyfic'>
      <LoginForm />
    </Layout>
  );
};

export default Login;
