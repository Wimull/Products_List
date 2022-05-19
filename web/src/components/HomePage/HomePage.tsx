import { useState } from "react";
import { Header, Footer, Products } from "..";

export function HomePage() {
	const [itemsSelectedForDeletion, setItemsSelectedForDeletion] = useState<
		string[]
	>([]);

	return (
		<>
			<Header
				itemsSelectedForDeletion={itemsSelectedForDeletion}
				setItemsSelectedForDeletion={setItemsSelectedForDeletion}
			/>
			<div>
				<Products />
			</div>
			<Footer />
		</>
	);
}
