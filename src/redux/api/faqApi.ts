import { IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const FAQ_URL = "/contents";

export const faqApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		faqs: build.query({
			query: (arg: Record<string, any>) => ({
				url: FAQ_URL,
				method: "GET",
				params: arg,
			}),
			transformResponse: (response: any, meta: IMeta) => {
				return {
					faqs: response,
					meta,
				};
			},
			providesTags: [tagTypes.faqs],
		}),

		addFaq: build.mutation({
			query: (data) => ({
				url: FAQ_URL,
				method: "POST",
				data,
			}),
			invalidatesTags: [tagTypes.faqs],
		}),


		faq: build.query({
			query: (id) => {
				// console.log(`${FAQ_URL}/${id}`);

				return ({


					url: `${FAQ_URL}/${id}`,
					method: "GET",
				});
			},
			providesTags: [tagTypes.faqs],
		}),

		updateFaqs: build.mutation({
			query: (data) => ({
				url: `${FAQ_URL}/${data.id}`,
				method: "PATCH",
				data: data.body,
			}),
			invalidatesTags: [tagTypes.faqs],
		}),


		deleteFaqs: build.mutation({
			query: (id) => ({
				url: `${FAQ_URL}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [tagTypes.faqs],
		}),
	}),
});

export const {
	useFaqsQuery,
	useFaqQuery,
	useAddFaqMutation,
	useDeleteFaqsMutation,
	useUpdateFaqsMutation


} = faqApi;
