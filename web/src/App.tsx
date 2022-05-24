import { Route, Routes } from "react-router-dom";
import { HomePage, AddProductPage } from "./components";

export const productsProperties = {
	Book: {
		type: "Weight",
		props: [{ property: "Weight", measurement: "KG" }],
	},
	Dvd: { type: "Size", props: [{ property: "Size", measurement: "MB" }] },

	Furniture: {
		type: "Dimensions",
		props: [
			{ property: "Height", measurement: "CM" },
			{ property: "Width", measurement: "CM" },
			{ property: "Length", measurement: "CM" },
		],
	},
} as const;

export type ProductsPropertiesType =
	typeof productsProperties[ProductTypes]["type"];

export type ProductTypes = keyof typeof productsProperties;

export type ProductType = {
	sku: string;
	name: string;
	price: string;
	type: ProductTypes;
	properties: {
		type: ProductsPropertiesType;
		props: { [name: string]: string }[];
	};
};
function App() {
	return (
		<div className="App mx-5 my-2" style={{}}>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/add-product" element={<AddProductPage />} />
			</Routes>
		</div>
	);
}

export default App;
