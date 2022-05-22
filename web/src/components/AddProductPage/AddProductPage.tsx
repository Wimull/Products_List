import React from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "..";
import { useForm } from "react-hook-form";

import { AddProductForm, AddProductHeader } from "./components";

export function AddProductPage() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();
	function handleNewProductSubmit(e: any) {
		console.log(e);
	}

	return (
		<form id="product_form" onSubmit={handleSubmit(handleNewProductSubmit)}>
			<AddProductHeader />

			<AddProductForm
				formProps={{ register: register, errors: errors }}
			/>
			<Footer />
		</form>
	);
}
