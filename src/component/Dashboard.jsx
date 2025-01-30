import React from "react";
import {useLocation} from "react-router-dom";

const Dashboard = () => {
    const location = useLocation();
    const {username} = location.state || { username: 'User' };
    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <p>Welcome, {username}!</p>
        </div>
    );
}

export default Dashboard;