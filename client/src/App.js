import Queue from "./components/queue/Queue";
import ParkingLot from "./components/parkinglot/ParkingLot";
import Header from "./components/header/Header";
import AddVehicle from "./components/addVehicle/AddVehicle";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [parkingLot, setParkingLot] = useState([]);
	const [queue, setQueue] = useState([]);

	const getParkingLot = async () => {
		const { data } = await axios.get("http://localhost:3001/parkingspace");
		setParkingLot(data.spaces);
	};

	const getQueue = async () => {
		const { data } = await axios.get("http://localhost:3001/vehicle/queue");
		setQueue(data);
	};

	const postVehicle = async (vehicle) => {
		await axios.post("http://localhost:3001/vehicle", vehicle);
		getQueue();
		getParkingLot();
	};

	const removeVehicle = async (id) => {
		const { data } = await axios.delete(`http://localhost:3001/vehicle/${id}`);
		console.log(data);
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
			<Header />
			<div className="gral-container">
				<Queue queue={queue} />
				<div className="parkinglot-container">
					<ParkingLot parkingLot={parkingLot} removeVehicle={removeVehicle} />
					<AddVehicle postVehicle={postVehicle} />
				</div>
			</div>
		</div>
	);
}

export default App;
