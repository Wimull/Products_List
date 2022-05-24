import React, { Reducer, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "..";
import { useForm } from "react-hook-form";

import { AddProductForm, AddProductHeader } from "./components";
import { api } from "../../libs/api";

export enum ProductActionKind {
	SKU = "sku",
	NAME = "name",
	PRICE = "price",
	TYPE = "type",
	PROPERTIES = "properties",
}

export interface ProductStateTypes {
	sku: string;
	name: string;
	price: string;
	type: string;
	properties: string;
}
export interface ProductActionType {
	type: ProductActionKind;
	payload: string;
}

export function AddProductPage() {
	const {
		register,
		handleSubmit,

		formState: { errors },
	} = useForm();

	const reducerProductData: Reducer<ProductStateTypes, ProductActionType> = (
		state,
		action
	) => {
		switch (action.type) {
			case ProductActionKind.SKU:
				return { ...state, sku: action.payload };
			case ProductActionKind.NAME:
				return { ...state, name: action.payload };
			case ProductActionKind.PRICE:
				return { ...state, price: action.payload };
			case ProductActionKind.TYPE:
				return { ...state, type: action.payload };
			case ProductActionKind.PROPERTIES:
				let prop = {
					type: JSON.parse(action.payload).type,
					props: {
						...JSON.parse(state.properties!).props,
						...JSON.parse(action.payload).props,
					},
				};

				return {
					...state,
					properties: JSON.stringify(prop),
				};
			default:
				throw new Error(
					"Product type does not exists or is not yet implemented."
				);
		}
	};

	const [productData, dispatchProductData] = useReducer(reducerProductData, {
		sku: "",
		name: "",
		price: "",
		type: "",
		properties: "[]",
	});

	const navigate = useNavigate();
	function handleNewProductSubmit(e: any) {
		console.log(productData);
		api.post("/products", {
			sku: productData.sku,
			name: productData.name,
			price: productData.price,
			type: productData.type,
			properties: productData.properties,
		});
		console.table(productData);
		navigate("/");
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
						productData: productData as ProductStateTypes,
						dispatchProductData: dispatchProductData,
					}}
				/>
			</form>
			<Footer />
		</>
	);
}
