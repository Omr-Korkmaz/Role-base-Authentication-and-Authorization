import { Prisma } from '@prisma/client';

export const customers: Prisma.CustomerUpsertArgs['create'][] = [
  {
    id: '9e391faf-64b2-4d4c-b879-463532920fd3',
    email: 'user@gmail.com',
    username:'testUser',
    password: 'randow-password',
    role:'USER'
  },
  {
    id: '9e391faf-64b2-4d4c-b879-463532920fd4',
    email: 'user2@gmail.com',
    username:'testAdmin',
    password: 'randow-password',
    role:'ADMIN'
  },
];
