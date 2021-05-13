import React from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const SessionCard = ({ session }) => {
  const history = useHistory();
  const handleDelete = async (e) => {
    e.preventDefault();
    await axios.delete(
      `http://localhost:4002/sessions/${session._id}`
    );
    history.push('/');
  };

  return (
    <div className="w-full mx-10 rounded bg-white shadow mt-6">
      <div className="w-full h-10 bg-green-300 rounded-t">
        <div className="flex flex-col justify-center items-start h-full w-full">
          <p className="w-full pl-4 text-xl font-bold text-left">
            All Sessions
          </p>
        </div>
      </div>

      <div className="w-full border-t border-gray-400 bg-green-100 rounded-b h-full">
        <div className="flex flex-col justify-between">
          <div className="border-gray-600  border m-2 p-2 rounded shadow text-left flex flex-col sm:flex-row sm:flex-wrap ">
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
                <Link to={`/clients/${session.client._id}`}>
                  <div className="">
                    Client: {session.client.fname} {session.client.lname}
                  </div>
                </Link>
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
                <Link to={`/physios/${session.physio._id}`}>
                  <div className="">
                    Physio: {session.physio.fname} {session.physio.lname}
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <div className="">
                <div className="text-sm">{session.sessionNumber}</div>
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
                <Moment format="DD/MM/YYYY">{session.date}</Moment>
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
                <Moment format="HH:MM">{session.time}</Moment>
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <div className="">
                <div className="">Type: {session.type}</div>
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
                <div className="">Duration: {session.duration}</div>
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
                <div className="">Price: €{session.price}</div>
              </div>
            </div>
            <div className="w-full flex py-4">
              <div className="">{session.notes}</div>
            </div>
            <div className="w-full pl-4 flex justify-between py-2">
              <div className="flex justify-between w-10/12">
                <div className="w-10/12 mr-2">
                  <button
                    onClick={(e) => handleDelete(e)}
                    className="bg-red-400 py-3 px-2 flex rounded-xl shadow-lg w-full"
                  >
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <div>
                      <div>Delete Session</div>
                    </div>{' '}
                  </button>
                </div>
                <div className="w-10/12">
                  <Link
                    to={{
                      pathname: `/sessions/update/${session._id}`,
                      state: { session },
                    }}
                  >
                    <div className="bg-blue-400 py-3 px-2 flex rounded-xl shadow-lg w-full">
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <div>
                        <div>Update Session</div>
                      </div>{' '}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
