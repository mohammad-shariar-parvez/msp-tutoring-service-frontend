import { IMeta, BookingResponse } from '@/types';
import { tagTypes } from '../tag-types';
import { baseApi } from './baseApi';

const FEEDBACK_URL = '/feedbacks';
const QUESTIONS_URL = '/feedbacks/questions';
import { useSession, getSession } from 'next-auth/react';
// const prepareHeaders = (headers, { getState }) => {
//   // Get the access token from the Next.js session
//   const accessToken = getState().yourSessionSlice.accessToken;
//   const janina = getSession();
//   console.log(janina);

//   if (accessToken) {
//     // Add the authorization header if the access token is available
//     headers.set('Authorization', `Bearer ${accessToken}`);
//   }

//   return headers;
// };

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    feeedbacks: build.query({
      query: (arg: Record<string, any>) => ({
        url: FEEDBACK_URL,
        method: 'GET',
        params: arg,
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          feedback: response,
          meta,
        };
      },
      providesTags: [tagTypes.feedback],
    }),

    addFeedback: build.mutation({
      query: (data) => ({
        url: FEEDBACK_URL,
        method: 'POST',
        data,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
    // delete single department by id
    deleteFeedback: build.mutation({
      query: (id) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.feedback],
    }),

    //FOR QUESTION
    // get single department by id
    questions: build.query({
      query: (arg: Record<string, any>) => ({
        url: QUESTIONS_URL,
        method: 'GET',
        params: arg,
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          question: response,
          meta,
        };
      },
      providesTags: [tagTypes.questions],
    }),
    addQuestion: build.mutation({
      query: (data) => ({
        url: QUESTIONS_URL,
        method: 'POST',
        data,
      }),
      invalidatesTags: [tagTypes.questions],
    }),

    // update single department by id
    deleteQuestions: build.mutation({
      query: (id) => ({
        url: `${QUESTIONS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.questions],
    }),
  }),
});

export const {
  useFeeedbacksQuery,
  useAddFeedbackMutation,
  useDeleteFeedbackMutation,
  useQuestionsQuery,
  useAddQuestionMutation,
  useDeleteQuestionsMutation,
} = feedbackApi;
