import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const ClientSessions = ({ sessions, client }) => {
  console.log(sessions);

  return (
    <div className="w-full mx-10 rounded bg-white shadow mt-6">
      <div className="w-full h-10 bg-green-300 rounded-t">
        <div className="flex flex-col justify-center items-start h-full w-full">
          <p className="w-full pl-4 text-xl font-bold text-left">
            {client.fname}'s Sessions
          </p>
        </div>
      </div>

      <div className="w-full border-t border-gray-400 bg-green-100 rounded-b h-full">
        <div className="flex flex-col justify-between">
          {sessions
            .sort((a, b) => a.date > b.date)
            .map((sess) => (
              <div className="border-gray-600  border m-2 p-2 rounded shadow text-left flex flex-col sm:flex-row sm:flex-wrap ">
                <div className="w-full sm:w-1/2 pl-4 flex py-4">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                  <div className="">
                    <div className="text-sm">{sess.sessionNumber}</div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 pl-4 flex py-4">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>

                  <div className="">
                    <Moment format="DD/MM/YYYY">{sess.date}</Moment>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 pl-4 flex py-4 text-black font-bold text-lg">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <div className="">
                    <Link to={`/physios/${sess.physio._id}`}>
                      <div className="">
                        Physio: {sess.physio.fname} {sess.physio.lname}
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 pl-4 flex py-4">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="">
                    <div className="">Type: {sess.type}</div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 pl-4 flex py-4">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="">
                    <div className="">Duration: {sess.duration}</div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 pl-4 flex py-4">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <div className="">
                    <div className="">Price: €{sess.price}</div>
                  </div>
                </div>
                <div className="w-full flex py-4">
                  <div className="">{sess.notes}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ClientSessions;
