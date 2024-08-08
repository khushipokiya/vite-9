// src/components/Form.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createItem, updateItem, deleteItem, setCurrentItem, clearCurrentItem } from '../redux/formSlice';

const Form = () => {
  const dispatch = useDispatch();
  const { items, currentItem } = useSelector(state => state.form);
  const [formData, setFormData] = React.useState({ id: '', name: '', email: '', age: '' });

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
  };

  const handleEdit = (item) => {
    dispatch(setCurrentItem(item));
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
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
      <h3 className="text-lg font-semibold mt-6">Items</h3>
      <ul className="list-disc pl-5 mt-2">
        {items.map(item => (
          <li key={item.id} className="flex items-center justify-between">
            <span>{item.name} - {item.email} - {item.age}</span>
            <div>
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-500 hover:underline mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Form;
