import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams, useLocation } from 'react-router-dom';

const UpdatePhysioForm = () => {
  const { state } = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const [physioDetails, setPhysioDetails] = useState([]);
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
  });

  useEffect(() => {
    const getData = async () => {
      const physioRes = await axios.get(`http://localhost:4002/physios/${id}`);
      setPhysioDetails(physioRes.data);
      setFormData({
        ...formData,
        addressOne: state.physioDetails.addressOne,
        addressTwo: state.physioDetails.addressTwo,
        town: state.physioDetails.town,
        county: state.physioDetails.county,
        eircode: state.physioDetails.eircode,
        title: state.physioDetails.title,
        fname: state.physioDetails.fname,
        lname: state.physioDetails.lname,
        mobile: state.physioDetails.mobile,
        homePhone: state.physioDetails.homePhone,
        email: state.physioDetails.email,
      });
    };
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      await axios.patch(
        `http://localhost:4002/physios/${id}`,
        formData,
        config
      );

      history.push('/physios');
    } catch (error) {
      const errors = error.response.data.errors;
      console.log(errors);
    }
  };
  return (
    <div className="flex-col w-full justify-center items-center">
      <div className="text-left font-bold text-3xl py-3 ml-3">
        Update Physio
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

        <button
          class="bg-green-300 p-3 m-4 rounded-2xl font-bold block w-full"
          type="submit"
        >
          Update Physio
        </button>
      </form>
    </div>
  );
};

export default UpdatePhysioForm;
