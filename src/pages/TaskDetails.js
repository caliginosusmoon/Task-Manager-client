import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import deleteicon from "../assets/delete.svg";
import editicon from "../assets/tabler_edit.svg";
import flag from "../assets/flag.png";
import axios from "axios";
import { url } from "../config";

const TaskDetails = () => {
	const location = useLocation();
	const taskData = location?.state?.taskData;
	console.log(taskData);

	const navigate = useNavigate();

	const handleDelete = async () => {
		// delete task logic here
		const confirm = window.confirm("Are you sure you want to delete?");

		if (confirm) {
			console.log(taskData._id);
			const response = await axios.delete(
				`${url}task/delete/${taskData?._id}`
			);
			if (response.status === 200) {
				alert("Task deleted successfully!");
				navigate("/home");
			} else {
				alert("Error deleting task!");
			}
		}
		console.log(confirm);
	};

	return (
		<div className="taskdetail-outer-container">
			<div className="task-header">
				<div className="task-addDate">
					Added on {taskData.adddate?.toString().substr(0, 10)}{" "}
				</div>
				<img
					src={deleteicon}
					alt="delete"
					onClick={() => handleDelete()}
				></img>
				<img
					src={editicon}
					alt="edit"
					onClick={() => {
						navigate("/editTask", {
							state: { taskData: taskData },
						});
					}}
				></img>
			</div>
			<div className="title-container">
				<h2>{taskData.title}</h2>
			</div>
			<div className="task-info-container">
				<div className="duedate-container">
					<img className="flag" src={flag} alt="flag"></img>
					<div className="date-container">
						{taskData.duedate?.toString().substr(0, 10)}
					</div>
				</div>
				<div className="taskdetails-priority">
					{taskData.priority} Priority
				</div>
			</div>
			<div className="task-details">{taskData.description}</div>

			<button
				className="taskdetail-button"
				onClick={() => navigate("/home")}
			>
				Back To Tasks
			</button>
		</div>
	);
};

export default TaskDetails;
