import { createContext, useCallback, useEffect, useState } from "react";
import { Header, Footer, Products } from "..";
import axios from "axios";
import { api } from "../../libs/Api";

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
	const [products, setProducts] = useState([{}]);

	const handleFetchProducts = useCallback(async () => {
		const res = await api.get("/products");
		if (res.status == 200) {
			setProducts(res.data);
			console.log(res.data);
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

	function handleMassDeletion(array: string[]) {
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

				<Products />
			</MassDeletionContext.Provider>
			<Footer />
		</>
	);
}
