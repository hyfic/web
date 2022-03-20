import React from 'react';
import { useState } from '@hookstate/core';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from './graphql/mutation';
import { setUser } from '@/utils/user.util';
import { Paths } from '@/utils/paths';

// TODO: redirect path according `?next` in the URL

export const LoginForm = () => {
  const router = useRouter();

  const emailState = useState('');
  const passwordState = useState('');
  const loadingState = useState(false);

  const [loginUser] = useMutation(LOGIN_USER);

  const handleLogin = (e: any) => {
    e.preventDefault();
    loadingState.set(true);

    const formData = {
      email: emailState.get(),
      password: passwordState.get(),
    };

    loginUser({ variables: formData })
      .then(({ data }) => {
        const responseData = data?.loginUser;
        setUser(responseData);

        router.push(Paths.app);
      })
      .catch((err) => {
        alert(err?.message);
      })
      .finally(() => {
        emailState.set('');
        passwordState.set('');
        loadingState.set(false);
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type='email'
        placeholder='email'
        onChange={(e) => emailState.set(e.target.value)}
        value={emailState.get()}
        required
      />
      <input
        type='password'
        placeholder='password'
        onChange={(e) => passwordState.set(e.target.value)}
        value={passwordState.get()}
        required
      />
      <button type='submit'>Login</button>
    </form>
  );
};
