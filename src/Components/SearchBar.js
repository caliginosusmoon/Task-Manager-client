import React, { useState } from "react";
import search from "../assets/search.svg";

const SearchBar = ({
	setIsSearching,
	setSearchedForm,
	filteredTasks,
	tasks,
	setFilteredTasks,
	isSearching,
}) => {
	const [searchTyoe, setSearchType] = useState("name");
	// const [tasks, setTasks] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	// const [searchedForm, setSearchedForm] = useState([]);
	// const [isSearching, setIsSearching] = useState(false);

	const handleSearch = (searchQuery) => {
		setIsSearching(true);
		console.log("tasks", filteredTasks, searchTyoe, tasks);
		let result;

		if (searchQuery.length > 0) {
			if (searchTyoe === "name") {
				result = filteredTasks.filter((task) =>
					task?.title
						?.toLowerCase()
						.includes(searchQuery.toLowerCase())
				);
			} else {
				result = filteredTasks.filter(
					(task) =>
						task?.duedate?.toString().substr(0, 10) === searchQuery
				);
				console.log("searched", result, filteredTasks);
			}
			setFilteredTasks(result);
			setIsSearching(true);
		} else {
			setIsSearching(false);
			setFilteredTasks(tasks);
		}
		console.log("search", result);
	};

	const handleDropdown = (e) => {
		e.preventDefault();
		setSearchType(e.target.value);
		console.log("selected", e.target.value, searchTyoe);
		setFilteredTasks(tasks);
		setSearchQuery("");
	};

	return (
		<div className="search-outer-container">
			<div className="search-icon">
				<img src={search} alt="search" />
			</div>
			<div className="search-bar">
				<input
					type={searchTyoe === "name" ? "text" : "date"}
					placeholder="Search"
					value={searchQuery}
					onChange={(e) => {
						setSearchQuery(e.target.value);
						handleSearch(e.target.value);
					}}
				></input>
			</div>
			<div className="search-type">
				<select onChange={handleDropdown}>
					<option value="name">By Name</option>
					<option value="date">By Date</option>
				</select>
			</div>
		</div>
	);
};

export default SearchBar;
