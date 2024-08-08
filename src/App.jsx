// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormPage from './components/Form';
import TablePage from './components/Table';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-100 flex flex-col">
        <header className="p-4 bg-blue-600 text-white text-center">
          <h1 className="text-2xl font-bold">My App</h1>
        </header>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<FormPage />} />
            <Route path="/table" element={<TablePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
