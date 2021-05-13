import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams, Link } from 'react-router-dom';
import PhysioSessions from './PhysioSessions';

const PhysioProfile = () => {
  const history = useHistory();
  const { id } = useParams();
  const [physioDetails, setPhysioDetails] = useState([]);
  const [physioSessions, setPhysioSessions] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const clientRes = await axios.get(`http://localhost:4002/physios/${id}`);
      const sessionsRes = await axios.get(
        `http://localhost:4002/sessions/physio/${id}`
      );
      setPhysioDetails(clientRes.data);
      setPhysioSessions(sessionsRes.data);

    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDelete = async (e) => {
    e.preventDefault();
    await axios.delete(`http://localhost:4002/physios/${id}`);
    history.push('/physios');
  };
  return (
    <div className="min-h-screen bg-gray-300 flex items-center  justify-top w-full pt-8 flex-col">
      <div className="w-full mx-10 rounded bg-white dark:bg-gray-800 shadow">
        <div className="w-full h-10 bg-green-300 rounded-t">
          <div className="flex flex-col justify-center items-start h-full w-full">
            <p className="w-full pl-4 text-xl font-bold text-left">
              {physioDetails.title} {physioDetails.fname} {physioDetails.lname}
            </p>
          </div>
        </div>
        <div className="w-full border-t border-gray-400 bg-green-100 rounded-b h-full">
          <div className="flex justify-between flex-wrap">
            <div className="w-full flex flex-col sm:flex-row sm:flex-wrap ">
              <div className="w-full sm:w-1/2 pl-4 flex py-2">
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
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <a href={`tel:${physioDetails.mobile}`}>
                  {physioDetails.mobile}
                </a>
              </div>
              <div className="w-full sm:w-1/2 pl-4 flex py-2">
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
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <a href={`tel:${physioDetails.homePhone}`}>
                  {physioDetails.homePhone}
                </a>
              </div>
              <div className="w-full sm:w-1/2 pl-4 flex py-2">
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
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <a href={`mailto:${physioDetails.email}`}>
                  {physioDetails.email}
                </a>
              </div>
              <div className="w-full sm:w-1/2 pl-4 flex py-2">
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <div className="flex flex-col items-start">
                  <div className="text-left">
                    {physioDetails.addressOne}{' '}
                    {physioDetails.addressTwo ? physioDetails.addressTwo : ''}{' '}
                    {physioDetails.town} {physioDetails.county}{' '}
                    {physioDetails.eircode}
                  </div>
                </div>
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
                        <div>Delete Physio</div>
                      </div>{' '}
                    </button>
                  </div>
                  <div className="w-10/12">
                    <Link
                      to={{
                        pathname: `/physios/update/${id}`,
                        state: { physioDetails },
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
                          <div>Update Physio</div>
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
      <PhysioSessions
        physio={physioDetails}
        sessions={physioSessions}
      ></PhysioSessions>
    </div>
  );
};

export default PhysioProfile;
