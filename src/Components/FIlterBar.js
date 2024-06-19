import React, { useState } from "react";

const FIlterBar = ({ completedFilter, setRefresh, todayFilter }) => {
	const [active, setActive] = useState("all");
	return (
		<div className="filter-outer-container">
			<div
				className={`filter-option ${active === "all" ? "active" : ""}`}
				onClick={() => {
					setRefresh((prev) => !prev);
					setActive(() => "all");
				}}
			>
				All
			</div>
			<div
				className={`filter-option ${
					active === "completed" ? "active" : ""
				}`}
				onClick={() => {
					completedFilter(true);
					setActive(() => "completed");
				}}
			>
				Completed
			</div>
			<div
				className={`filter-option ${
					active === "pending" ? "active" : ""
				}`}
				onClick={() => {
					completedFilter(false);
					setActive(() => "pending");
				}}
			>
				Pending
			</div>
			<div
				className={`filter-option ${
					active === "today" ? "active" : ""
				}`}
				onClick={() => {
					todayFilter("today");
					setActive(() => "today");
				}}
			>
				Today's
			</div>
			<div
				className={`filter-option ${
					active === "delayed" ? "active" : ""
				}`}
				onClick={() => {
					todayFilter("delayed");
					setActive(() => "delayed");
				}}
			>
				Delayed
			</div>
			{/* <div className="filter-option">Rejected</div> */}
		</div>
	);
};

export default FIlterBar;
