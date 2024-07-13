import React from "react";
import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>User Profile</h1>
      <p>Welcome, User ID: {user.userId}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserProfile;
