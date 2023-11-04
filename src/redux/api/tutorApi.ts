import { IMeta, } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const TUTORS_URL = "/tutors";

export const tutorApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		tutors: build.query({
			query: (arg: Record<string, any>) => ({
				url: TUTORS_URL,
				method: "GET",
				params: arg,
			}),
			transformResponse: (response: any, meta: IMeta) => {
				return {
					tutors: response,
					meta,
				};
			},
			providesTags: [tagTypes.tutors],
		}),

		addTutor: build.mutation({
			query: (data) => ({
				url: TUTORS_URL,
				method: "POST",
				data,
			}),
			invalidatesTags: [tagTypes.tutors],
		}),

		// get single department by id
		tutor: build.query({
			query: (id) => ({
				url: `${TUTORS_URL}/${id}`,
				method: "GET",
			}),
			providesTags: [tagTypes.tutors],
		}),

		// update single department by id
		updateTutor: build.mutation({
			query: (data) => ({
				url: `${TUTORS_URL}/${data.id}`,
				method: "PATCH",
				data: data.body,
			}),
			invalidatesTags: [tagTypes.tutors],
		}),

		// delete single department by id
		deleteTutor: build.mutation({
			query: (id) => ({
				url: `${TUTORS_URL}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [tagTypes.tutors],
		}),
	}),
});

export const {
	useTutorsQuery,
	useTutorQuery,
	useAddTutorMutation,
	useUpdateTutorMutation,
	useDeleteTutorMutation


} = tutorApi;
