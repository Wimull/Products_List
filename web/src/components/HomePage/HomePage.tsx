import { createContext, useCallback, useLayoutEffect, useState } from "react";
import { Header, Footer, Products, Loading } from "..";
import axios from "axios";
import { api } from "../../libs/api";
import { ProductType } from "../../App";

type MassDeletionTypes = {
	itemsSelectedForDeletion: string[];
	handleMassDeletion: (array: string[]) => void;
	handleItemSelectedChange: (item: string) => void;
};

export const MassDeletionContext = createContext<MassDeletionTypes>({
	itemsSelectedForDeletion: [],
	handleMassDeletion: () => {},
	handleItemSelectedChange: () => {},
});

export function HomePage() {
	const [itemsSelectedForDeletion, setItemsSelectedForDeletion] = useState<
		string[]
	>([]);
	const [products, setProducts] = useState<ProductType[] | null>();
	const [error, setError] = useState<string | null>();
	const [getProductsLoading, setGetProductsLoading] = useState(false);
	const [deleteProductsLoading, setDeleteProductsLoading] = useState(false);

	const handleFetchProducts = useCallback(async () => {
		setGetProductsLoading(true);
		const res = await api.get("/products");
		if (res.status == 200) {
			let data = res.data;
			data.forEach((product: ProductType | any, index: number) => {
				data[index].properties = JSON.parse(product.properties);
			});
			setProducts(data);
		}
		setGetProductsLoading(false);
	}, [products]);

	useLayoutEffect(() => {
		handleFetchProducts();
	}, []);

	function handleItemSelectedChange(item: string) {
		if (
			itemsSelectedForDeletion.length > 0 &&
			itemsSelectedForDeletion.includes(item)
		) {
			setItemsSelectedForDeletion(
				itemsSelectedForDeletion.filter((element) => element != item)
			);
		} else {
			setItemsSelectedForDeletion([...itemsSelectedForDeletion, item]);
		}
	}

	async function handleMassDeletion() {
		setDeleteProductsLoading(true);
		try {
			await api.delete("/products", {
				method: "delete",
				headers: {
					"Access-Control-Allow-Origin": "*",
					"X-Requested-With": "XMLHttpRequest",
				},
				data: {
					ids: itemsSelectedForDeletion,
				},
			});
			setError(null);
		} catch (e) {
			setError("Error 500: No product was deleted");
			console.log(e);
		}
		setItemsSelectedForDeletion([]);
		setDeleteProductsLoading(false);
		handleFetchProducts();
	}

	return (
		<>
			<MassDeletionContext.Provider
				value={{
					itemsSelectedForDeletion: itemsSelectedForDeletion,
					handleMassDeletion: handleMassDeletion,
					handleItemSelectedChange: handleItemSelectedChange,
				}}
			>
				<Header deleting={deleteProductsLoading} />

				{error && <span className="error_message">{error}</span>}
				{products == null || getProductsLoading ? (
					<div className="d-flex align-items-center justify-content-center fw-bold my-5 ">
						<Loading height={"80px"} width={"80px"} />
					</div>
				) : products?.length > 0 ? (
					<Products products={products} />
				) : (
					<div
						className="d-flex align-items-center justify-content-center fw-bold "
						style={{ height: "300px" }}
					>
						<span
							style={{
								fontSize: "3rem",
								color: "#b1bbbb",
							}}
						>
							No product has been found. Did you forget to add a
							product?
						</span>
					</div>
				)}
			</MassDeletionContext.Provider>
			<Footer />
		</>
	);
}
