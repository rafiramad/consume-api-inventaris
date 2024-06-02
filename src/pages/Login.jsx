import React, { useState } from "react";
import axios from "axios"; // menyambungkan front end dan back end (req API)
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  // [] tipe data object

  const [error, setError] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const errorMessage = new URLSearchParams(location.search).get("message");

  const handleLogin = (event) => {
    // ketika event terjadi javascript akan meberikan respon
    // axios.MethodApi('LinkAPI'), variable
    event.preventDefault();

    axios
      .post("http://localhost:8000/login", values)
      .then((res) => {
        // krtika berhasil mau ngapain
        // res  = response
        localStorage.setItem("access_token", res.data.data.access_token); // menyimpan token di dalam penyimpanan lokal (browser sementara) - data.data = masuk kedalam data dan di dalam data itu ada data lagiq

        navigate("/profile"); // mengarahkan setelah login menuju halaman profile (menjalankan halaman)
      })
      .catch((err) => {
        // ketika gagal mau ngapain
        setError(err.response.data);
        // console.log(err)
      });
  };

  return (
    <div className="bg-white-900 dark:bg-white-900 min-h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">LOGIN </h1>
          <hr></hr>
          {errorMessage && (
            <div className="bg-red-100 border-r border-b border-red-500 text-red-700 px-4 py-3" role="alert">
              <p className="font-bold">Gagal Memuat Halaman</p>
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          {Object.keys(error).length > 0 >
          (
            <div role="alert">
              <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <ul>
                  {
                    // Lopping di react mau object/array pake map
                    // key = mengambil key object/array
                    // value : mengambil isi per satu satunya
                    // () = memanggil index
                    // {} = memanggil variable
                    // length = panjang nilai (apakah ada isi data)

                    Object.entries(error).map(([key, value]) => (
                      <li key={key}>{key !== "status" ? value : ""}</li>
                    ))
                  }
                </ul>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-8 md:space-y-8">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                onChange={(e) => setValues({ ...values, email: e.target.value })} // e = event mengambil data email melalu
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setValues({ ...values, password: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
