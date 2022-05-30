import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../../../";
import "./styles.css";

export function AddProductHeader({ sending = false }) {
	return (
		<nav className="row p-3 px-5 align-items-center justify-content-center border-bottom border-dark border-bottom-2 border-opacity-25">
			<span id="AddProductTitle" className="col-9 ">
				Add a New Product
			</span>
			<div className="d-grid row gap-3 col-3 justify-content-between align-content-between">
				<button
					id="save_product_btn"
					type="submit"
					className={`d-flex col-4 btn btn-outline-info justify-content-center align-items-center shadow`}
					disabled={sending}
				>
					{sending ? <Loading /> : "Save"}
				</button>
				<Link
					id="cancel_product_btn"
					className="d-flex col-4 btn btn-outline-dark justify-content-center align-items-center shadow "
					to="/"
				>
					Cancel
				</Link>
			</div>
		</nav>
	);
}
