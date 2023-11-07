import { IMeta, } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const USER_PAYMENT = "/payments";

const paymentApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		myPayments: build.query({
			query: (arg: Record<string, any>) => {
				return {
					url: USER_PAYMENT,
					method: "GET",
					params: arg,
				};
			},
			transformResponse: (response: any[], meta: IMeta) => {
				return {
					myPayments: response,
					meta,
				};
			},
			providesTags: [tagTypes.payment],
		}),
		initialPayment: build.mutation({
			query: (data: any) => ({
				url: `${USER_PAYMENT}/init`,
				method: "POST",
				data,
			}),
			invalidatesTags: [tagTypes.payment],
		}),
	}),
});

export const { useMyPaymentsQuery, useInitialPaymentMutation } = paymentApi;

export default paymentApi;
