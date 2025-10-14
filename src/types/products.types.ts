export type ProductListsType = ProductType[];

export interface CategoryType {
	id: number;
	name: string;
	slug: string;
	image: string;
	creationAt: string;
	updatedAt: string;
}

export interface ProductType {
	id: number;
	title: string;
	slug: string;
	price: number;
	description: string;
	category: CategoryType;
	images: string[];
	creationAt: string;
	updatedAt: string;
}
