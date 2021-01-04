import React, { useEffect, useState } from "react";
import Queue from "./components/queue/Queue";
import ParkingLot from "./components/parkinglot/ParkingLot";
import AddVehicle from "./components/addVehicle/AddVehicle";
import axios from "axios";

import "./App.css";

function App() {
	const [parkingLot, setParkingLot] = useState([]);
	const [queue, setQueue] = useState([]);
	const [show, setShow] = useState(false);
	const [msg, setMsg] = useState("");

	const getParkingLot = async () => {
		const { data } = await axios.get("http://localhost:3001/parkingspace");
		setParkingLot(data.spaces);
	};

	const getQueue = async () => {
		const { data } = await axios.get("http://localhost:3001/vehicle/queue");
		setQueue(data);
	};

	const postVehicle = async (vehicle) => {
		const { data } = await axios.post("http://localhost:3001/vehicle", vehicle);
		setShow(true);
		setMsg(data.msg);
		getQueue();
		getParkingLot();
	};

	const removeVehicle = async (id) => {
		const { data } = await axios.delete(`http://localhost:3001/vehicle/${id}`);
		setShow(true);
		setMsg(data.msg);
		if (queue[0]) {
			postVehicle(queue.shift());
		} else {
			getQueue();
			getParkingLot();
		}
	};

	useEffect(() => {
		getParkingLot();
		getQueue();
	}, []);

	return (
		<div className="App">
			<div className="gral-container">
				<Queue queue={queue} />
				<div className="parkinglot-container">
					<ParkingLot
						parkingLot={parkingLot}
						removeVehicle={removeVehicle}
						setShow={setShow}
						show={show}
						msg={msg}
					/>
					<AddVehicle postVehicle={postVehicle} />
				</div>
			</div>
		</div>
	);
}

export default App;
