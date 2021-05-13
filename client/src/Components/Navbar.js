import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-gray-800 text-gray-100 shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <Link
          to="/"
          className="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
        >
          CS230 Physio
        </Link>
      </div>
      <div>
        <Link
          to="/clients"
          className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-6"
        >
          Clients
        </Link>
        <Link
          to="/physios"
          className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-6"
        >
          Physios
        </Link>
        <Link
          to="/sessions"
          className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-6"
        >
          Sessions
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
