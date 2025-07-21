import React, { useEffect, useState } from 'react';
import { allStaff } from '../Services/authService';

const Staff = () => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      const data = await allStaff();
      setStaffList(data);
    };
    fetchStaff();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Our Staff Members</h1>
      <ul className="list-disc pl-6">
        {staffList.map((user) => (
          <li key={user._id} className="text-lg text-gray-700">
            {user.name} - <span className="capitalize text-orange-500">{user.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Staff;
