import { baseApi } from "./api/baseApi";
import wishListSlice from "./wishList/wishListSlice";

export const reducer = {
   [baseApi.reducerPath]: baseApi.reducer,
   wishList: wishListSlice,
}

