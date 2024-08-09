import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentItem, deleteItem } from '../redux/formSlice';
import { setCurrentPath } from '../redux/routerSlice';
import { Link  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TablePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(state => state.form);

  const handleEdit = (item) => {
    dispatch(setCurrentItem(item));
    dispatch(setCurrentPath('/')); 
    navigate('/');
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Items Table</h2>
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">Back to Form</Link>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Age</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td className="border border-gray-300 p-2">{item.name}</td>
              <td className="border border-gray-300 p-2">{item.email}</td>
              <td className="border border-gray-300 p-2">{item.age}</td>
              <td className="border border-gray-300 p-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePage;
