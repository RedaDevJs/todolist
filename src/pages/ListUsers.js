import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsersAsync,
  updateUserBlockedStatusAsync,
} from "../reducers/users/usersActions.js";
import { ToggleSwitch } from "flowbite-react";

const ListUsers = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.reducer.users.list);

  // Initialize blocked status using user IDs
  const initialBlockedStatus = userList.reduce((acc, user) => {
    acc[user._id] = user.isBlocked;
    return acc;
  }, {});

  // Use an object to store blocked status for each user
  const [blockedStatus, setBlockedStatus] = useState(initialBlockedStatus);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  const handleToggle = (userId) => {
    setBlockedStatus((prevStatus) => {
      // Ensure prevStatus is defined
      prevStatus = prevStatus || {};

      return {
        ...prevStatus,
        [userId]: !prevStatus[userId],
      };
    });

    // Dispatch the action to update the isBlocked status
    dispatch(
      updateUserBlockedStatusAsync({
        userId,
        isBlocked: !blockedStatus[userId],
      }),
    );
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">All Users</h1>
      <table className="min-w-full bg-white border-2 border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="border p-3">ID</th>
            <th className="border p-3">Username</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Role</th>
            <th className="border p-3">Blocked</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user._id} className="border p-4">
              <td className="border p-2">{user._id}</td>
              <td className="border p-2 text-xl font-bold">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <ToggleSwitch
                  checked={blockedStatus[user._id] || false}
                  onChange={() => handleToggle(user._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUsers;
