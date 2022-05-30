import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../../../";
import "./styles.css";

export function AddProductHeader({ sending = false }) {
	const [saveActive, setSaveActive] = useState(false);
	const [cancelActive, setCancelActive] = useState(false);
	return (
		<nav className="row p-3 px-5 align-items-center justify-content-center border-bottom border-dark border-bottom-2 border-opacity-25">
			<span id="AddProductTitle" className="col-9 ">
				Add a New Product
			</span>
			<div className="d-grid row gap-3 col-3 justify-content-between align-content-between">
				<button
					id="save_product_btn"
					type="submit"
					className={`d-flex col-4 btn btn-outline-info justify-content-center align-items-center shadow ${
						saveActive ? "active" : ""
					}`}
					disabled={sending}
					aria-label="Save product button"
					aria-disabled={sending}
					onFocus={() => {
						setSaveActive(true);
					}}
					onBlur={() => {
						setSaveActive(false);
					}}
				>
					{sending ? <Loading /> : "Save"}
				</button>
				<Link
					id="cancel_product_btn"
					className={`d-flex col-4 btn btn-outline-dark justify-content-center align-items-center shadow ${
						cancelActive ? "active" : ""
					}`}
					to="/"
					aria-label="Go to home page button"
					role="button"
					onFocus={() => {
						setCancelActive(true);
					}}
					onBlur={() => {
						setCancelActive(false);
					}}
				>
					Cancel
				</Link>
			</div>
		</nav>
	);
}
