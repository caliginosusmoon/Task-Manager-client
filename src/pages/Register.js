import React, { useState } from "react";
import axios from "axios";
import { url } from "../config";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [name, setName] = useState("");
	const [emailId, setEmail] = useState("");
	const [passWord, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (passWord !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		try {
			const response = await axios.post(`${url}user/add`, {
				name,
				emailId,
				passWord,
			});
			console.log(response);
			console.log("Registration successful:", response.data);

			window.location.href = "/";
		} catch (error) {
			console.error("Registration failed:", error);
			alert("Registration failed. Please try again.");
		}
	};

	return (
		<div className="login-container">
			<div className="heading-text">Register as New User</div>
			<form
				className="form-container register-form-container"
				onSubmit={handleSubmit}
			>
				<label>
					Name:
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</label>

				<label>
					Email:
					<input
						type="email"
						id="email"
						value={emailId}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						id="password"
						value={passWord}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>

				<label>
					Confirm Password:
					<input
						type="password"
						id="confirmPassword"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<div className="login-button">
					<button type="submit">Sign Up</button>
				</div>
				<div className="register-text">
					<div>
						Already have an account?
						<span
							className="action-text"
							onClick={() => {
								navigate("/login");
							}}
						>
							{" "}
							Login
						</span>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Register;
