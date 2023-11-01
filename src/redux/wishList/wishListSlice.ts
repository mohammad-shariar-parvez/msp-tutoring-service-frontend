
import { IService } from "@/types";
import { getFromLocalStorage } from "@/utils/local-storage";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const storedWishList = getFromLocalStorage('wishList');

const parsedWishList = storedWishList
	? JSON.parse(storedWishList)
	: {
		courses: [],
		total: 0,
	};

interface ICart {
	courses: IService[];
	total: number;
}

const initialState: ICart = parsedWishList;

const wishListSlice = createSlice({
	name: "wishList",
	initialState,
	reducers: {
		addCourseWishList: (state, action: PayloadAction<IService>) => {
			const existing = state.courses.find(
				(course) => course?.id === action?.payload?.id,
			);

			if (!existing) {
				state?.courses?.push({ ...action.payload });
				state.total += 1;
			}


			localStorage.setItem(
				"wishList",
				JSON.stringify({
					courses: state.courses,
					total: state.total,
				}),
			);
		},

		removeCourseWishList: (state, action: PayloadAction<IService>) => {
			state.courses = state.courses.filter(
				(product) => product.id !== action.payload.id,
			);
			state.total -= 1;
			localStorage.setItem(
				"wishList",
				JSON.stringify({
					courses: state.courses,
					total: state.total,
				}),
			);
		},
		lStorgeWishList: (state, action: PayloadAction<ICart>) => {
			state.courses = action.payload?.courses;
			state.total = action.payload.total;
		},
	},
});

export const { addCourseWishList, removeCourseWishList, lStorgeWishList } =
	wishListSlice.actions;

export default wishListSlice.reducer;
