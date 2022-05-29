import React, { useEffect, useState } from "react";
import { RegisterOptions, FieldErrors } from "react-hook-form";
import "./styles.css";
import { productsProperties, ProductTypes } from "../../../../App";
import { AddProductPropertiesForm } from "../AddProductPropertiesForm";
import { ProductActionKind, ProductActionType, ProductStateTypes } from "../..";

interface AddProductFormProps {
	formProps: {
		register: (value: string, object: RegisterOptions) => object;
		errors: FieldErrors;
	};
	formData: {
		productData: ProductStateTypes;
		dispatchProductData: (value: ProductActionType) => void;
	};
}

export function AddProductForm({
	formProps: { register, errors },
	formData: { productData, dispatchProductData },
}: AddProductFormProps) {
	const [productType, setProductType] = useState<ProductTypes | null>(null);

	function createSKU(): string {
		return `${productData.type
			?.slice(0, 4)
			.toLocaleUpperCase()}${productData.price
			?.replace("$", "")
			.slice(-3)}${productData.name?.slice(0, 4).toLocaleUpperCase()}`;
	}

	// useEffect(() => {
	// 	dispatchProductData({
	// 		type: ProductActionKind.SKU,
	// 		payload:
	// 	});
	// }, [productData.price, productData.type, productData.name]);
	return (
		<div
			className="h-100 w-100 align-items-baseline"
			style={{ marginLeft: "20px" }}
		>
			<fieldset className="row mt-3 align-items-baseline">
				<label htmlFor="sku" className="form_label col-1">
					SKU:{" "}
				</label>

				<input
					className="form-control col-2"
					id="sku"
					value={productData.sku}
					{...register("SKU", {
						value: productData.sku,
						onChange: (e) =>
							dispatchProductData({
								type: ProductActionKind.SKU,
								payload: e.target.value,
							}),
					})}
				/>
			</fieldset>
			<fieldset className="row mt-3  align-items-baseline">
				<label htmlFor="name" className="form_label col-1">
					Name:{" "}
				</label>

				<input
					className="form-control col-4"
					id="name"
					{...register("name", {
						required: true,
						onChange: (e) =>
							dispatchProductData({
								type: ProductActionKind.NAME,
								payload: e.target.value,
							}),
						value: productData.name,
					})}
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
					Price ($):{" "}
				</label>

				<input
					className="form-control col-2"
					id="price"
					{...register("price", {
						required: true,
						onChange: (e) =>
							dispatchProductData({
								type: ProductActionKind.PRICE,
								payload: e.target.value,
							}),
						value: productData.price,
					})}
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
					className="form_label col-3 align-items-baseline lh-lg"
				>
					Select your product type:{" "}
				</label>
				<select
					className="form-select col-2 h5"
					aria-label="Select product type"
					id="productType"
					{...register("type", {
						required: true,
						validate: (value) => value != "default",
						onChange: (e) => {
							if (e.target.value == "default") {
								dispatchProductData({
									type: ProductActionKind.TYPE,
									payload: "",
								});
								setProductType(null);
							} else {
								setProductType(e.target.value as ProductTypes);
								dispatchProductData({
									type: ProductActionKind.TYPE,
									payload: e.target.value,
								});
								dispatchProductData({
									type: ProductActionKind.PROPERTIES,
									payload: "{}",
								});
							}
						},
					})}
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
				formData={{
					productData: productData as ProductStateTypes,
					dispatchProductData: dispatchProductData,
				}}
			/>
		</div>
	);
}
