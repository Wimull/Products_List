import React from "react";
import { productsProperties, ProductTypes } from "../../../../App";
import { RegisterOptions, FieldErrors } from "react-hook-form";
import "./styles.css";

interface AddProductPropertiesFormProps {
	productType: ProductTypes | null;
	formProps: {
		register: (value: string, object: RegisterOptions) => object;
		errors: FieldErrors;
	};
}

export function AddProductPropertiesForm({
	productType,
	formProps: { register, errors },
}: AddProductPropertiesFormProps) {
	if (productType === null) return <></>;

	const product = productsProperties[productType];
	return (
		<>
			{product.map(({ property, measurement }) => {
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
							{...register(property, { required: true })}
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
