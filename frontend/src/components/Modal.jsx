import React from "react";
import { FiX } from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from "yup";

const InventoryModal = ({ isOpen, onClose, item, onSave, mode }) => {
  const initialValues = item || {
    itemName: "",
    quantity: "",
    price: "",
    category: "",
    description: "",
  };

  const validationSchema = Yup.object({
    itemName: Yup.string()
      .required("Item name is required")
      .min(2, "Item name must be at least 2 characters"),
    quantity: Yup.number()
      .typeError("Quantity must be a number")
      .integer("Quantity must be a whole number")
      .min(0, "Quantity cannot be negative")
      .required("Quantity is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than zero")
      .required("Price is required"),
    category: Yup.string()
      .required("Category is required"),
    description: Yup.string()
      .max(500, "Description cannot exceed 500 characters"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSave(values);
      onClose();
    },
    enableReinitialize: true,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-lg max-h-[90vh] rounded-2xl bg-white p-4 md:p-6 shadow-xl overflow-y-auto">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              {mode === "edit" ? "Edit Item" : "Add New Item"}
            </h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1 hover:bg-gray-100 transition-colors"
            >
              <FiX className="text-2xl text-gray-500" />
            </button>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6 overflow-y-auto max-h-[75vh]">
            <div>
              <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <input
                id="itemName"
                type="text"
                placeholder="Enter item name"
                {...formik.getFieldProps("itemName")}
                className={`w-full px-4 py-3 rounded-xl border ${
                  formik.touched.itemName && formik.errors.itemName ? "border-red-500" : "border-gray-200"
                } focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none`}
              />
              {formik.touched.itemName && formik.errors.itemName && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.itemName}</p>
              )}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                {...formik.getFieldProps("category")}
                className={`w-full px-4 py-3 rounded-xl border ${
                  formik.touched.category && formik.errors.category
                    ? "border-red-500"
                    : "border-gray-200"
                } focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none`}
              >
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="food">Food</option>
                <option value="other">Other</option>
              </select>
              {formik.touched.category && formik.errors.category && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.category}</p>
              )}
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                min="0"
                placeholder="Enter quantity"
                {...formik.getFieldProps("quantity")}
                className={`w-full px-4 py-3 rounded-xl border ${
                  formik.touched.quantity && formik.errors.quantity ? "border-red-500" : "border-gray-200"
                } focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none`}
              />
              {formik.touched.quantity && formik.errors.quantity && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.quantity}</p>
              )}
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter price"
                {...formik.getFieldProps("price")}
                className={`w-full px-4 py-3 rounded-xl border ${
                  formik.touched.price && formik.errors.price ? "border-red-500" : "border-gray-200"
                } focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none`}
              />
              {formik.touched.price && formik.errors.price && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.price}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter item description"
                {...formik.getFieldProps("description")}
                rows="3"
                className={`w-full px-4 py-3 rounded-xl border ${
                  formik.touched.description && formik.errors.description ? "border-red-500" : "border-gray-200"
                } focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none`}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.description}</p>
              )}
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 md:px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 md:px-6 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                {mode === "edit" ? "Update" : "Add"} Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InventoryModal;