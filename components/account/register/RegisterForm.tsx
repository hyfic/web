import React from 'react';
import { useState } from '@hookstate/core';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { getUserAvatar } from '@/utils/avatars';
import { REGISTER_USER } from './graphql/mutation';
import { setUser } from '@/utils/user.util';
import { Paths } from '@/utils/paths';

export const RegisterForm = () => {
  const router = useRouter();

  const nameState = useState('');
  const emailState = useState('');
  const passwordState = useState('');
  const loadingState = useState(false);

  const [registerUser] = useMutation(REGISTER_USER);

  const handleRegister = (e: any) => {
    e.preventDefault();
    loadingState.set(true);

    const formData = {
      name: nameState.get(),
      email: emailState.get(),
      password: passwordState.get(),
      profile: getUserAvatar(nameState.get()),
    };

    registerUser({ variables: formData })
      .then(({ data }) => {
        const responseData = data?.registerUser;
        setUser(responseData);

        router.push(Paths.app);
      })
      .catch((err) => {
        alert(err?.message);
      })
      .finally(() => {
        nameState.set('');
        emailState.set('');
        passwordState.set('');
        loadingState.set(false);
      });
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type='text'
        placeholder='name'
        onChange={(e) => nameState.set(e.target.value)}
        value={nameState.get()}
        required
      />
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
      <button type='submit'>Register</button>
    </form>
  );
};
