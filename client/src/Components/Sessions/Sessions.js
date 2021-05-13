import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SessionCard from './SessionCard';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('http://localhost:4002/sessions/');
      console.log(res.data);
      setSessions(res.data);
      console.log(sessions);
    };
    getData();
  }, []);
  return (
    <div className="w-full min-h-screen bg-gray-300">
      <div className="flex justify-center">
        <Link
          to="/sessions/add"
          class="bg-yellow-200 px-3 py-2 my-2 rounded-2xl shadow-xl font-bold text-2xl"
        >
          Add New Physio Session
        </Link>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-1 w-full">
        {sessions.map((s, i) => (
          <SessionCard key={i} session={s}></SessionCard>
        ))}
      </div>
    </div>
  );
};

export default Sessions;
