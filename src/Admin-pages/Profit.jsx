import React, { useEffect, useState } from 'react';
import { menuProfit } from '../Services/profitService';
import { Alert } from '@mui/material';

const Card = ({ price,expense, profit, color}) => (
  <div className={`p-6 shadow-lg  w-full md:w-[250px]`}>
    <h3 className="text-md font-semibold">Market Price : <span className='text-blue-400'>{price}</span></h3>
    <p className="text-md mt-2 font-bold">Inventory Expense: <span className='text-amber-500'>{expense}</span></p>
    <p className='text-md '>Profit: <span className={color}>{profit}</span> </p>
  </div>
);

const Profit = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await menuProfit();
        setItems(items);
        console.log(items);
      } catch (error) {
        console.log("Failed to fetch ", error);
      }
    };
    fetchData();
  }, []);

const user = JSON.parse(localStorage.getItem('user'))
  if (user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded text-center">
        <Alert severity="error" className="mb-4">Access Denied: Only admins can register staff.</Alert>
      </div>
    );
  }


  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='text-blue-500 text-3xl font-bold mb-6'>📊 My Profit and Loss</h1>


      <div className='flex flex-wrap gap-1'>
        {items.map((item, index) => (
          <div key={index} className='bg-white p-4 rounded-lg shadow w-full md:w-[300px]'>
            {item.profit < 0 && (
        <div className="mt-1 p-1 rounded bg-red-100 text-red-600 font-semibold">
          ⚠️ {item.menuName} is going in loss!
        </div>
      )}
            <h2 className='text-xl font-bold mb-4 text-amber-800'>{item.menuName}</h2>
            <div className='flex flex-col '>
            <Card price={item.price} expense={item.totalExpense} profit={item.profit} color={item.profit > 0 ? 'text-green-500' : 'text-red-500'} />              
            
      
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profit;
