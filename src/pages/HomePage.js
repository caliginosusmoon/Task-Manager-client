import React, { useEffect, useState } from "react";
import TopBar from "../Components/TopBar";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import FIlterBar from "../Components/FIlterBar";
import axios from "axios";
import { url } from "../config";
import Tasks from "../Components/Tasks";
import Task from "../Components/Task";
import plusbutton from "../assets/plus.svg";
import sorticon from "../assets/sort.svg";

const HomePage = () => {
	const [tasks, setTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [progess, setProgress] = useState(0);
	const [sortingBy, setSortingBy] = useState("");
	const [searchedForm, setSearchedForm] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	console.log(location);
	const userid = JSON.parse(sessionStorage.getItem("userData"))?.emailId;

	const completedFilter = async (type) => {
		// const allTasks = await axios.get(`${url}task/user/${userid}`);
		const filteredTypeTasks = tasks?.filter(
			(task) => task?.completed === type
		);
		setFilteredTasks(() => filteredTypeTasks);
		console.log(filteredTasks);
		console.log(tasks, "tasks");
		calculateProgress(filteredTypeTasks);
	};

	const todayFilter = async (type) => {
		const today = new Date().toISOString().substring(0, 10);
		let filteredTypeTasks;
		console.log(today, tasks[2]?.duedate);
		if (type === "today") {
			filteredTypeTasks = tasks?.filter(
				(task) =>
					new Date(task?.duedate).toISOString().substring(0, 10) ===
					today
			);
		} else {
			filteredTypeTasks = tasks?.filter(
				(task) =>
					new Date(task?.duedate).toISOString().substring(0, 10) <
					today
			);
			const delayedTask = filteredTypeTasks.filter(
				(task) => task?.completed === false
			);
			filteredTypeTasks = delayedTask;
		}

		setFilteredTasks(() => filteredTypeTasks);
		console.log(filteredTypeTasks);
		console.log(tasks, "tasks");
		calculateProgress(filteredTypeTasks);
	};

	const calculateProgress = (allTasks) => {
		const total = allTasks.length;
		if (total === 0) {
			setProgress(() => 0);
			return;
		}
		console.log("total", total);
		const completed = allTasks?.filter((task) => task?.completed === true);
		console.log("completed", completed);
		setProgress(() => (completed.length / total) * 100);
		console.log((completed / total) * 100);
	};

	const handleSort = (type) => {
		let sortedTask;

		if (type === "date") {
			sortedTask = filteredTasks?.sort(
				(a, b) => new Date(a.duedate) - new Date(b.duedate)
			);
		} else if (type === "title") {
			sortedTask = filteredTasks?.sort((a, b) =>
				a.title.localeCompare(b.name)
			);
		} else {
			sortedTask = filteredTasks?.sort((a, b) =>
				a.priority.localeCompare(
					b.priority === "Low" ? "N" : b.priority
				)
			);
		}
		setFilteredTasks(sortedTask);
	};
	const handleDropdown = (e) => {
		setSortingBy(() => e.target.value);
		handleSort(e.target.value);
	};

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await axios.get(`${url}task/user/${userid}`);
				setTasks(() => response.data);
				setFilteredTasks(() => response.data);
				calculateProgress(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Error: ", error);
			}
		};
		fetchTasks();
	}, [refresh]);

	return (
		<div className="all-container">
			<TopBar userData={JSON.parse(sessionStorage.getItem("userData"))} />
			<div className="elements-container">
				<SearchBar
					tasks={tasks}
					setSearchedForm={setSearchedForm}
					searchedForm={searchedForm}
					setIsSearching={setIsSearching}
					isSearching={isSearching}
					setFilteredTasks={setFilteredTasks}
					filteredTasks={filteredTasks}
				/>
				<FIlterBar
					completedFilter={completedFilter}
					setRefresh={setRefresh}
					todayFilter={todayFilter}
				/>

				<div className="progess-bar-outer">
					<div className="sort-container">
						<div className="all-task-text">All Task</div>
						<div className="sort-text">
							<select
								className="hompage-sort-select"
								onChange={handleDropdown}
							>
								<option value="date" name="date">
									Date2
								</option>
								<option value="title" name="title">
									Title
								</option>
								<option value="priority" name="priority">
									Priority
								</option>
							</select>

							<img
								src={sorticon}
								alt="sort"
								// onClick={() => handleSort(sortingBy)}
							></img>
						</div>
					</div>
					<div className="progress-bar-inner">
						<div className="progress-bar-full">
							<div
								className="progress"
								style={{ width: `${progess}%` }}
							></div>
						</div>
						<div className="fraction-progress">
							{
								filteredTasks.filter(
									(task) => task?.completed === true
								).length
							}
							/{filteredTasks.length} Done
						</div>
					</div>
				</div>

				<Tasks
					tasks={isSearching ? filteredTasks : tasks}
					setRefresh={setRefresh}
				/>
				<div className="hompage-button">
					<button
						onClick={() => {
							navigate("/addTask");
						}}
					>
						<img src={plusbutton} alt="add"></img>
						Add New Task
					</button>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
