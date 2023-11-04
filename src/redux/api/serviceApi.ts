// import { IService, IMeta, ICourse } from "@/types";
// import { tagTypes } from "../tag-types";
// import { baseApi } from "./baseApi";

// const SERVICE_URL = "/courses";

// export const serviceApi = baseApi.injectEndpoints({
//   endpoints: (build) => ({
//     services: build.query({
//       query: (arg: Record<string, any>) => ({
//         url: SERVICE_URL,
//         method: "GET",
//         params: arg,
//       }),
//       transformResponse: (response: IService, meta: IMeta) => {
//         return {
//           services: response,
//           meta,
//         };
//       },
//       providesTags: [tagTypes.service],
//     }),

//     addService: build.mutation({
//       query: (data) => ({
//         url: SERVICE_URL,
//         method: "POST",
//         data,
//       }),
//       invalidatesTags: [tagTypes.service],
//     }),
//     servicesByCategory: build.query({
//       query: (id) => {
//         return {
//           url: `${SERVICE_URL}/${id}/category`,
//           method: "GET",

//         };
//       },
//       transformResponse: (response: ICourse[], meta: IMeta) => {
//         return {
//           courses: response,
//           meta,
//         };
//       },
//       providesTags: [tagTypes.service],
//     }),

//     // get single department by id
//     service: build.query({
//       query: (id) => ({
//         url: `${SERVICE_URL}/${id}`,
//         method: "GET",
//       }),
//       providesTags: [tagTypes.service],
//     }),

//     // update single department by id
//     updateService: build.mutation({
//       query: (data) => ({
//         url: `${SERVICE_URL}/${data.id}`,
//         method: "PATCH",
//         data: data.body,
//       }),
//       invalidatesTags: [tagTypes.service],
//     }),

//     // delete single department by id
//     deleteService: build.mutation({
//       query: (id) => ({
//         url: `${SERVICE_URL}/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: [tagTypes.service],
//     }),
//   }),
// });

// export const {
//   useServicesQuery,
//   useAddServiceMutation,
//   useServiceQuery,
//   useUpdateServiceMutation,
//   useServicesByCategoryQuery,
//   useDeleteServiceMutation,
// } = serviceApi;
