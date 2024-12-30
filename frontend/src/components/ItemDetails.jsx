import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import {
  ArrowLeft,
  Package2,
  Tags,
  CircleDollarSign,
  FileText,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InventoryModal from "./Modal";

const CategoryEmoji = ({ category }) => {
  const getEmoji = (category) => {
    const categoryMap = {
      electronics: "💻",
      clothing: "👕",
      food: "🍽️",
      default: "📦",
    };

    const normalizedCategory = category?.toLowerCase().trim();
    return categoryMap[normalizedCategory] || categoryMap.default;
  };

  return (
    <div className="group w-32 h-32 mx-auto mb-8 relative cursor-pointer transform">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-full animate-glow" />
      
      <div className="absolute inset-1 bg-white rounded-full shadow-inner flex items-center justify-center animate-pop">
        <span className="text-7xl">{getEmoji(category)}</span>
      </div>
    </div>
  );
};

const InfoCard = ({ icon: Icon, label, value, className }) => (
  <div
    className={`p-6 rounded-xl backdrop-blur-sm shadow-lg transition-all hover:shadow-xl ${className}`}
  >
    <div className="flex items-center mb-3">
      <Icon className="w-5 h-5 mr-2 opacity-70" />
      <strong className="text-lg opacity-80">{label}</strong>
    </div>
    <p className="text-xl font-semibold">{value || "N/A"}</p>
  </div>
);

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItemById, deleteItem, updateItem } = useInventory();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItemById(id);
        setItem(data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };
    fetchItem();
  }, [id, getItemById]);

  const handleEdit = async (formData) => {
    try {
      const data=await updateItem(item._id, formData);
      console.log("Updated item:", data.item);
      setItem(data.item)

    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to save item.");
    } finally {
      setModalOpen(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;
    setLoading(true);
    try {
      await deleteItem(item._id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete the item.");
    } finally {
      setLoading(false);
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50">
        <div className="text-lg text-gray-600 animate-pulse">
          Loading item details...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-violet-600 hover:text-violet-800 transition-colors font-medium"
      >
        <ArrowLeft className="mr-2 h-5 w-5" /> Back to Items
      </button>

      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 mt-6 border border-violet-100">
        <CategoryEmoji category={item.category} />

        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-center mb-8">
          {item.itemName}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <InfoCard
            icon={Tags}
            label="Category"
            value={item.category}
            className="bg-gradient-to-br from-violet-50/80 to-fuchsia-50/80"
          />
          <InfoCard
            icon={Package2}
            label="Quantity"
            value={item.quantity}
            className="bg-gradient-to-br from-fuchsia-50/80 to-pink-50/80"
          />
          <InfoCard
            icon={CircleDollarSign}
            label="Price"
            value={`$${item.price}`}
            className="bg-gradient-to-br from-violet-50/80 to-fuchsia-50/80"
          />
          <InfoCard
            icon={FileText}
            label="Description"
            value={item.description}
            className="bg-gradient-to-br from-fuchsia-50/80 to-pink-50/80"
          />
        </div>

        <div className="flex space-x-4 justify-center">
          <button
            onClick={() => setModalOpen(true)}
            className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl hover:from-violet-700 hover:to-fuchsia-700 transition-all transform hover:-translate-y-0.5"
          >
            Edit Item
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className={`px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl hover:from-red-700 hover:to-pink-700 transition-all transform hover:-translate-y-0.5 ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Deleting..." : "Delete Item"}
          </button>
        </div>
      </div>
      {modalOpen && (
        <InventoryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          item={item}
          onSave={handleEdit}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ItemDetails;