import Queue from "./components/queue/Queue";
import ParkingLot from "./components/parkinglot/ParkingLot";
import Header from "./components/header/Header";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  
  const [parkingLot, setParkingLot] = useState([]);
  const [queue, setQueue] = useState([]);

  const getParkingLot = async () => {
    const {data} = await axios.get("http://localhost:3001/parkingspace");
    setParkingLot(data.spaces);
  }

  const getQueue = async () => {
    const {data} = await axios.get("http://localhost:3001/vehicle/queue");
    setQueue(data);
  }

  useEffect(() => {
    getParkingLot();
    getQueue();
  }, [])

	return (
		<div className="App">
			<Header />
			<div className="gral-container">
				<Queue queue={queue}/>
				<div className="parkinglot-container">
					<ParkingLot parkingLot={parkingLot}/>
				</div>
			</div>
		</div>
	);
}

export default App;
