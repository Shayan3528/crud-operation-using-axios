import api from "./api/api.js";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

import AddModal from "./Component/AddModal";
export default function App() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);

  const handleDeleteItem = async (itemId) => {
    if (confirm("Want to Delete ?")) {
      await api.delete(`/posts/${itemId}`);
    }
  };

  const handleEdit = (updateItem) => {
    setUpdateItem(updateItem);
    setShowModal(true);
  };

  useEffect(() => {
    let ignore = false;
    const fetchPosts = async () => {
      if (!ignore) {
        const respose = await api.get("/posts");
        if (respose && respose.data) {
          setItems(respose.data);
        }
      }
    };

    fetchPosts();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      <nav className="bg-gray-700 flex justify-center item-center w-full h-[40px]">
        <span className="text-white "> CRUD Operation </span>
      </nav>
      <div className="ml-10 mt-10">
        <button
          onClick={() => setShowModal(!showModal)}
          className=" border border-green-400 px-3 rounded bg-green-400 cursor-pointer"
        >
          Add New
        </button>
      </div>
      <div className="flex justify-center items-center ">
        {showModal && (
          <AddModal
            showModal={setShowModal}
            items={items}
            updateItem={updateItem}
            setUpdateItem = {setUpdateItem}
          />
        )}
      </div>

      <div>
        <table className="min-w-[600px] w-4/5 mx-auto mt-10 border border-gray-300 rounded shadow-lg">
          <thead>
            <tr className="bg-green-400 text-gray-900 text-left">
              <th className="py-3 px-5 border-b border-gray-200">Name</th>
              <th className="py-3 px-5 border-b border-gray-200">Address</th>
              <th className="py-3 px-5 border-b border-gray-200">Location</th>
              <th className="py-3 px-5 border-b border-gray-200 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-100 transition-all duration-200"
              >
                <td className="py-3 px-5 border-b border-gray-200">
                  {item.name}
                </td>
                <td className="py-3 px-5 border-b border-gray-200">
                  {item.address}
                </td>
                <td className="py-3 px-5 border-b border-gray-200">
                  {item.location}
                </td>
                <td className="py-3 px-5 border-b border-gray-200 text-center">
                  <div className="flex justify-center gap-4">
                    <RiDeleteBin6Line
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    />
                    <FaRegEdit
                      onClick={() => handleEdit(item)}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
