import React from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "..";

import { AddProductHeader } from "./components";

export function AddProductPage() {
	const navigate = useNavigate();
	function handleNewProductSubmit(e: any) {
		e.preventDefault();
		console.log("Hello World");
		navigate("/");
	}

	return (
		<form onSubmit={handleNewProductSubmit}>
			<AddProductHeader />
			{
				// <Form />
				<Footer />
			}
		</form>
	);
}
