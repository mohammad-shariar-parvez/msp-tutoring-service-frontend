import { IMeta, BookingResponse } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BLOGS_URL = "/blogs";

export const blogApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		blogs: build.query({
			query: (arg: Record<string, any>) => ({
				url: BLOGS_URL,
				method: "GET",
				params: arg,
			}),
			transformResponse: (response: any, meta: IMeta) => {
				return {
					blogs: response,
					meta,
				};
			},
			providesTags: [tagTypes.blogs],
		}),

		addBlog: build.mutation({
			query: (data) => ({
				url: BLOGS_URL,
				method: "POST",
				data,
			}),
			invalidatesTags: [tagTypes.blogs],
		}),

		// get single department by id
		blog: build.query({
			query: (id) => ({
				url: `${BLOGS_URL}/${id}`,
				method: "GET",
			}),
			providesTags: [tagTypes.blogs],
		}),

		// update single department by id
		updateBlogs: build.mutation({
			query: (data) => ({
				url: `${BLOGS_URL}/${data.id}`,
				method: "PATCH",
				data: data.body,
			}),
			invalidatesTags: [tagTypes.blogs],
		}),

		// delete single department by id
		deleteBlogs: build.mutation({
			query: (id) => ({
				url: `${BLOGS_URL}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [tagTypes.blogs],
		}),
	}),
});

export const {
	useBlogsQuery,
	useBlogQuery,
	useAddBlogMutation,
	useDeleteBlogsMutation,
	useUpdateBlogsMutation


} = blogApi;
