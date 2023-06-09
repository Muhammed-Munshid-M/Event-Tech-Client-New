/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import { managerUrl } from '../../../API/Api';

function ManagerProfile() {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [uploadPhoto, setUploadPhoto] = useState();
  const [logo, setLogo] = useState();
  const [uploadRecentWork, setUploadRecentWork] = useState();
  const [managerDetails, setManagerDetails] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('manager-token');
    axios.post(`${managerUrl}get-manager-details`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setManagerDetails(response.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModal(false);

    const uploadImage = async (image) => {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'Event_Tech');
      const response = await axios.post('https://api.cloudinary.com/v1_1/dnrcd8rxl/image/upload', data);
      return response.data.url;
    };

    await Promise.all([uploadImage(uploadPhoto, 'uploadPhoto'), uploadImage(logo, 'logo'), uploadImage(uploadRecentWork, 'uploadRecentWork')]).then((response) => {
      const imageUpload1 = response[0];
      const imageUpload2 = response[1];
      const imageUpload3 = response[2];
      const managerData = {
        name, description, imageUpload1, imageUpload2, imageUpload3,
      };
      const token = localStorage.getItem('manager-token');
      axios.post(
        `${managerUrl}add-manager-profile`,
        managerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then(() => {
        window.location.reload();
      });
    });
  };

  const openModal = async () => {
    setModal(true);
  };

  const closeModal = async () => {
    setModal(false);
  };

  const goBack = async () => {
    navigate('/manager/dashboard');
  };

  return (
    <div className="mt-16" style={{ backgroundColor: 'rgb(210, 240, 275)' }}>
      <Navbar />
      <div className="pt-8 flex content-center items-center justify-center">
        <img className="sm:ml-3" width="150px" height="auto" src={managerDetails.manager_image} alt="" />
      </div>
      <div className="flex content-center items-center justify-center">
        {modal ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
            <div className="max-w-xl p-6 bg-white divide-y divide-gray-500">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl">Add Details</h3>
                <svg
                  onClick={closeModal}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="mt-4">
                <form className="w-full max-w-xl">
                  <div className="md:flex md:items-center mb-6 mt-5">
                    <div className="md:w-1/3">
                      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                        Your Name
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-password"
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6 mt-5">
                    <div className="md:w-1/3">
                      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        Upload Photo
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setUploadPhoto(e.target.files[0])}
                      />
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6 mt-5">
                    <div className="md:w-1/3">
                      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        Your Logo
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setLogo(e.target.files[0])}
                      />
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                        About You (Description)
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 pb-16 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-password"
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        Your Recent Work Images
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setUploadRecentWork(e.target.files[0])}
                      />
                    </div>
                  </div>
                  <div className="md:flex md:items-center">
                    <div className="md:w-1/3" />
                    <div className="md:w-2/3">
                      <button onClick={handleSubmit} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                        Add
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <button type="button" onClick={openModal} className="inline-flex items-center px-4 mt-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
            Upload Your Details
          </button>
        )}
      </div>
      <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="w-full department-head mb-4"><h1>Your Details</h1></div>
        <div className="max-w-full">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {managerDetails.name}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {managerDetails.description}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Your Recent Images</dt>
                  <img width="250px" height="auto" src={managerDetails.recent_work} alt="" />
                  <img width="250px" height="auto" src="/pexels-faruk.jpg" alt="" />
                  <img width="250px" height="auto" src="/pexels-rachel.jpg" alt="" />
                </div>
              </dl>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={goBack}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerProfile;
