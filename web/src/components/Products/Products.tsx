import React from "react";
import { Product } from "..";

export function Products() {
	return (
		<div className="row gap-3 p-3">
			<Product
				SKU="SKU"
				name="Name"
				price="Price"
				attribute="Attribute"
				image="../../../public/assets/defaultImages/furniture.jpg"
			/>
			<Product
				SKU="SKU"
				name="Name"
				price="Price"
				attribute="Attribute"
				image="../../../public/assets/defaultImages/furniture.jpg"
			/>
			<Product
				SKU="SKU"
				name="Name"
				price="Price"
				attribute="Attribute"
				image="../../../public/assets/defaultImages/furniture.jpg"
			/>
		</div>
	);
}
