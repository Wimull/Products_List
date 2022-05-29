import React, { useContext, useMemo } from "react";
import {
	productsProperties,
	ProductsPropertiesType,
	ProductTypes,
} from "../../App";
import { MassDeletionContext } from "../HomePage";
import { getPropertyText } from "./propertyText";
import "./styles.css";

interface ProductProps {
	SKU: string;
	name: string;
	price: string;
	type: ProductTypes;
	property: {
		type: ProductsPropertiesType;
		value: { [name: string]: string };
	};
	image: string;
}

export function Product({
	SKU,
	name,
	price,
	property,
	image,
	type,
}: ProductProps) {
	let propertyText = getPropertyText(type, property);
	const { handleItemSelectedChange, itemsSelectedForDeletion } =
		useContext(MassDeletionContext);

	function handleCheckbox() {
		handleItemSelectedChange(SKU);
	}

	const selectedForDeletion: boolean = useMemo(() => {
		return itemsSelectedForDeletion.includes(SKU);
	}, [itemsSelectedForDeletion]);
	return (
		<div
			className="d-flex my-2 col-lg-3 col-md-6 col-sm-12 justify-content-center align-items-center py-3"
			style={{
				backgroundColor: selectedForDeletion
					? "#d2202f"
					: "transparent",
				maxWidth: "500px",
			}}
		>
			<div
				className="d-flex shadow align-items-end justify-content-center "
				style={{
					backgroundImage: `url(${image})`,
					//maxWidth: "350px",
					height: "300px",
					width: "300px",
					backgroundSize: "350px",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "top",
				}}
			>
				<input
					className="delete_checkbox form-check-input overflow-visible"
					type="checkbox"
					value=""
					checked={selectedForDeletion}
					onChange={handleCheckbox}
					ari-label={`Button for selecting ${name}, id ${SKU}, for deletion`}
				/>
				<div className="product row bg-light shadow overflow-visible d-flex">
					<span className="text col-12 text-center">
						<span style={{ fontWeight: "bold" }}>SKU:</span> {SKU}
					</span>
					<span className="text col-12 text-sm">
						<span style={{ fontWeight: "bold" }}>Name:</span> {name}
					</span>
					<span className="text col-12 text-sm">
						<span style={{ fontWeight: "bold" }}>Price:</span>{" "}
						{price}.00 $
					</span>
					<span className="text col-12">
						<span style={{ fontWeight: "bold" }}>
							{property.type}:{" "}
						</span>
						{propertyText}
					</span>
				</div>
			</div>
		</div>
	);
}
