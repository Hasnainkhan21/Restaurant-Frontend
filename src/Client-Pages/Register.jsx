import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import bgimg from '../assets/herroo.jpg';
import { registerUser } from '../Services/authService'; 
import Alert from '@mui/material/Alert';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);
      setMessage(res.message);
      setAlertType('success');
      setTimeout(() => {
        navigate('/login');
      }, 1500); 
    } catch (err) {
      setMessage(err.message || 'Registration failed');
      setAlertType('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4" style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    > 
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Register</h2>
        {message && <Alert severity={alertType} className="mb-4">{message}</Alert>}
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded"
        />
        {errors.name && <p className="text-red-500 text-[12px]">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded"
        />
        {errors.email && <p className="text-red-500 text-[12px]">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded"
        />
        {errors.password && <p className="text-red-500 text-[12px]">{errors.password.message}</p>}

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
