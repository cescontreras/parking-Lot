import React from "react";
import "./ParkingLot.css";

export default function ParkingLot({ parkingLot }) {

	console.log(parkingLot);
		 
	return (
		<div className="parkinglot">
			<table className="table table-bordered table-lg">
				<thead>
					<tr>
						<th scope="col">id</th>
						<th scope="col">Owner</th>
						<th scope="col">Size</th>
						<th scope="col">Type</th>
						<th scope="col">Is Occupied</th>
						<th scope="col">X</th>
					</tr>
				</thead>
				<tbody>
					{parkingLot[0] &&
						parkingLot.map((space, i) => (	
							<tr className={space.isOccupied ? "table-success" : "table-danger"} key={i}>
								<th scope="row">{space.number}</th>
								<td>{space.vehicles[0] ? space.vehicles[0].owner : "---"}</td>
								<td>{space.size}</td>
								<td>{space.vehicles[0] ? space.vehicles[0].type : "---"}</td>
								<td>{space.isOccupied ? "Ocuppied" : "Free"}</td>
								<td>X</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}
