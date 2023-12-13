import { ICategory } from "@/types";


export const getCategoryOptions = (categoryData: ICategory | undefined): { label: string, value: string; }[] => {
	return categoryData?.map((category: ICategory) => ({ value: category.id, label: category.title })) || [];
};
