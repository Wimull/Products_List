import React from "react";
import { productsProperties, ProductTypes } from "../../../../App";
import { RegisterOptions, FieldErrors } from "react-hook-form";
import "./styles.css";
import { ProductDataParams, ProductDataTypes } from "../..";

interface AddProductPropertiesFormProps {
	productType: ProductTypes | null;
	formProps: {
		register: (value: string, object: RegisterOptions) => object;
		errors: FieldErrors;
	};
	formData: {
		productData: ProductDataTypes;
		dispatchProductData: (value: {
			type: ProductDataParams;
			payload: any;
		}) => void;
	};
}

export function AddProductPropertiesForm({
	productType,
	formProps: { register, errors },
	formData: { productData, dispatchProductData },
}: AddProductPropertiesFormProps) {
	if (productType === null) return <></>;

	const product = productsProperties[productType];
	return (
		<>
			{product.props.map(({ property, measurement }) => {
				return (
					<fieldset
						key={property}
						className="row mt-3  align-items-baseline"
					>
						<label
							htmlFor={property}
							className="form_label col-1"
							style={{ minWidth: "160px" }}
						>
							{property} ({measurement}):
						</label>
						<input
							className="form-control col-2"
							id={property}
							{...register(property, {
								required: true,
								onChange: (e) =>
									dispatchProductData({
										type: "Property",
										payload: {
											type: product.type,
											props: {
												...productData.property.props,
												[property]: e.target.value,
											},
										},
									}),
							})}
						/>
						{errors[property]?.type === "required" && (
							<span className="error_message col-12">
								{property} is required
							</span>
						)}
					</fieldset>
				);
			})}
		</>
	);
}
