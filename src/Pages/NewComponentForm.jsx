import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from "react-hot-toast";
import { publicRequest } from '../middleware/requestMethods';

const NewComponentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    section: '',
    uiName: '',
    content: ''
  });

  const [submitDisable, setSubmitDisable] = useState(false);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitDisable(true);


    try {
      const response = await publicRequest.post('admin/component/new/31d6c8a', formData);
      toast.success("Component Added");
      navigate(0);
    } catch (error) {
      setSubmitDisable(false);
      console.error(error);
      toast.error("Component Uploading failed");
    }
  };

  return (
    <>
    <Toaster position="top-center" reverseOrder={false}></Toaster>
    <h1 className='font-bold m-5 text-center'>ADD NEW COMPONENT</h1>
    <form onSubmit={handleSubmit} className="max-w-screen-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-bold text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        {errors.name && <span className="text-red-500">This field is required</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="section" className="block mb-2 font-bold text-gray-700">
          Section
        </label>
        <input
          type="text"
          id="section"
          name="section"
          value={formData.section}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="uiName" className="block mb-2 font-bold text-gray-700">
          UI Name
        </label>
        <input
          type="text"
          id="uiName"
          name="uiName"
          value={formData.uiName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block mb-2 font-bold text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={15}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        ></textarea>
        {errors.content && <span className="text-red-500">This field is required</span>}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
          disabled= {submitDisable}
        >
          Submit
        </button>
      </div>
    </form>
    </>
  );
};

export default NewComponentForm;
