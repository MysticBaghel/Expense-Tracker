import React, { useState, useEffect } from 'react'
import {LuPlus} from 'react-icons/lu';
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverview = ({transactions,  onAddIncome}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
  if (!Array.isArray(transactions)) return; // skip if not an array

  const result = prepareIncomeBarChartData(transactions);
  setChartData(result);
}, [transactions]);


  return  <div className='card'>
    <div className='flex items-center justify-between'>
      <div className=''>
        <h5 className='text-lg text-black font-semibold'>Income Overview</h5>
        <p className='text-sm text-gray-400 mt-0.5'>
          Track your earnings over time and analyse your income trend,
        </p>
      </div>
      <button className='add-btn' onClick={onAddIncome}>
        <LuPlus className='text-lg' />
        Add Income 
      </button>
    </div>
    <div className='mt-10'>
      <CustomBarChart data = {chartData} />

    </div>
      
  </div>;
  
}

export default IncomeOverview
