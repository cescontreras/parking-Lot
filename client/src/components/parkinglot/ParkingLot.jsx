import React from "react";
import Toast from "react-bootstrap/Toast";
import "./ParkingLot.css";

export default function ParkingLot({
	parkingLot,
	removeVehicle,
	setShow,
	show,
	msg,
}) {
	return (
		<div className="parkinglot">
			<h2>Parking Lot</h2>
			<table className="table table-bordered table-sm">
				<thead>
					<tr>
						<th scope="col">Number</th>
						<th scope="col">Owner</th>
						<th scope="col">Size</th>
						<th scope="col">Type</th>
						<th scope="col">Vehicle ID</th>
						<th scope="col">Is Occupied</th>
						<th scope="col">X</th>
					</tr>
				</thead>
				<tbody>
					{parkingLot[0] &&
						parkingLot.map((space, i) => (
							<tr
								className={space.isOccupied ? "table-danger" : "table-success"}
								key={i}
							>
								<th scope="row">{space.number}</th>
								<td>{space.vehicles[0] ? space.vehicles[0].owner : "---"}</td>
								<td>{space.size}</td>
								<td>{space.vehicles[0] ? space.vehicles[0].type : "---"}</td>
								<td>{space.vehicles[0] ? space.vehicles[0].id : "---"}</td>
								<td>{space.isOccupied ? "Ocuppied" : "Free"}</td>
								{space.vehicles[0] ? (
									<td
										id={space.vehicles[0] && "remove"}
										onClick={() => removeVehicle(space.vehicles[0].id)}
									>
										X
									</td>
								) : (
									<td></td>
								)}
							</tr>
						))}
				</tbody>
			</table>
			<Toast
				onClose={() => setShow(false)}
				show={show}
				delay={3000}
				autohide
				className="toast"
			>
				<Toast.Body>{msg}</Toast.Body>
			</Toast>
		</div>
	);
}
