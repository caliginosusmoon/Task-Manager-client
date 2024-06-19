import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../config";

const AddTask = () => {
	const userData = JSON.parse(sessionStorage.getItem("userData"));
	const [taskData, setTaskData] = useState({
		title: "",
		description: "",
		adddate: Date.now(),
		duedate: "", //set default date to today's date
		priority: "Low",
		completed: false,
		user: userData?.emailId,
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setTaskData({
			...taskData,

			[e.target.name]: e.target.value,
		});
		console.log(e.target.name, e.target.value);
	};

	console.log(userData);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// const formDataToSend = new FormData();
			// formDataToSend.append("title", taskData?.title);
			// formDataToSend.append("user", userData?.emailId);
			// formDataToSend.append("description", taskData?.description);
			// formDataToSend.append("adddate", Date.now());
			// formDataToSend.append("duedate", taskData?.duedate);
			// formDataToSend.append("priority", taskData?.priority);

			// console.log(formDataToSend);

			const response = await axios.post(`${url}task/add`, taskData);
			alert("Task Added Succesfuly");
			navigate("/home");
			console.log(response, taskData);
		} catch (error) {
			console.log("error", error);
		}
	};
	return (
		<div className="addtask-container">
			<div className="heading-text">
				<h2>Add New Task</h2>
			</div>
			<div className="form-container">
				<form onSubmit={handleSubmit}>
					<label>
						Title:
						<input
							type="text"
							name="title"
							value={taskData.title}
							onChange={handleChange}
							required
						></input>
					</label>
					<label>
						Description:
						<textarea
							rows={5}
							name="description"
							value={taskData.description}
							onChange={handleChange}
							required
						></textarea>
					</label>
					<div className="completed-priority-container">
						<label>
							Complete By
							<input
								type="date"
								name="duedate"
								value={taskData.duedate}
								onChange={handleChange}
								required
							></input>
						</label>
						<label>
							Priority
							<select
								style={{ border: "1.5px solid #2f313a" }}
								name="priority"
								onChange={handleChange}
							>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</label>
					</div>
					<div className="end-button">
						<button
							onClick={() => {
								navigate("/home");
							}}
							type="reset"
						>
							Cancel
						</button>
						<button type="submit">Add Task</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddTask;
