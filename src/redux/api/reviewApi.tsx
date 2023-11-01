import { ICourse, IMeta, IReview } from '@/types';
import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

const REVIEW_URL = '/reviews';

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all
    reviews: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: REVIEW_URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: IReview[], meta: IMeta) => {
        return {
          reviews: response,
          meta,
        };
      },
      providesTags: [tagTypes.review],
    }),
    review: build.query({
      query: (id: string) => ({
        url: `${REVIEW_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.course],
    }),
    addReview: build.mutation({
      query: (data) => ({
        url: REVIEW_URL,
        method: 'POST',
        data,
      }),
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const { useAddReviewMutation, useReviewsQuery, useReviewQuery } =
  reviewApi;
