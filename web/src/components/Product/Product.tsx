import React, { ReactPropTypes, useContext, useMemo, useState } from "react";
import { MassDeletionContext } from "../HomePage";
import "./styles.css";

interface ProductProps {
	SKU: string;
	name: string;
	price: string;
	attribute: { type: string; value: string | number };
	image: string;
}

export function Product({ SKU, name, price, attribute, image }: ProductProps) {
	//const [selectedForDeletion, setSelectedForDeletion] = useState(false);
	const { handleItemSelectedChange, itemsSelectedForDeletion } =
		useContext(MassDeletionContext);

	function handleCheckbox() {
		handleItemSelectedChange(SKU);
		//setSelectedForDeletion(!selectedForDeletion);
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
					<span className="text col-md-6 col-sm-12 text-sm-center">
						<span style={{ fontWeight: "bold" }}>Name:</span> {name}
					</span>
					<span className="text col-md-6 col-sm-12 text-sm-center">
						<span style={{ fontWeight: "bold" }}>Price:</span> $
						{price}
					</span>
					<span className="text col-12">
						<span style={{ fontWeight: "bold" }}>
							{attribute.type}:{" "}
						</span>
						{attribute.value}
					</span>
				</div>
			</div>
		</div>
	);
}
