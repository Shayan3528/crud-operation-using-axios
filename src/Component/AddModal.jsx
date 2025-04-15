import axios from "axios";
import { useState } from "react";

export default function AddModal({ showModal, items, updateItem }) {
  const [item, setItem] = useState(
    updateItem || {
      name: "",
      address: "",
      location: "",
    }
  );
  const [filterItem, setFilterItem] = useState(null);

  const [isAdd, setIsAdd] = useState(Object.is(updateItem, null));

  function handleChange(e) {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  }

  const handleAddPost = async (e) => {
    e.preventDefault();

    if (isAdd) {
      const id = items.length ? Number(items[items.length - 1].id) + 1 : 1;
      const finalItem = {
        id: id.toString(),
        ...item,
      };
      await axios.post("http://localhost:9000/posts", finalItem);
    } else {
      const afterUpdateItem = {
        id: updateItem.id,
        name: item.name,
        address: item.address,
        location: item.location,
      };
      await axios.patch(
        `http://localhost:9000/posts/${updateItem.id}`,
        afterUpdateItem
      );
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
      {/* Backdrop with opacity and blur effect */}
      <div className="absolute inset-0 bg-gray-300 bg-opacity-70 backdrop-blur-sm"></div>

      {/* Modal box */}
      <div className="relative bg-gray-700 w-[90%] max-w-md p-8 rounded-2xl shadow-xl z-10 pointer-events-auto">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          {isAdd ? "Add New Entry" : "Edit Task"}
        </h2>
        <form onSubmit={handleAddPost} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-white font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={item.name}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Enter name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="address" className="text-white font-medium mb-1">
              Address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              value={item.address}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter address"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="location" className="text-white font-medium mb-1">
              Location
            </label>
            <input
              id="location"
              type="text"
              name="location"
              value={item.location}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter location"
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => showModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {isAdd ? "Save" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
