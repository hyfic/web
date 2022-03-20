import { getUserFromCookie } from '@/utils/cookie';
import { UserType } from '@/utils/types';
import { createState } from '@hookstate/core';

export const userStore = createState<UserType | null>(getUserFromCookie);
