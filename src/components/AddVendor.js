import React, { useState } from 'react';
import Modal from './reUsableCmponent/modal/Modal';
 // Ensure this is the correct path for your Modal component

const YourFormComponent = ({ isModalVisible, handleModalClose, editPopupData, isLoadingMutation, isLoadingEdit, onSubmit }) => {
  const [formData, setFormData] = useState({
    vendorName: editPopupData ? editPopupData.name : '',
    description: editPopupData ? editPopupData.description : '',
    location: editPopupData ? editPopupData.location : '',
    selectedPlan: editPopupData ? editPopupData.selectedPlan : '',
    kitchenStatus: editPopupData ? editPopupData.kitchenStatus : '',
    coverImage: null,
    logo: null,
    category: editPopupData ? editPopupData.category : '',
  });

  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  // Handle file input change (for images)
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'coverImage') {
      setFormData({ ...formData, coverImage: file });
      setCoverImagePreview(URL.createObjectURL(file));
    } else if (type === 'logo') {
      setFormData({ ...formData, logo: file });
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onClose={handleModalClose}
      modalHeader={editPopupData ? "Edit Zone" : "Add Zone"}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Vendor Name */}
        <div>
          <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700">
            Vendor Name
          </label>
          <input
            type="text"
            name="vendorName"
            id="vendorName"
            className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            value={formData.vendorName}
            onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="mt-1 block w-full h-20 border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        {/* Selected Plan Dropdown */}
        <div>
          <label htmlFor="selectedPlan" className="block text-sm font-medium text-gray-700">
            Selected Plan
          </label>
          <select
            name="selectedPlan"
            id="selectedPlan"
            className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            value={formData.selectedPlan}
            onChange={(e) => setFormData({ ...formData, selectedPlan: e.target.value })}
          >
            <option value="">Select Plan</option>
            <option value="Pro">Pro</option>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        {/* Kitchen Status Dropdown */}
        <div>
          <label htmlFor="kitchenStatus" className="block text-sm font-medium text-gray-700">
            Kitchen Status
          </label>
          <select
            name="kitchenStatus"
            id="kitchenStatus"
            className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            value={formData.kitchenStatus}
            onChange={(e) => setFormData({ ...formData, kitchenStatus: e.target.value })}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Category Dropdown */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Grocery">Grocery</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>

        {/* Cover Image Upload */}
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
            Cover Image
          </label>
          <input
            type="file"
            name="coverImage"
            id="coverImage"
            accept="image/*"
            className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => handleFileChange(e, 'coverImage')}
          />
          {coverImagePreview && (
            <div className="mt-2">
              <img src={coverImagePreview} alt="Cover Preview" className="w-32 h-32 object-cover rounded-md" />
            </div>
          )}
        </div>

        {/* Logo Upload */}
        <div>
          <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
            Logo
          </label>
          <input
            type="file"
            name="logo"
            id="logo"
            accept="image/*"
            className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => handleFileChange(e, 'logo')}
          />
          {logoPreview && (
            <div className="mt-2">
              <img src={logoPreview} alt="Logo Preview" className="w-32 h-32 object-cover rounded-md" />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center p-6">
          <button
            disabled={isLoadingMutation || isLoadingEdit}
            type="submit"
            className="bg-[#E88B13] hover:bg-[#E88B13] text-white font-bold py-2 px-6 rounded-3xl"
          >
            {isLoadingMutation || isLoadingEdit ? "loading..." : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default YourFormComponent;
