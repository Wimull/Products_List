import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

interface HeaderProps {
	itemsSelectedForDeletion: string[];
	setItemsSelectedForDeletion: (value: string[]) => void;
}

export function Header({
	itemsSelectedForDeletion,
	setItemsSelectedForDeletion,
}: HeaderProps) {
	function handleDeletion(e: any) {
		e.currentTarget.blur();
		setItemsSelectedForDeletion([]);
	}

	return (
		<nav className="row p-3 px-5 align-items-center justify-content-center border-bottom border-dark border-bottom-2 border-opacity-25">
			<span id="Title" className="col-9 ">
				Product List
			</span>
			<div className="d-grid row gap-3 col-3 justify-content-between align-content-between">
				<Link
					id="Add"
					className="d-flex col-3 btn btn-outline-dark justify-content-center align-items-center shadow "
					to="/add-product"
				>
					Add
				</Link>
				<button
					id="Delete"
					className={`d-flex col-4 btn btn-outline-danger justify-content-center align-items-center  ${
						itemsSelectedForDeletion.length === 0
							? `disabled`
							: `shadow`
					}`}
					onClick={handleDeletion}
				>
					Delete
				</button>
			</div>
		</nav>
	);
}
