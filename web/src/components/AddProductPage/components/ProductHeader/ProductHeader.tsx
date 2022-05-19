import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

export function ProductHeader() {
	return (
		<nav className="row p-3 px-5 align-items-center justify-content-center border-bottom border-dark border-bottom-2 border-opacity-25">
			<span id="Title" className="col-9 ">
				Add a New Product
			</span>
			<div className="d-grid row gap-3 col-3 justify-content-between align-content-between">
				<Link
					id="Cancel"
					className="d-flex col-4 btn btn-outline-dark justify-content-center align-items-center shadow "
					to="/"
				>
					Cancel
				</Link>
				<button
					id="Save"
					type="submit"
					className={`d-flex col-4 btn btn-outline-danger justify-content-center align-items-center shadow`}
				>
					Save
				</button>
			</div>
		</nav>
	);
}
