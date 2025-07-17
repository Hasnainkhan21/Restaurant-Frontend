import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import bgimg from '../assets/res.jpg';
import { loginUser } from '../Services/authService';
import Alert from '@mui/material/Alert';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      setMessage(res.message);
      setAlertType('success');
      localStorage.setItem('token', res.token); 
      localStorage.setItem('user', JSON.stringify(res.user));
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setMessage(err.message || 'Login failed');
      setAlertType('error');
      console.error(err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
      style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Login</h2>

        {message && <Alert severity={alertType} className="mb-4">{message}</Alert>}
        
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
          Login
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-orange-500 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
