import React from "react";
import { Product } from "..";

export function Products() {
	return (
		<div className="d-flex row align-items-center justify-content-center items gap-5 p-3">
			<Product
				SKU="1"
				name="Name"
				price="Price"
				attribute={{ type: "Attribute", value: "Text" }}
				image="/assets/defaultImages/furniture.jpg"
			/>
			<Product
				SKU="2"
				name="Name"
				price="Price"
				attribute={{ type: "Attribute", value: "Text" }}
				image="/assets/defaultImages/furniture.jpg"
			/>
			<Product
				SKU="3"
				name="Name"
				price="Price"
				attribute={{ type: "Attribute", value: "Text" }}
				image="/assets/defaultImages/furniture.jpg"
			/>
			<Product
				SKU="4"
				name="Name"
				price="Price"
				attribute={{ type: "Attribute", value: "Text" }}
				image="/assets/defaultImages/furniture.jpg"
			/>
		</div>
	);
}
