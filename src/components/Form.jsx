import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createItem, updateItem,  clearCurrentItem } from '../redux/formSlice';
import { useNavigate } from 'react-router-dom';

const FormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentItem } = useSelector(state => state.form);
  const [formData, setFormData] = useState({ id: '', name: '', email: '', age: '' });

  useEffect(() => {
    if (currentItem) {
      setFormData(currentItem);
    } else {
      setFormData({ id: '', name: '', email: '', age: '' });
    }
  }, [currentItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      dispatch(updateItem(formData));
    } else {
      dispatch(createItem({ ...formData, id: Date.now().toString() }));
    }
    dispatch(clearCurrentItem());
    navigate('/table'); // Navigate to the table page after submission
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">{formData.id ? 'Edit Item' : 'Create Item'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {formData.id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default FormPage;
