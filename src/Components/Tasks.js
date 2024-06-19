import React from "react";
import Task from "./Task";

const Tasks = ({ tasks, setRefresh }) => {
	return (
		<div className="tasks-container">
			{tasks
				? tasks?.map((task) => (
						<>
							<Task task={task} setRefresh={setRefresh} />
						</>
				  ))
				: "No Task"}
		</div>
	);
};

export default Tasks;
