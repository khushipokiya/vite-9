import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormPage from './components/Form';
import TablePage from './components/Table';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100 App">
          <header className="p-4 text-center text-white bg-blue-500">
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
    </Provider>
  );
}

export default App;
