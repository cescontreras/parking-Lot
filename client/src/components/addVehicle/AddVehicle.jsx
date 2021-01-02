import axios from "axios";
import React, { useState } from "react";
import "./AddVehicle.css";

export default function AddVehicle({postVehicle}) {

  const [vehicle, setVehicle] = useState({});
  const [requestState, setRequestState] = useState();

  const handleVehicle = (e) => {
    setVehicle({ 
      ...vehicle,
      [e.target.name]: e.target.value
    })
  }

  const handlePost = async (e) => {
    e.preventDefault();
    postVehicle(vehicle); 
    setVehicle({});
  }
    
	return (
		<div className="add-vehicle">
			<h2>Add Vehicle</h2>
			<form className="vehicle-form">
				<label>
					Owner:
					<input type="text" name="owner" value={vehicle.owner} onChange={(e) => handleVehicle(e)}/>
				</label>
				<select name="type" onChange={(e) => handleVehicle(e)} placeholder="Select vehicle type">
					<option value="motorcycle">Motorcycle</option>
					<option value="sedan">Sedan</option>
					<option value="truck">Truck</option>
				</select>
				<button className="btn btn-secondary" onClick={handlePost}>Park</button>
			</form>
		</div>
	);
}
