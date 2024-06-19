import React, { useState } from "react";
import { url } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [userid, setuserid] = useState("");
	const [password, setPassword] = useState("");
	const [userData, setUserData] = useState({});

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const loginResponse = await validateLogin();
		if (loginResponse) {
		} else {
			alert("invalid login");
		}
	};

	const validateLogin = async () => {
		const loginData = {
			emailId: userid,
			passWord: password,
		};
		console.log("loginData:", loginData);
		try {
			const res = await axios
				.post(`${url}user/login`, loginData)
				.catch((err) => {
					console.log(err);
				});
			setUserData(res?.data?.user);
			console.log(res?.data?.user);
			if (res?.data?.message === "Login Successful") {
				sessionStorage.setItem(
					"userData",
					JSON.stringify({
						name: res?.data?.user.name,
						emailId: res?.data?.user.emailId,
					})
				);
				navigate("/home", { state: { userData: res?.data?.user } });

				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log("error", error);
		}
	};
	return (
		<div className="login-container">
			<div className="login-text-conatainer">
				<div className="heading-text">Welcome</div>
				<div className="login-text">Login to Continue</div>
			</div>
			<form className="form-container" onSubmit={handleSubmit}>
				<label>
					Username or Email
					<input
						type="text"
						name="userid"
						placeholder="Username"
						value={userid}
						onChange={(e) => {
							setuserid(e.target.value);
						}}
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</label>
				<div className="login-button">
					<button type="Submit">Login</button>
				</div>
				<div className="register-text">
					<div>
						Don't have an account?
						<span
							className="action-text"
							onClick={() => {
								navigate("/register");
							}}
						>
							{" "}
							Register
						</span>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
