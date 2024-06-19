import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TopBar from "./Components/TopBar";
import "./App.css";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import AddTask from "./pages/AddTask";
import TaskDetails from "./pages/TaskDetails";
import EditTask from "./pages/EditTask";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/register" element={<Register />} />
					<Route path="/addTask" element={<AddTask />} />
					<Route path="/TaskDetails" element={<TaskDetails />} />
					<Route path="/editTask" element={<EditTask />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
