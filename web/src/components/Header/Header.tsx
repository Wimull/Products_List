import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MassDeletionContext, Loading } from "..";
import "./styles.css";

export function Header({ deleting = false }) {
	const { itemsSelectedForDeletion, handleMassDeletion } =
		useContext(MassDeletionContext);

	return (
		<nav className="row p-3 px-5 align-items-center justify-content-center border-bottom border-dark border-bottom-2 border-opacity-25">
			<span id="Title" className="col-9">
				Product List
			</span>
			<div className="d-grid row col-3 justify-content-between align-content-between">
				<Link
					id="add_product_btn"
					className="d-flex col-3 btn btn-outline-dark justify-content-center align-items-center shadow "
					to="/add-product"
				>
					ADD
				</Link>
				<button
					id="delete_product_btn"
					className={`d-flex col-7 btn btn-outline-danger justify-content-center align-items-center  ${
						itemsSelectedForDeletion.length === 0
							? `disabled`
							: `shadow`
					}`}
					disabled={itemsSelectedForDeletion.length === 0 || deleting}
					onClick={() => handleMassDeletion(itemsSelectedForDeletion)}
				>
					{deleting ? <Loading /> : "MASS DELETE"}
				</button>
			</div>
		</nav>
	);
}
