import { IMeta, BookingResponse } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BOOKINGS_URL = "/bookings";

export const bookingApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		bookings: build.query({
			query: (arg: Record<string, any>) => ({
				url: BOOKINGS_URL,
				method: "GET",
				params: arg,
			}),
			transformResponse: (response: BookingResponse, meta: IMeta) => {
				return {
					bookings: response,
					meta,
				};
			},
			providesTags: [tagTypes.booking],
		}),

		addBooking: build.mutation({
			query: (data) => ({
				url: BOOKINGS_URL,
				method: "POST",
				data,
			}),
			invalidatesTags: [tagTypes.booking],
		}),

		// get single department by id 
		booking: build.query({
			query: (id) => ({
				url: `${BOOKINGS_URL}/${id}`,
				method: "GET",
			}),
			providesTags: [tagTypes.booking],
		}),
		bookingByCourseId: build.query({
			query: (id) => ({
				url: `${BOOKINGS_URL}/${id}/course`,
				method: "GET",
			}),
			transformResponse: (response: BookingResponse, meta: IMeta) => {
				return {
					courseBooking: response,
					meta,
				};
			},
			providesTags: [tagTypes.booking],
		}),

		// update single department by id
		updateBooking: build.mutation({
			query: (data) => ({
				url: `${BOOKINGS_URL}/${data.id}`,
				method: "PATCH",
				data: data.body,
			}),
			invalidatesTags: [tagTypes.booking],
		}),

		// delete single department by id
		deleteBooking: build.mutation({
			query: (id) => ({
				url: `${BOOKINGS_URL}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [tagTypes.booking],
		}),
	}),
});

export const {

	useBookingQuery,
	useBookingsQuery,
	useAddBookingMutation,
	useUpdateBookingMutation,
	useDeleteBookingMutation,
	useBookingByCourseIdQuery

} = bookingApi;
