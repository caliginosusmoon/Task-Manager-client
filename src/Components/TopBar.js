import React, { useState } from "react";
import settings from "../assets/setting.svg";

const TopBar = ({ userData }) => {
  const currentTime = new Date();
  console.log(currentTime.toLocaleTimeString());

  const greet = ["zzz,", "Good Morning,", "Good Afternoon,", "Good Evening,"][
    parseInt((new Date().getHours() / 24) * 4)
  ];
  console.log(greet);
  const name = userData?.name + " ";

  return (
    <div className="top-outer-container">
      <div className="greetings-conatiner">
        <div className="greetings">{greet}</div>
        <div className="username">{name}</div>
      </div>
      <div className="settings-icon">
        <img src={settings} alt="settings" />
      </div>
    </div>
  );
};

export default TopBar;
