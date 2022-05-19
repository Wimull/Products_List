import React, { ReactPropTypes } from "react";
import "./styles.css";

interface ProductProps {
	SKU: string;
	name: string;
	price: string;
	attribute: string;
	image: string;
}

export function Product({
	SKU,
	name,
	price,
	attribute,
	image,
	...props
}: ProductProps) {
	return (
		<div className="col-lg-4 col-md-6 col-sm-12 position-relative ">
			<img
				src={image}
				width="300px"
				height="300px"
				className="position-relative d-inline"
			/>
			<div className="bg-light h-50 position-absolute bottom-0 top-50 overflow-visible">
				<span>{SKU}</span>
				<span>{name}</span>
				<span>{price}</span>
				<span>{attribute}</span>
			</div>
		</div>
	);
}
