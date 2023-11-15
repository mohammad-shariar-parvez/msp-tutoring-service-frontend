import { IMeta, INotification } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const NOTIFICATION_URL = "/notification";

export const notificationApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		notifications: build.query({
			query: (arg: Record<string, any>) => ({
				url: NOTIFICATION_URL,
				method: "GET",
				params: arg,
			}),
			transformResponse: (response: any, meta: IMeta) => {
				return {
					notification: response,
					meta,
				};
			},
			providesTags: [tagTypes.notification],
		}),

		addNotification: build.mutation({
			query: (data) => ({
				url: NOTIFICATION_URL,
				method: "POST",
				data,
			}),
			invalidatesTags: [tagTypes.notification],
		}),




		deleteNotification: build.mutation({
			query: (id) => ({
				url: `${NOTIFICATION_URL}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [tagTypes.notification],
		}),
	}),
});

export const {
	useDeleteNotificationMutation,
	useAddNotificationMutation,
	useNotificationsQuery


} = notificationApi;
