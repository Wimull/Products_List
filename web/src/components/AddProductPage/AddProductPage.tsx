import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "..";
import { useForm } from "react-hook-form";

import { AddProductForm, AddProductHeader } from "./components";

export type ProductDataParams = "SKU" | "Name" | "Price" | "Type" | "Property";
export interface ProductDataTypes {
	sku: string;
	name: string;
	price: string;
	type: string;
	property: { type: string; props: object };
}

export function AddProductPage() {
	const {
		register,
		handleSubmit,

		formState: { errors },
	} = useForm();

	function reducerProductData(
		state: ProductDataTypes,
		action: {
			type: ProductDataParams;
			payload: any;
		}
	) {
		switch (action.type) {
			case "SKU":
				return { ...state, sku: action.payload };
			case "Name":
				return { ...state, name: action.payload };
			case "Price":
				return { ...state, price: action.payload };
			case "Type":
				return { ...state, type: action.payload };
			case "Property":
				return {
					...state,
					property: {
						type: action.payload.type,
						props: action.payload.props, //Not using spread operator with ...state.property.props so as to be able to reset the data when state.type changes
					},
				};
			default:
				throw new Error(
					"Product type does not exists or is not yet implemented."
				);
		}
	}

	const [productData, dispatchProductData] = useReducer<any>(
		reducerProductData,
		{
			sku: "",
			name: "",
			price: "",
			type: "",
			property: { type: "", props: {} },
		}
	);

	const navigate = useNavigate();
	function handleNewProductSubmit(e: any) {
		console.table(productData);
	}

	return (
		<>
			<form
				id="product_form"
				onSubmit={handleSubmit(handleNewProductSubmit)}
			>
				<AddProductHeader />

				<AddProductForm
					formProps={{
						register: register,
						errors: errors,
					}}
					formData={{
						productData: productData as ProductDataTypes,
						dispatchProductData: dispatchProductData,
					}}
				/>
			</form>
			<Footer />
		</>
	);
}
