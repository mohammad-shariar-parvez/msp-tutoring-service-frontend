import { ICategory, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const CATEGORY_URL = "/categories";

export const categoryApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		categories: build.query({
			query: (arg: Record<string, any>) => ({
				url: CATEGORY_URL,
				method: "GET",
				params: arg,
			}),
			transformResponse: (response: ICategory, meta: IMeta) => {
				return {
					categories: response,
					meta,
				};
			},
			providesTags: [tagTypes.category],
		}),

		addCategory: build.mutation({
			query: (data) => ({
				url: CATEGORY_URL,
				method: "POST",
				data
			}),
			invalidatesTags: [tagTypes.category],
		}),

		// get single department by id
		category: build.query({
			query: (id) => ({
				url: `${CATEGORY_URL}/${id}`,
				method: "GET",
			}),
			providesTags: [tagTypes.category],
		}),

		// update single department by id
		updateCategory: build.mutation({
			query: (data) => ({
				url: `${CATEGORY_URL}/${data.id}`,
				method: "PATCH",
				data: data.body,
			}),
			invalidatesTags: [tagTypes.category],
		}),

		// delete single department by id
		deleteCategory: build.mutation({
			query: (id) => ({
				url: `${CATEGORY_URL}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [tagTypes.category],
		}),
	}),
});

export const {
	useCategoriesQuery,
	useCategoryQuery,
	useAddCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation
} = categoryApi;
