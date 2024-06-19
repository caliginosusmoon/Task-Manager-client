import React from "react";
import checkbox from "../assets/Checkbox.svg";
import checked from "../assets/Checked.svg";
import flag from "../assets/flag.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../config";

const Task = ({ task, setRefresh }) => {
	const today = new Date();
	const navigate = useNavigate();
	const completeby =
		task.duedate === today ? "today" : task.duedate.substr(0, 10);

	const handleComplete = async () => {
		const response = await axios.put(`${url}task/status/${task?._id}`);
		console.log(response);
		setRefresh((prev) => !prev);
	};

	const checkPriority = (task) => {
		if (task.priority === "high") {
			return "red-text";
		} else if (task.priority === "Low") {
			return "green-text";
		} else {
			return "orange-text";
		}
	};

	return (
		<div className="task-outer-container">
			<div className="task-checkbox" onClick={() => handleComplete()}>
				{task.completed ? (
					<img src={checked} alt="checked" />
				) : (
					<img src={checkbox} alt="unchecked" />
				)}
			</div>
			<div
				className="card-details"
				onClick={() => {
					navigate("/TaskDetails", {
						state: { taskData: task },
					});
				}}
			>
				<div className="task-header">
					<div className="task-title">{task.title}</div>
					<div className={`task-priority ${checkPriority(task)}`}>
						{task.priority} Priority
					</div>
				</div>
				<div className="task-description">{task.description}</div>
				<div className="task-footer">
					<img className="flag" src={flag} alt="flag" />
					{completeby}
				</div>
			</div>
		</div>
	);
};

export default Task;
