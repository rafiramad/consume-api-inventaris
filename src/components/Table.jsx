import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Table({ dataTh, dataTd, coloumDB, buttonData, endpoints, coloumnDetail, judulModalEdit, inputData }) {
  const [isOpenModalDelete, setisOpenModalDelete] = useState(false);
  const [endpointsReplaced, setEndpointsrReplaced] = useState({});
  const [isOpenModalEdit, setisOpenModalEdit] = useState(false);
  const [isOpenModalAdd, setisOpenModalAdd] = useState(false);

  function handleModalEdit(id) {
    const endpointsDetail = endpoints["detail"];
    const endpointsUpdate = endpoints["update"];
    //replace/ganti {id} dari endpoint dgn id yg di klik
    const detailReplaced = endpointsDetail.replace("{id}", id);
    const updateReplaced = endpointsUpdate.replace("{id}", id);
    //simpan di object baru
    const replaced = {
      detail: detailReplaced,
      update: updateReplaced,
    };
    //kirim ke state
    setEndpointsrReplaced(replaced);
    // ubah state agar modal tampil
    setisOpenModalEdit(true);
  }

  const navigate = useNavigate();

  function handleModalDelete(id) {
    const endpointsDetail = endpoints["detail"];
    const endpointsDelete = endpoints["delete"];
    //replace/ganti {id} dari endpoint dgn id yg di klik
    const detailReplaced = endpointsDetail.replace("{id}", id);
    const deleteReplaced = endpointsDelete.replace("{id}", id);
    //simpan di object baru
    const replaced = {
      detail: detailReplaced,
      delete: deleteReplaced,
    };
    //kirim ke state
    setEndpointsrReplaced(replaced);
    // ubah state agar modal tampil
    setisOpenModalDelete(true);
  }

  function handleModalAdd() {
    const replaced = {
      create: endpoints["create"],
    };
    setEndpointsrReplaced(replaced);
    setisOpenModalAdd(true);
  }

  function handleRestore(id) {
    let endpointRestore = endpoints["restore"].replace("{id}", id);
    axios
      .get(endpointRestore, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        const sortedStuffs = res.data.data.sort((a, b) => a.id - b.id);
        setStuffs(sortedStuffs);
        navigate("/stuffs");
      })

      .catch((err) => {
        console.log(err);
      });
  }

  function handlePermanetDelete(id) {
    let endpointPermanentDelete = endpoints["permanent-delete"].replace("{id}", id);
    axios
      .get(endpointPermanentDelete, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        navigate("/stuffs");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10">
        <div className="flex justify-end mb-5">
          {buttonData.includes("create") ? (
            <button
              onClick={handleModalAdd}
              type="button"
              class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Create
            </button>
          ) : (
            ""
          )}
          {buttonData.includes("trash") ? (
            <Link
              to={"/stuffs/trash"}
              class="ml-3 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Trash
            </Link>
          ) : (
            ""
          )}
        </div>

        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class=" bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {dataTh.map((data, Index) => (
                <th scope="col" class="px- py-3" key={Index}>
                  {data}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(dataTd).map(([index, value]) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-7 py-3">{parseInt(index) + 1}.</td>
                {Object.entries(coloumDB).map(([i, v]) => (
                  <td class="px-7 py-3">{!v ? value[i] : value[i.replace(/[!@#$%^&]/, "")] ? value[i.replace(/[!@#$%^&]/, "")][v] : "0"}</td>
                ))}

                <td class="px-7 py-3">
                  {buttonData.includes("edit") ? (
                    <a onClick={() => handleModalEdit(value.id)} href="#" class="font-medium text-blue0 dark:text-blue-500 hover:underline">
                      edit
                    </a>
                  ) : (
                    ""
                  )}

                  {buttonData.includes("delete") ? (
                    <a onClick={() => handleModalDelete(value.id)} href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline ml-3">
                      delete
                    </a>
                  ) : (
                    ""
                  )}

                  {buttonData.includes("restore") ? (
                    <a href="#" onClick={() => handleRestore(value.id)} class="font-medium text-green-600 dark:text-green-500 hover:underline">
                      restore
                    </a>
                  ) : (
                    ""
                  )}

                  {buttonData.includes("permanent-delete") ? (
                    <a href="#" onClick={() => handlePermanetDelete(value.id)} class="ml-2 font-medium text-red-600 dark:text-red-500 hover:underline">
                      permanent-delete
                    </a>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalDelete isOpen={isOpenModalDelete} closeModal={() => setisOpenModalDelete(false)} endpoints={endpointsReplaced} coloumnDetail={coloumnDetail}></ModalDelete>
      <ModalEdit isOpen={isOpenModalEdit} closeModal={() => setisOpenModalEdit(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpointsReplaced}></ModalEdit>
      <ModalAdd isOpen={isOpenModalAdd} closeModal={() => setisOpenModalAdd(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpoints}></ModalAdd>
    </>
  );
}
