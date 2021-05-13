import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const NewClientForm = () => {
  let history = useHistory();
  const [formData, setFormData] = useState({
    addressOne: '',
    addressTwo: '',
    town: '',
    county: '',
    eircode: '',
    title: '',
    fname: '',
    lname: '',
    mobile: '',
    homePhone: '',
    email: '',
    dob: '',
    parentGuardian: '',
    permission: true,
    referredBy: '',
    doctor: '',
  });

  const {
    addressOne,
    addressTwo,
    town,
    county,
    eircode,
    title,
    fname,
    lname,
    mobile,
    homePhone,
    email,
    dob,
    parentGuardian,
    permission,
    referredBy,
    doctor,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      };
      console.log(formData);

      const res = await axios.post(
        'http://localhost:4002/clients',
        formData,
        config
      );

      history.push('/clients');
    } catch (error) {
      const errors = error.response.data.errors;
      console.log(errors);
    }
  };
  return (
    <div className="flex-col w-full justify-center items-center">
      <div className="text-left font-bold text-3xl py-3 ml-3">
        Add new Client{' '}
      </div>
      <form onSubmit={(e) => onSubmit(e)} class="w-full flex flex-wrap">
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Title</span>
          <select
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            class="form-select block w-full mt-1"
          >
            <option value="Mx">Mx</option>
            <option value="Ms">Ms</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Dr">Dr</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">First name</span>
          <input
            type="text"
            class="form-input mt-1 block w-full"
            placeholder="John"
            name="fname"
            value={fname}
            onChange={(e) => onChange(e)}
          />
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Second name</span>
          <input
            type="text"
            class="form-input mt-1 block w-full"
            placeholder="Doe"
            name="lname"
            value={lname}
            onChange={(e) => onChange(e)}
          />
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Mobile</span>
          <input
            type="text"
            class="form-input mt-1 block w-full"
            placeholder="08712356985"
            name="mobile"
            value={mobile}
            onChange={(e) => onChange(e)}
          />
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Home Phone</span>
          <input
            type="text"
            class="form-input mt-1 block w-full"
            placeholder="015896238"
            name="homePhone"
            value={homePhone}
            onChange={(e) => onChange(e)}
          />
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Email address</span>
          <input
            type="email"
            class="form-input mt-1 block w-full"
            placeholder="john@email.com"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Address Line 1</span>
          <input
            type="text"
            class="form-input mt-1 block w-full"
            placeholder="100 Station Road"
            name="addressOne"
            value={addressOne}
            onChange={(e) => onChange(e)}
          />
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Address Line 2</span>
          <input
            type="text"
            class="form-input mt-1 block w-full"
            placeholder="The Valley"
            name="addressTwo"
            value={addressTwo}
            onChange={(e) => onChange(e)}
          />
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Town</span>
          <input
            type="text"
            class="form-input mt-1 block w-full"
            placeholder="Maynooth"
            name="town"
            value={town}
            onChange={(e) => onChange(e)}
          />
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">County</span>
          <input
            type="text"
            class="form-input mt-1 block w-full"
            placeholder="Co. Kildare"
            name="county"
            value={county}
            onChange={(e) => onChange(e)}
          />
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Eircode</span>
          <input
            type="text"
            class="form-input mt-1 block w-full"
            placeholder="F25 YH72"
            name="eircode"
            value={eircode}
            onChange={(e) => onChange(e)}
          />
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Date of Birth</span>
          <input
            type="date"
            class="form-input mt-1 block w-full"
            name="dob"
            value={dob}
            onChange={(e) => onChange(e)}
          />
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Parent/Gardian</span>
          <input
            type="text"
            class="form-input mt-1 block w-full"
            placeholder="Tom Smith"
            name="parentGuardian"
            value={parentGuardian}
            onChange={(e) => onChange(e)}
          />
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Doctor</span>
          <input
            type="text"
            class="form-input mt-1 block w-full"
            placeholder="Dr Dolittle"
            name="doctor"
            value={doctor}
            onChange={(e) => onChange(e)}
          />
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Refrerred By</span>
          <input
            type="text"
            class="form-input mt-1 block w-full"
            placeholder="Mary Jones"
            name="referredBy"
            value={referredBy}
            onChange={(e) => onChange(e)}
          />
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Permission to contact</span>
          <select
            name="permission"
            value={permission}
            onChange={(e) => onChange(e)}
            class="form-select block w-full mt-1"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </label>
        {/* <div class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Permission to contact</span>
          <div class="mt-2">
            <div>
              <label class="inline-flex items-center">
                <input
                  class="form-radio"
                  type="radio"
                  name="radio-direct"
                  value="yes"
                />
                <span class="ml-2">Yes</span>
              </label>
            </div>
            <div>
              <label class="inline-flex items-center">
                <input
                  class="form-radio"
                  type="radio"
                  name="radio-direct"
                  value="no"
                />
                <span class="ml-2">No</span>
              </label>
            </div>
          </div>
        </div> */}

        <button
          class="bg-green-300 p-3 m-4 rounded-2xl font-bold block w-full"
          type="submit"
        >
          Add New Client
        </button>
      </form>
    </div>
  );
};

export default NewClientForm;
