import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const NewSessionForm = () => {
  const [clients, setClients] = useState([]);
  const [physios, setPhysios] = useState([]);

  const sessionTypes = [
    'Assessment',
    'Massage Therapy',
    'Stretching and Exercising',
    'Technology(Lasers and /or Ultrasound)',
    'Hydrotherapy',
    'Electrotherapy',
  ];
  useEffect(() => {
    const getData = async () => {
      const clientsRes = await axios.get('http://localhost:4002/clients');
      const physiosRes = await axios.get('http://localhost:4002/physios');
      setClients(clientsRes.data);
      setPhysios(physiosRes.data);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let history = useHistory();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    physio: '',
    client: '',
    price: null,
    sessionNumber: '',
    duration: '',
    type: '',
    notes: '',
  });

  const { date, time, physio, client, price, duration, type, notes } = formData;

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
        'http://localhost:4002/sessions',
        formData,
        config
      );

     // history.push('/sessions');
    } catch (error) {
      const errors = error.response.data.errors;
      console.log(errors);
    }
  };
  return (
    <div className="flex-col w-full justify-center items-center">
      <div className="text-left font-bold text-3xl py-3 ml-3">
        Add new Session
      </div>
      <form onSubmit={(e) => onSubmit(e)} class="w-full flex flex-wrap">
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Session Date</span>
          <input
            required
            type="date"
            class="form-input mt-1 block w-full"
            name="date"
            value={date}
            onChange={(e) => onChange(e)}
          />
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Session Time</span>
          <input
            required
            name="time"
            value={time}
            onChange={(e) => onChange(e)}
            type="time"
            class="form-input mt-1 block w-full"
          />
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Physio</span>
          <select
            required
            name="physio"
            value={physio}
            onChange={(e) => onChange(e)}
            class="form-select block w-full mt-1"
          >
            <option disabled value=""></option>
            {physios.map((p) => (
              <option key={p._id} value={p._id}>
                {p.fname} {p.lname}
              </option>
            ))}
          </select>
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Client</span>
          <select
            required
            name="client"
            value={client}
            onChange={(e) => onChange(e)}
            class="form-select block w-full mt-1"
          >
            <option disabled value=""></option>
            {clients.map((c) => (
              <option key={c._id} value={c._id}>
                {c.fname} {c.lname}
              </option>
            ))}
          </select>
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Price</span>
          <input
            required
            type="number"
            class="form-input mt-1 block w-full"
            placeholder="€100"
            name="price"
            value={price}
            onChange={(e) => onChange(e)}
          />
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Duration/Cancelled/No Show</span>
          <input
            required
            type="text"
            class="form-input mt-1 block w-full"
            placeholder="1 hour"
            name="duration"
            value={duration}
            onChange={(e) => onChange(e)}
          />
        </label>
        <label class="block mx-4 w-full sm:w-5/12">
          <span class="text-gray-700">Type</span>
          <select
            required
            name="type"
            value={type}
            onChange={(e) => onChange(e)}
            class="form-select block w-full mt-1"
          >
            <option disabled value=""></option>
            {sessionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label class="block w-full">
          <span class="text-gray-700">Session Notes</span>
          <textarea
            required
            class="form-textarea mt-1 block w-full h-24"
            rows="3"
            placeholder="Enter any session notes."
            name="notes"
            value={notes}
            onChange={(e) => onChange(e)}
          ></textarea>
        </label>

        <button
          class="bg-green-300 p-3 m-4 rounded-2xl font-bold block w-full"
          type="submit"
        >
          Add New Session
        </button>
      </form>
    </div>
  );
};

export default NewSessionForm;