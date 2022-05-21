import { createContext, useState } from "react";
import { Header, Footer, Products } from "..";

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
