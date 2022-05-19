import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { Header, HomePage, AddProductPage } from "./components";

function App() {
	return (
		<div className="App mx-5 my-2 ">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/add-product" element={<AddProductPage />} />
			</Routes>
		</div>
	);
}

export default App;
