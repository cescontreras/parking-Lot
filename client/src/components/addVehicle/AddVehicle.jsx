import axios from "axios";
import React, { useState } from "react";
import "./AddVehicle.css";

export default function AddVehicle({ postVehicle }) {
	const [owner, setOwner] = useState("");
	const [type, setType] = useState("");

	const handleOwner = (e) => {
		setOwner(e.target.value);
	};

	const handleType = (e) => {
		setType(e.target.value);
	};

	const handlePost = async (e) => {
		e.preventDefault();
		postVehicle({ owner, type });
		setOwner("");
		setType("");
	};

	return (
		<div className="add-vehicle">
			<h2>Add Vehicle</h2>
			<form className="vehicle-form">
				<label>
					Owner:
					<input
						type="text"
						name="owner"
						value={owner}
						onChange={(e) => handleOwner(e)}
					/>
				</label>
				<select
					name="type"
					onChange={(e) => handleType(e)}
					value={type}
					defaultValue={type}
				>
					<option value="">Select...</option>
					<option value="motorcycle">Motorcycle</option>
					<option value="sedan">Sedan</option>
					<option value="truck">Truck</option>
				</select>
				<button className="btn btn-secondary" onClick={handlePost}>
					Park
				</button>
			</form>
		</div>
	);
}
