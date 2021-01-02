import React from "react";
import "./Queue.css";

export default function Queue({queue}) {

	return (
		<div className="queue">
			<table className="table table-sm queue-table">
      <caption>Queue</caption>
				<thead>
					<tr>
						<th scope="col">Id</th>
						<th scope="col">Owner</th>
						<th scope="col">Type</th>
					</tr>
				</thead>
				<tbody>
          {
            queue[0] && queue.map((vehicle, i) => (                
              <tr key={i}>
              <th scope="row">{vehicle.id}</th>
              <td>{vehicle.owner}</td>
              <td>{vehicle.type}</td>
            </tr>
            ))
          }
				</tbody>
			</table>
		</div>
	);
}
