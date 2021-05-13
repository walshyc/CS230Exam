import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className=" bg-gray-300">
      <div className="flex flex-col justify-content items-center pt-4">
        <Link to="/clients">
          <button className="py-3 px-4 text-2xl font-bold bg-green-400 text-black rounded-2xl shadow-2xl w-80 my-4">
            Clients
          </button>
        </Link>
        <Link to="/physios">
          <button className="py-3 px-4 text-2xl font-bold bg-blue-400 text-black rounded-2xl shadow-2xl w-80 my-4">
            Physios
          </button>
        </Link>
        <Link to="/Sessions">
          <button className="py-3 px-4 text-2xl font-bold bg-yellow-400 text-black rounded-2xl shadow-2xl w-80 my-4">
            Sessions
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
