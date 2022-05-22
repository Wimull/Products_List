import React, { useState } from "react";
import { RegisterOptions, FieldErrors } from "react-hook-form";
import "./styles.css";
import { productsProperties, ProductTypes } from "../../../../App";
import { AddProductPropertiesForm } from "../AddProductPropertiesForm";

interface AddProductFormProps {
	formProps: {
		register: (value: string, object: RegisterOptions) => object;
		errors: FieldErrors;
	};
}

export function AddProductForm({
	formProps: { register, errors },
}: AddProductFormProps) {
	const [productType, setProductType] = useState<ProductTypes | null>(null);

	return (
		<div className="container h-100 w-100">
			<fieldset className="row mt-3 align-items-baseline" disabled>
				<label htmlFor="sku" className="form_label col-1">
					SKU:{" "}
				</label>

				<input
					className="form-control col-2"
					id="sku"
					{...register("SKU", { required: true })}
				/>

				{errors.SKU?.type === "required" && (
					<span className="error_message col-12">
						SKU is required
					</span>
				)}
			</fieldset>
			<fieldset className="row mt-3  align-items-baseline">
				<label htmlFor="name" className="form_label col-1">
					Name:{" "}
				</label>

				<input
					className="form-control col-4"
					id="name"
					{...register("name", { required: true })}
				/>

				{errors.name?.type === "required" && (
					<span className="error_message col-12">
						Name is required
					</span>
				)}
			</fieldset>
			<fieldset className="row mt-3  align-items-baseline">
				<label
					htmlFor="price"
					className="form_label col-1 align-items-baseline"
				>
					Price:{" "}
				</label>

				<input
					className="form-control col-2"
					id="price"
					{...register("price", { required: true })}
				/>

				{errors.price?.type === "required" && (
					<span className="error_message col-12">
						Price is required
					</span>
				)}
			</fieldset>
			<fieldset className="row mt-3  align-items-baseline">
				<label
					htmlFor="product_type"
					className="form_label col-3 align-items-baseline"
				>
					Select your product type:{" "}
				</label>
				<select
					className="form-select col-2 h5"
					aria-label="Select product type"
					id="product_type"
					{...register("type", {
						required: true,
						validate: (value) => value != "default",
					})}
					onChange={(e) => {
						if (e.target.value == "default")
							return setProductType(null);
						return setProductType(e.target.value as ProductTypes);
					}}
				>
					<option selected value={"default"}>
						Product
					</option>
					{Object.keys(productsProperties).map((value) => {
						return (
							<option
								key={value}
								value={value}
								aria-label={`Option for ${value}`}
							>
								{value}
							</option>
						);
					})}
				</select>
				{errors.type?.type === "validate" && (
					<span className="error_message col-12">
						Please, select a product type
					</span>
				)}
			</fieldset>
			<AddProductPropertiesForm
				productType={productType}
				formProps={{ register: register, errors: errors }}
			/>
		</div>
	);
}
