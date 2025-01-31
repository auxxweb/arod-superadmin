import React from "react";
import { FaStar } from "react-icons/fa"; // Importing star icon from react-icons
import { useHistory } from "react-router-dom"; // Importing useHistory for navigation (if using react-router)

const vendor = {
  slNo: 10,
  id: "VEN0010",
  image: "/constants/vendor.png",
  name: "FreshMart Groceries",
  description:
    "FreshMart Groceries is a trusted supplier of farm-fresh fruits and vegetables, organic produce, and daily essentials. Known for timely deliveries and premium quality products, they cater to both individual customers and businesses.",
  status: true,
  vendorId: "VEN001",
  location: "Kozhikode",
  mainCourse: "The centerpiece of every meal, featuring bold flavors and satisfying portions, designed to delight and fulfill your appetite.",
  desserts: "Sweet Treats are the perfect way to end any meal, offering a variety of indulgent flavors and textures. Whether rich and creamy or light and refreshing, these delights provide a satisfying finish that leaves you with a smile.",
  kitchenStatus: "Active",
  ranking: 5,  // Rating now as a number (e.g., 5)
  viewedCount: 5000,
  plan: "Pro",
  menuImage: "/constants/dishes.png",  // Replaced with /constants/dishes.png
};

const VendorCard = () => {
  const history = useHistory(); // Hook to manage navigation

  // Create an array of stars based on the ranking (e.g., 5 stars)
  const stars = Array.from({ length: 5 }, (_, index) => index < vendor.ranking);

  return (
    <div className="max-w-4xl mx-auto bg-white border rounded-lg shadow-lg overflow-hidden p-6 sm:max-w-3xl md:max-w-2xl lg:max-w-4xl relative">
      {/* Back Button Positioned to the Left of the Card */}
      <button
        onClick={() => history.goBack()} // Navigate back to the previous page
        className="absolute top-4 left-[-50px] bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600"
      >
        Back
      </button>

      <img
        src={vendor.image}
        alt={vendor.name}
        className="h-64 w-full object-cover rounded-lg"
      />
      <div className="mt-6">
        <h2 className="text-3xl font-semibold text-gray-800">{vendor.name}</h2>
        <p className="text-gray-600 mt-2">{vendor.description}</p>
        
        <div className="mt-4">
          <span className="text-sm text-gray-500">Vendor ID: {vendor.vendorId}</span>
          <span className="text-sm text-gray-500 ml-4">Sl No: {vendor.slNo}</span>
        </div>

        <div className="mt-4">
          <span className="text-sm text-gray-500">Location: {vendor.location}</span>
          <span className="text-sm text-gray-500 ml-4">Plan: {vendor.plan}</span>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-xl text-gray-800">Menu</h3>

          {/* Menu Section */}
          <div className="mt-4 flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0">
            {/* Main Course */}
            <div className="flex items-center space-x-4 sm:space-x-6 w-full sm:w-1/2">
              <img
                src={vendor.menuImage}
                alt="Main Course"
                className="w-24 h-24 object-cover rounded-lg shadow-md"
              />
              <div>
                <h4 className="font-semibold text-gray-700">Main Course</h4>
                <p className="text-gray-600 text-sm">{vendor.mainCourse}</p>
              </div>
            </div>

            {/* Desserts */}
            <div className="flex items-center space-x-4 sm:space-x-6 w-full sm:w-1/2">
              <img
                src={vendor.menuImage}
                alt="Dessert"
                className="w-24 h-24 object-cover rounded-lg shadow-md"
              />
              <div>
                <h4 className="font-semibold text-gray-700">Desserts</h4>
                <p className="text-gray-600 text-sm">{vendor.desserts}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center">
            {vendor.status ? (
              <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs">
                Active
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-200 text-red-800 rounded-full text-xs">
                Inactive
              </span>
            )}
            <span className="ml-4 text-sm text-gray-500">Ranking: {vendor.ranking} star</span>
          </div>

          {/* Rating & Views Section with Enhanced Style */}
          <div className="text-sm text-gray-500 flex items-center space-x-4">
            <div className="flex items-center">
              <span className="font-semibold text-gray-700">Views:</span>
              <span className="ml-1 text-gray-500">{vendor.viewedCount}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700">Rating:</span>
              <div className="flex items-center ml-1">
                {stars.map((filled, index) => (
                  <FaStar
                    key={index}
                    className={`text-lg ${filled ? "text-yellow-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Kitchen Status Section with Styling */}
        <div className="mt-4 flex items-center">
          <h3 className="font-semibold text-gray-800">Kitchen Status</h3>
          <span
            className={`ml-3 text-xs font-semibold px-3 py-1 rounded-full ${
              vendor.kitchenStatus === "Active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
            }`}
          >
            {vendor.kitchenStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
