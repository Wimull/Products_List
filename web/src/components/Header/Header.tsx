import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MassDeletionContext, Loading } from "..";
import "./styles.css";

export function Header({ deleting = false }) {
	const { itemsSelectedForDeletion, handleMassDeletion } =
		useContext(MassDeletionContext);
	const [deleteActive, setDeleteActive] = useState(false);
	const [addActive, setAddActive] = useState(false);

	return (
		<nav className="row p-3 px-5 align-items-center justify-content-center border-bottom border-dark border-bottom-2 border-opacity-25">
			<span id="Title" className="col-9">
				Product List
			</span>
			<div className="d-grid row col-3 justify-content-between align-content-between">
				<Link
					id="add_product_btn"
					className={`d-flex col-3 btn btn-outline-dark justify-content-center align-items-center shadow ${
						addActive ? "active" : ""
					} `}
					to="/add-product"
					aria-label="Add a new product button"
					role="button"
					onFocus={() => {
						setAddActive(true);
					}}
					onBlur={() => {
						setAddActive(false);
					}}
				>
					ADD
				</Link>
				<button
					id="delete_product_btn"
					type="button"
					className={`btn btn-outline-danger d-flex col-7  justify-content-center align-items-center  ${
						itemsSelectedForDeletion.length === 0
							? `disabled`
							: `shadow`
					} ${deleteActive ? "active" : ""}`}
					onFocus={() => {
						setDeleteActive(true);
					}}
					onBlur={() => {
						setDeleteActive(false);
					}}
					disabled={itemsSelectedForDeletion.length === 0 || deleting}
					aria-disabled={
						itemsSelectedForDeletion.length === 0 || deleting
					}
					aria-label="Mass deletion button"
					onClick={() => handleMassDeletion(itemsSelectedForDeletion)}
				>
					{deleting ? <Loading /> : "MASS DELETE"}
				</button>
			</div>
		</nav>
	);
}
