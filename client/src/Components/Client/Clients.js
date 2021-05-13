import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ClientCard from './ClientCard';

const Clients = () => {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('http://localhost:4002/clients');
      setClients(res.data);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full min-h-screen bg-gray-300">
      <div className="flex justify-center">
        <Link to='/clients/add' class='bg-green-300 px-3 py-2 my-2 rounded-2xl shadow-xl font-bold text-2xl'>Add New User</Link>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-1 w-full">
        {clients.map((c, i) => (
          <ClientCard key={i} client={c}></ClientCard>
        ))}
      </div>
    </div>
  );
};

export default Clients;
