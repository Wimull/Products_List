import { createContext, useCallback, useEffect, useState } from "react";
import { Header, Footer, Products } from "..";
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

	const handleFetchProducts = useCallback(async () => {
		const res = await api.get("/products");
		if (res.status == 200) {
			let data = res.data;
			data.forEach((product: ProductType | any) => {
				product.properties = JSON.parse(
					'{ "type":"Size", "props":[{"Size":20}] }'
				);
			});

			setProducts(data);
			return;
		} else return;
	}, [products]);

	useEffect(() => {
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
		console.log(itemsSelectedForDeletion);
	}

	async function handleMassDeletion() {
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
		} catch (e) {
			console.log(e);
		}
		setItemsSelectedForDeletion([]);
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
				<Header />
				{products && <Products products={products} />}
			</MassDeletionContext.Provider>
			<Footer />
		</>
	);
}
