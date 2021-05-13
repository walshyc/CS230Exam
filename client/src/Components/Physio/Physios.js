import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PhysioCard from './PhysioCard';

const Physios = () => {
  const [physios, setPhysios] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('http://localhost:4002/physios');
      setPhysios(res.data);
    };
    getData();
  }, []);
  return (
    <div className="w-full min-h-screen bg-gray-300">
      <div className="flex justify-center">
        <Link
          to="/physios/add"
          class="bg-yellow-200 px-3 py-2 my-2 rounded-2xl shadow-xl font-bold text-2xl"
        >
          Add New Physio
        </Link>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-1 w-full">
        {physios.map((p, i) => (
          <PhysioCard key={i} physio={p}></PhysioCard>
        ))}
      </div>
    </div>
  );
};

export default Physios;
