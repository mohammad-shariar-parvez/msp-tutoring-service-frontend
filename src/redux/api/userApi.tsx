import { IMeta, IUserResponse } from '@/types';
import { tagTypes } from '../tag-types';
import { baseApi } from './baseApi';

const USERS_URL = '/users';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    users: build.query({
      query: (arg: Record<string, any>) => ({
        url: USERS_URL,
        method: 'GET',
        params: arg,
      }),
      transformResponse: (response: IUserResponse, meta: IMeta) => {
        return {
          users: response,
          meta,
        };
      },
      providesTags: [tagTypes.validUser],
    }),

    addUser: build.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: 'POST',
        data,
      }),
      invalidatesTags: [tagTypes.validUser],
    }),

    // get single department by id
    user: build.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.validUser],
    }),

    // update single department by id
    updateUser: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: 'PATCH',
        data: data.body,
      }),
      invalidatesTags: [tagTypes.validUser],
    }),

    // delete single department by id
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.validUser],
    }),
  }),
});

export const {
  useUserQuery,
  useUsersQuery,
  useDeleteUserMutation,
  useAddUserMutation,
  useUpdateUserMutation,
} = usersApi;
