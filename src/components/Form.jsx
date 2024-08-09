import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createItem, updateItem, setCurrentItem, clearCurrentItem } from '../redux/formSlice';
import { setCurrentPath } from '../redux/routerSlice';
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
    dispatch(setCurrentPath('/table')); 
    navigate('/table'); 
  };

  return (
    <div className="max-w-md p-4 mx-auto bg-white rounded shadow-md">
      <h2 className="mb-4 text-xl font-bold">{formData.id ? 'Edit user' : 'Create user'}</h2>
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
          className="w-full p-2 text-white bg-blue-500 rounded"
        >
          {formData.id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default FormPage;
