import React from 'react';
import { Link } from 'react-router-dom';

const PhysioCard = ({ physio }) => {
  return (
    <div className="mx-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex justify-start items-start bg-yellow-200 px-3 py-2 my-2 rounded-2xl shadow-xl w-10/12 sm:w-80">
      <div className="pr-4">
        <svg
          className="w-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <div className="flex flex-col w-2/3">
        <div className="text-xl font-bold">
          {physio.fname} {physio.lname}
        </div>

        <Link
          to={{
            pathname: `/physios/${physio._id}`,
            state: { physio },
          }}
        >
          <button className="bg-green-300 hover:bg-yellow-100 opacity-90 text-gray-900 hover:text-gray-900 p-1  my-2 rounded-xl shadow-xl w-3/4 text-base font-bold">
            View {physio.fname}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PhysioCard;
