import React, { useState } from "react";
import copy from "copy-to-clipboard";
import { useDebouncedCallback } from "use-debounce";
import { LuCopyCheck } from "react-icons/lu";
import { IoMdCopy } from "react-icons/io";
import Modal from "../reUsableCmponent/modal/Modal";
import {
  useAddZoneMutation,
  useDeleteZoneMutation,
  useEditZoneMutation,
  useGetZonesQuery
} from "../../api/zones";
import Pagination from "../Pagination";
import { PUBLIC_USER_FRONTEND_URL } from "../../common/utils";
import { toast } from "sonner";
import { vendorData } from "../../constants/tableData";
import { BiSolidDownArrow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Zones = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editPopupData, setEditPopupData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const isLoading = false;

  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  // const { data, isLoading, refetch } = useGetZonesQuery({
  //   limit,
  //   page: currentPage,
  //   search: searchValue,
  // });
  const [addZone, { isLoading: isLoadingMutation }] = useAddZoneMutation();
  const [copied, setCopied] = useState("");

  const [deleteZone, { isLoading: isLoadingDelete }] = useDeleteZoneMutation();
  const [EditZone, { isLoading: isLoadingEdit }] = useEditZoneMutation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target); // Make sure event.target is the form
    const name = formData.get("name"); // Get email input value
    const description = formData.get("description");
    const body = {
      name,
      description
    };
    try {
      if (editPopupData) {
        formData.append("zoneId", editPopupData?._id);
        const editBody = {
          ...body,
          zoneId: editPopupData?._id
        };
        const res = await EditZone?.(editBody);
        if (res?.data?.success) {
          // refetch({ page: 1 });
          toggleModal();
          setEditPopupData(null);
        } else {
          toast.error(res.data.message, {
            position: "top-right",
            duration: 2000,
            style: {
              backgroundColor: "#fb0909", // Custom green color for success
              color: "#FFFFFF" // Text color
            },
            dismissible: true
          });
        }
      } else {
        const res = await addZone?.(body);
        if (res?.data?.success) {
          // refetch();
          toggleModal();
        } else {
          toast.error(res.data.message, {
            position: "top-right",
            duration: 2000,
            style: {
              backgroundColor: "#fb0909", // Custom green color for success
              color: "#FFFFFF" // Text color
            },
            dismissible: true
          });
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEditClick = (zone) => {
    toggleModal();
    setEditPopupData(zone);
  };

  const handleDeleteClick = (id) => {
    setShowDeletePopup(true);
    setSelectedZoneId(id);
  };
  const handleDelete = async () => {
    try {
      const body = {
        zoneId: selectedZoneId
      };
      const deleteres = await deleteZone?.(body);
      if (deleteres?.data?.success) {
        toast.success(deleteres?.data?.msg, {
          position: "top-right",
          duration: 2000,
          style: {
            backgroundColor: "green", // Custom green color for success
            color: "#FFFFFF" // Text color
          },
          dismissible: true
        });
        // refetch();
        setSelectedZoneId(null);
        setShowDeletePopup(false);
      } else {
        toast.error(deleteres.data.message, {
          position: "top-right",
          duration: 2000,
          style: {
            backgroundColor: "#fb0909", // Custom green color for success
            color: "#FFFFFF" // Text color
          },
          dismissible: true
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleModalClose = () => {
    toggleModal();
    setEditPopupData(null);
  };

  const handleDeleteModalClose = () => {
    setShowDeletePopup(false);
  };
  const handleSearchChange = useDebouncedCallback(
    // function
    (value) => {
      setSearchValue(value ?? "");
    },
    500
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCopy = async (value, mainJudge) => {
    if (mainJudge) {
      setCopied(value);
      copy(PUBLIC_USER_FRONTEND_URL + "/participant/" + value);
      setTimeout(() => {
        setCopied("");
      }, 2000);
    } else {
      toast.error("Please add at least one main judge in this zone.", {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: "#fb0909", // Custom green color for success
          color: "#FFFFFF" // Text color
        },
        dismissible: true
      });
    }
  };
  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">Vendors</h2>
        <div className="ml-auto flex items-center space-x-4">
          <span className="flex items-center">
            <span
              className="bg-[#E88B13] hover:bg-[#E88B13] text-white rounded-3xl pt-2 pb-2 pl-4 pr-4 cursor-pointer"
              onClick={toggleModal}>
              Add Vendor
            </span>

            <Modal
              isVisible={isModalVisible}
              onClose={handleModalClose}
              modalHeader={editPopupData ? "Edit Vendor" : "Add Vendor"}>
              <div className="modal-content-container">
                <form onSubmit={onSubmit} className="space-y-6">
                <div className="form-group">
                    <label
                      htmlFor="vendorName"
                      className="block text-sm font-medium text-gray-700">
                      Vendor Name
                    </label>
                    <input
                      type="text"
                      name="vendorName"
                      id="vendorName"
                      className="input-field"
                      required
                      defaultValue={
                        editPopupData ? editPopupData?.vendorName : null
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="input-field h-20"
                      required
                      defaultValue={
                        editPopupData ? editPopupData?.description : null
                      }
                    />
                  </div>
                 
                  <div className="form-group">
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      className="input-field"
                      required
                      defaultValue={
                        editPopupData ? editPopupData?.location : null
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="selectedPlan"
                      className="block text-sm font-medium text-gray-700">
                      Selected Plan
                    </label>
                    <select
                      name="selectedPlan"
                      id="selectedPlan"
                      className="input-field"
                      required
                      defaultValue={
                        editPopupData ? editPopupData?.selectedPlan : ""
                      }>
                      <option value="basic">Basic</option>
                      <option value="premium">Premium</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="kitchenStatus"
                      className="block text-sm font-medium text-gray-700">
                      Kitchen Status
                    </label>
                    <select
                      name="kitchenStatus"
                      id="kitchenStatus"
                      className="input-field"
                      required
                      defaultValue={
                        editPopupData ? editPopupData?.kitchenStatus : ""
                      }>
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="coverImage"
                      className="block text-sm font-medium text-gray-700">
                      Cover Image
                    </label>
                    <input
                      type="file"
                      name="coverImage"
                      id="coverImage"
                      accept="image/*"
                      className="input-file"
                      onChange={(e) =>
                        setCoverImagePreview(
                          URL.createObjectURL(e.target.files[0])
                        )
                      }
                    />
                    {coverImagePreview && (
                      <div className="preview-container">
                        <img
                          src={coverImagePreview}
                          alt="Cover Preview"
                          className="preview-image"
                        />
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="logo"
                      className="block text-sm font-medium text-gray-700">
                      Logo
                    </label>
                    <input
                      type="file"
                      name="logo"
                      id="logo"
                      accept="image/*"
                      className="input-file"
                      onChange={(e) =>
                        setLogoPreview(URL.createObjectURL(e.target.files[0]))
                      }
                    />
                    {logoPreview && (
                      <div className="preview-container">
                        <img
                          src={logoPreview}
                          alt="Logo Preview"
                          className="preview-image"
                        />
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      name="category"
                      id="category"
                      className="input-field"
                      required
                      defaultValue={
                        editPopupData ? editPopupData?.category : ""
                      }>
                      <option value="restaurant">Restaurant</option>
                      <option value="hotel">Hotel</option>
                      <option value="cafe">Cafe</option>
                      <option value="resort">Resort</option>
                    </select>
                  </div>
                  <div className="flex justify-center p-6">
                    <button
                      disabled={isLoadingMutation || isLoadingEdit}
                      type="submit"
                      className="submit-button">
                      {isLoadingMutation || isLoadingEdit
                        ? "Loading..."
                        : "Submit"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Modal Scroll Bar Hidden */}
              <style jsx>{`
                .modal-content-container {
                  max-height: 80vh;
                  overflow-y: auto;
                }

                .modal-content-container::-webkit-scrollbar {
                  display: none;
                }

                .modal-content-container {
                  -ms-overflow-style: none; /* For Internet Explorer 10+ */
                  scrollbar-width: none; /* For Firefox */
                }

                .input-field,
                .input-file {
                  background-color: #f9fafb;
                  border-radius: 0.375rem;
                  padding: 0.75rem;
                  width: 100%;
                  border: 1px solid #e5e7eb;
                  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                }

                .input-field:focus,
                .input-file:focus {
                  border-color: #3b82f6;
                  outline: none;
                  box-shadow: 0 0 0 1px #3b82f6;
                }

                .preview-container {
                  margin-top: 10px;
                  display: flex;
                  justify-content: center;
                }

                .preview-image {
                  width: 150px;
                  height: 150px;
                  object-fit: cover;
                  border-radius: 8px;
                  border: 2px solid #e5e7eb;
                }

                .submit-button {
                  background-color: #e88b13;
                  hover: bg-[#F57C00];
                  color: white;
                  font-weight: bold;
                  padding: 0.75rem 2rem;
                  border-radius: 9999px;
                  transition: background-color 0.3s ease;
                }

                .submit-button:hover {
                  background-color: #f57c00;
                }
              `}</style>
            </Modal>
            <Modal isVisible={showDeletePopup} onClose={handleDeleteModalClose}>
              <h3 className="flex justify-center self-center text-md font-bold">
                Are you sure want to Delete?
              </h3>
              <div className="flex justify-center p-6">
                <button
                  onClick={handleDeleteModalClose}
                  type="submit"
                  className="border border-green-500 text-green-600 hover:bg-green-700 hover:text-white font-bold  py-2 m-2 px-8 rounded-2xl">
                  No
                </button>
                <button
                  disabled={isLoadingDelete}
                  onClick={handleDeleteModalClose}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 m-2 px-8 rounded-2xl">
                  YES
                </button>
              </div>
            </Modal>
          </span>
        </div>
      </div>
      <div className="ml-auto lg:mr-4 flex items-center space-x-4 justify-end pt-3">
        {/* Parent div for span elements */}
        <span className="flex items-center justify-center">
          <input
            className="p-2 lg:w-[250px] w-full appearance-none bg-white border border-gray-400 rounded-3xl"
            placeholder="Search by name"
            onChange={(e) => {
              handleSearchChange(e.target.value);
            }}
          />
        </span>
        <span className="flex items-center ">
          <span className="cursor-pointer bg-[#E88B13] hover:bg-[#E88B13] text-white p-2 lg:w-[100px] text-center rounded-3xl">
            Search
          </span>
        </span>
      </div>

      <table className="min-w-full table-auto mt-6 border-collapse">
        <thead className="bg-white border-gray-400 border-t-[2px] border-l-[2px] border-r-[2px] border-b-[2px]">
          <tr>
            <th className="px-2 py-2 text-left border-r border-gray-400">
              Sl No
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Name
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">Id</th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Description
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Status
            </th>
            <th className="px-4 py-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="border-[2px] border-opacity-70 border-[#969696]">
          {isLoading ? (
            <>Loading...</>
          ) : (
            vendorData?.map((zone, index) => (
              <tr
                className="odd:bg-[#FCD199] even:bg-white border-2 border-opacity-50 border-[#9e9696]"
                key={index}>
                <td className="px-4 py-2 border-r border-gray-400">
                  {index + 1}
                </td>
                <td
                  onClick={() => navigate(`/single-vendor`)}
                  style={{ cursor: "pointer" }}
                  className="px-4 py-2 border-r border-gray-400">
                  <u
                    style={{ cursor: "pointer", textDecoration: "none" }}
                    onMouseOver={({ target }) => (target.style.color = "blue")}
                    onMouseOut={({ target }) => (target.style.color = "black")}>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <img
                        alt="pics"
                        src={zone?.image}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      {zone?.name}{" "}
                    </div>
                  </u>
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  {zone?.id}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  <div className="flex -space-x-3">{zone?.description}</div>
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  <button
                    className={`py-2 px-5 flex space-x-2 items-center ${
                      zone?.status
                        ? " text-[#FF0404] border-[#FF0404]"
                        : "  border-[#15d057] text-[#15d057]"
                    } rounded-full  border `}>
                    {" "}
                    <span>{zone?.status ? "Blocked" : "Unblocked"}</span>
                    <BiSolidDownArrow className="text-black" />
                  </button>
                </td>

                <td className="px-4 py-2 border-r border-gray-400">
                  <button
                    // disabled={isLoadingBlock}
                    onClick={() => handleEditClick(zone)}>
                    <img
                      alt="pics"
                      src="/icons/edit.svg"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                  </button>
                  <button onClick={() => handleDeleteClick(zone?._id)}>
                    <img
                      alt="pics"
                      src="/icons/delete.svg"
                      className="w-6 h-6 rounded-full mr-2 fill-red-500"
                    />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="m-auto flex justify-end">
        <Pagination
          itemsPerPage={limit}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={vendorData?.length}
        />
      </div>
    </>
  );
};

export default Zones;
