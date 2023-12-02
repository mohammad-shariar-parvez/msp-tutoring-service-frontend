import { ISubject, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const SUBJECT_URL = "/subjects";

export const subjectApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		// get all
		subjects: build.query({
			query: (arg: Record<string, any>) => {
				return {
					url: SUBJECT_URL,
					method: "GET",
					params: arg,
				};
			},
			transformResponse: (response: ISubject[], meta: IMeta) => {
				return {
					subjects: response,
					meta,
				};
			},
			providesTags: [tagTypes.subject],
		}),

		// get single
		subject: build.query({
			query: (id: string) => ({
				url: `${SUBJECT_URL}/${id}`,
				method: "GET",
			}),
			providesTags: [tagTypes.subject],
		}),

		// create
		addSubject: build.mutation({
			query: (data) => ({
				url: SUBJECT_URL,
				method: "POST",
				data,
			}),
			invalidatesTags: [tagTypes.subject],
		}),
		// update
		updateSubject: build.mutation({
			query: (data) => ({
				url: `${SUBJECT_URL}/${data.id}`,
				method: "PATCH",
				data: data.body,
			}),
			invalidatesTags: [tagTypes.subject],
		}),
		// delete
		deleteSubject: build.mutation({
			query: (id) => ({
				url: `${SUBJECT_URL}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [tagTypes.subject],
		}),
	}),
});

export const {
	useSubjectsQuery,
	useSubjectQuery,
	useAddSubjectMutation,
	useDeleteSubjectMutation,
	useUpdateSubjectMutation,
} = subjectApi;
