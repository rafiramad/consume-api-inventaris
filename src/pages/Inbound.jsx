import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function InboundCreate() {
  const [payload, setPayload] = useState({
    date: null,
    stuff_id: null,
    total: null,
    proff_file: null,
  });

  const [stuff, setStuff] = useState({});
  const [error, setError] = useState({});
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/stuffs", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setStuff(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          navigate("/login?message=" + encodeURIComponent("Anda belum login!"));
        }
      });
  }, []);

  function handleInputFileChange(e) {
    const { name, files } = e.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: files[0],
    }));
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    console.log(payload);
    axios
      .post("http://localhost:8000/inbound-stuffs/store", payload, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setError({});
        setAlert(true);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }

  return (
    <>
      <Navbar></Navbar>

      <div className="bg-blue-100 min-h-screen py-7 px-4">
        <div className="bg-white py-7 px-4 mx-auto border-lg border-gray-300 max-w-2xl lg:py-16 rounded-lg shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-black">Add Data</h2>
          {alert && (
            <div className="p-4 mb-4 text-green-700 bg-green-50 rounded-lg" role="alert">
              <span className="font-medium">Success:</span> Check inbound data on{" "}
              <b>
                <Link to="/">this page</Link>
              </b>
              .
            </div>
          )}
          {Object.keys(error).length > 0 && (
            <div role="alert">
              <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">Gagal!</div>
              <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700 mb-4">
                <ul>
                  {Object.entries(error).map(([key, value]) => (
                    <li key={key}>{key !== "status" && key !== "message" ? value : ""}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmitForm}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-black">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  onChange={(e) => setPayload({ ...payload, date: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
              <div>
                <label htmlFor="stuff" className="block mb-2 text-sm font-medium text-black">
                  Stuff
                </label>
                <select
                  id="stuff"
                  name="stuff_id"
                  onChange={(e) => setPayload({ ...payload, stuff_id: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                >
                  <option hidden disabled selected>
                    Select Stuff
                  </option>
                  {Object.entries(stuff).map(([index, item]) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="total" className="block mb-2 text-sm font-medium text-black">
                  Total Stuff
                </label>
                <input
                  type="number"
                  name="total"
                  id="total"
                  onChange={(e) => setPayload({ ...payload, total: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="proff_file" className="block mb-2 text-sm font-medium text-black">
                  Proff File
                </label>
                <input
                  type="file"
                  name="proff_file"
                  id="proff_file"
                  onChange={handleInputFileChange}
                  className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            >
              Add Inbound
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
