import React, { useState, useEffect } from 'react';
import { registerUser } from '../Services/authService'; 
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const StaffRegister = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const res = await registerUser(data, token);
      setSuccessMsg(res.message);
      setErrorMsg("");
      reset();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Registration failed");
      setSuccessMsg("");
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded text-center">
        <Alert severity="error" className="mb-4">Access Denied: Only admins can register staff.</Alert>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded">
      <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">Register Staff</h2>

      {errorMsg && <Alert severity="error" className="mb-4">{errorMsg}</Alert>}
      {successMsg && <Alert severity="success" className="mb-4">{successMsg}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Role</label>
          <select
            {...register("role", { required: "Role is required" })}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="chef">Chef</option>
            <option value="waiter">Waiter</option>
            <option value="inventory">Inventory</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          Register Staff
        </button>
      </form>
    </div>
  );
};

export default StaffRegister;
