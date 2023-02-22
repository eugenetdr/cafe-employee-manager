import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './app/store'
import AddEditCafe from "./views/AddEditCafe";
import AddEditEmployee from "./views/AddEditEmployee";
import Cafes from "./views/Cafes";
import Employees from "./views/Employees";
import Layout from "./views/Layout";
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="cafes" element={<Cafes />} />
          <Route path="employees" element={<Employees />} />
          <Route path="addCafe" element={<AddEditCafe />} />
          <Route path="editCafe" element={<AddEditCafe />} />
          <Route path="addEmployee" element={<AddEditEmployee />} />
          <Route path="editEmployee" element={<AddEditEmployee />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
