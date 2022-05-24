import React from "react";
import { Product } from "..";
import { ProductType } from "../../App";

interface ProductsProps {
	products: ProductType[];
}

export function Products({ products }: ProductsProps) {
	return (
		<div className="d-flex row align-items-center justify-content-center items gap-5 p-3">
			{products.map(({ sku, name, price, type, properties }) => {
				console.log(sku, properties);
				return (
					<Product
						key={sku}
						SKU={sku}
						name={name}
						price={price}
						type={type}
						attribute={{
							type: properties.type,
							value: properties.props,
						}}
						image={`/assets/defaultImages/${type.toLocaleLowerCase()}.jpg`}
					/>
				);
			})}

			{/* <Product
				SKU="1"
				name="Name"
				price="100"
				type={"Book"}
				attribute={{ type: "Weight", value: [{ Weight: "1" }] }}
				image="/assets/defaultImages/furniture.jpg"
			/>
			<Product
				SKU="2"
				name="Name"
				price="100"
				type={"Book"}
				attribute={{ type: "Weight", value: [{ Weight: "1" }] }}
				image="/assets/defaultImages/furniture.jpg"
			/>
			<Product
				SKU="3"
				name="Name"
				price="100"
				type={"Book"}
				attribute={{ type: "Weight", value: [{ Weight: "1" }] }}
				image="/assets/defaultImages/furniture.jpg"
			/>
			<Product
				SKU="4"
				name="Name"
				type={"Book"}
				price="100"
				attribute={{ type: "Weight", value: [{ Weight: "1" }] }}
				image="/assets/defaultImages/furniture.jpg"
			/> */}
		</div>
	);
}
