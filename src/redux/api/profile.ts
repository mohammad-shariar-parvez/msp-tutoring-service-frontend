import { IMeta, IProfile } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PROFILE_URL = "/profile";

export const profileApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		profile: build.query({
			query: () => ({
				url: PROFILE_URL,
				method: "GET",

			}),
			transformResponse: (response: IProfile,) => {
				return {
					profile: response,

				};
			},
			providesTags: [tagTypes.profile],
		}),

		addProfile: build.mutation({
			query: () => ({
				url: PROFILE_URL,
				method: "POST",

			}),
			invalidatesTags: [tagTypes.profile],
		}),




		// update single department by id
		updateProfile: build.mutation({
			query: (data) => ({
				url: PROFILE_URL,
				method: "PATCH",
				data: data.body,
			}),
			invalidatesTags: [tagTypes.profile],
		}),


	}),
});

export const {
	useProfileQuery,
	useAddProfileMutation,
	useUpdateProfileMutation
} = profileApi;
