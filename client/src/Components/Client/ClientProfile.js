import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { Link, useHistory, useParams } from 'react-router-dom';
import ClientSessions from './ClientSessions';

const ClientProfile = () => {
  const history = useHistory();

  const { id } = useParams();
  const [clientDetails, setClientDetails] = useState([]);
  const [clientSessions, setClientSessions] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const clientRes = await axios.get(`http://localhost:4002/clients/${id}`);
      const sessionsRes = await axios.get(
        `http://localhost:4002/sessions/client/${id}`
      );
      setClientDetails(clientRes.data);
      setClientSessions(sessionsRes.data);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    await axios.delete(`http://localhost:4002/clients/${id}`);
    history.push('/clients');
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center  justify-top w-full pt-8 flex-col">
      <div className="w-full mx-10 rounded bg-white  shadow">
        <div className="w-full h-10 bg-green-300 rounded-t">
          <div className="flex flex-col justify-center items-start h-full w-full">
            <p className="w-full pl-4 text-xl font-bold text-left">
              {clientDetails.title} {clientDetails.fname} {clientDetails.lname}
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
                <a href={`tel:${clientDetails.mobile}`}>
                  {clientDetails.mobile}
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
                <a href={`tel:${clientDetails.homePhone}`}>
                  {clientDetails.homePhone}
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
                <a href={`mailto:${clientDetails.email}`}>
                  {clientDetails.email}
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
                <div className="flex flex-col items-start justify-start">
                  <div className="text-left">
                    {clientDetails.addressOne}{' '}
                    {clientDetails.addressTwo ? clientDetails.addressTwo : ''}{' '}
                    {clientDetails.town} {clientDetails.county}{' '}
                    {clientDetails.eircode}
                  </div>
                </div>
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
                    d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                  />
                </svg>
                <div>
                  <Moment format="DD/MM/YYYY">{clientDetails.dob}</Moment>
                </div>
              </div>
              {clientDetails.parentGuardian?.length > 0 ? (
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <div>Parent/Guardian: {clientDetails.parentGuardian}</div>
                </div>
              ) : (
                ''
              )}
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <div>
                  <div>Doctor: {clientDetails.doctor}</div>
                </div>
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
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <div>
                    Permission to contact:{' '}
                    {clientDetails.permission ? 'Yes' : 'No'}
                  </div>
                </div>
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <div>
                  <div>Referred By: {clientDetails.referredBy}</div>
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
                        <div>Delete Client</div>
                      </div>{' '}
                    </button>
                  </div>
                  <div className="w-10/12">
                    <Link
                      to={{
                        pathname: `/clients/update/${id}`,
                        state: { clientDetails },
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
                          <div>Update Client</div>
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
      <ClientSessions
        client={clientDetails}
        sessions={clientSessions}
      ></ClientSessions>
    </div>
  );
};

export default ClientProfile;
