import React, { useState } from "react";
import { useInventory } from "../context/InventoryContext";
import InventoryModal from "./Modal";
import { Link } from "react-router-dom";
import { Search, Plus, Edit2, Trash2, Package } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const InventoryDashboard = () => {
  const {
    filteredItems,
    loading,
    search,
    setSearch,
    filter,
    setFilter,
    addItem,
    updateItem,
    deleteItem,
    getItemById
  } = useInventory();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalMode, setModalMode] = useState("add");

  const handleOpenModal = (item = null) => {
    setSelectedItem(item);
    setModalMode(item ? "edit" : "add");
    setModalOpen(true);
  };

  const handleSaveItem = async (formData) => {
    try {
      if (modalMode === "edit") {
        await updateItem(selectedItem._id, formData);
      } else {
        await addItem(formData);
      }
    } catch (error) {
      toast.success("Failed to save item.");
    } finally {
      setModalOpen(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      electronics: "text-blue-600",
      clothing: "text-purple-600",
      food: "text-green-600",
    };
    return colors[category] || "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded p-6">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">Inventory Dashboard</h1>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Item
            </button>
          </header>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-full border rounded px-4 py-2"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full md:w-48 border rounded px-4 py-2"
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="food">Food</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="border rounded shadow p-4 transition-all duration-200 hover:shadow-lg"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                    <Link to={`/item/${item._id}`}>
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">
                        {item.itemName}
                      </h3>
                    </Link>
                      <span className={`text-sm font-medium ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Quantity</span>
                      <span className="font-medium">{item.quantity}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Price</span>
                      <span className="font-medium">${item.price}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <button
                      className="flex-1 border rounded px-4 py-2 flex items-center justify-center"
                      onClick={() => handleOpenModal(item)}
                    >
                      <Edit2 className="h-4 w-4 mr-1" /> Edit
                    </button>
                    <button
                      className="flex-1 border rounded px-4 py-2 flex items-center justify-center text-red-600 hover:bg-red-50"
                      onClick={() => deleteItem(item._id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>

      <InventoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        item={selectedItem}
        onSave={handleSaveItem}
      />
      <ToastContainer />
    </div>
  );
};

export default InventoryDashboard;