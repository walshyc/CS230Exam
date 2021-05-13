import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';

const ClientProfile = () => {
  const { state } = useLocation();
  const [clientDetails, setClientDetails] = useState([]);
  const [clientSessions, setClientSessions] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const clientRes = await axios.get(
        `http://localhost:4002/clients/${state.client._id}`
      );
      const sessionsRes = await axios.get(
        `http://localhost:4002/sessions/${state.client._id}`
      );
      setClientDetails(clientRes.data);
      setClientSessions(sessionsRes.data);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-300 flex items-center  justify-top w-full pt-8 flex-col">
      <div className="w-full mx-10 rounded bg-white dark:bg-gray-800 shadow">
        <div className="w-full h-10 bg-green-300 rounded-t">
          <div className="flex flex-col justify-center items-start h-full w-full">
            <p className="w-full pl-4 text-xl font-bold">
              {clientDetails.fname} {clientDetails.lname}
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
                <div className="flex flex-col items-start">
                  <div className="">{clientDetails.address?.addressOne}</div>
                  <div className="">
                    {clientDetails.address?.addressTwo
                      ? clientDetails.address?.addressTwo
                      : ''}
                  </div>
                  <div className="">{clientDetails.address?.town}</div>
                  <div className="">{clientDetails.address?.county}</div>
                  <div className="">{clientDetails.address?.eircode}</div>
                </div>
              </div>
            </div>
            <div className="w-1/2"></div>
            <div className="w-1/2"></div>
          </div>
        </div>
      </div>
      {/* <UserOrders user={clientDetails} orders={userOrders}></UserOrders> */}
    </div>
  );
};

export default ClientProfile;
