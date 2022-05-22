import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { Header, HomePage, AddProductPage } from "./components";

export const productsProperties = {
	Book: [{ property: "Weight", measurement: "KG" }],
	Dvd: [{ property: "Length", measurement: "MB" }],
	Furniture: [
		{ property: "Height", measurement: "CM" },
		{ property: "Width", measurement: "CM" },
		{ property: "Length", measurement: "CM" },
	],
};

export type ProductTypes = keyof typeof productsProperties;

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
