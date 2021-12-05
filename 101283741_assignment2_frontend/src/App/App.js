import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import  NavBar  from '../components/Navbar'

import 'bootstrap/dist/css/bootstrap.min.css'
  
import EmployeeList from '../components/EmployeeList';
import EmployeeDetail from '../components/EmployeeDetail';
import EmployeeAdd from '../components/EmployeeAdd';

  function App() {
    return (
      <Router>
        <NavBar/>
        <div>
          <Routes>
            <Route path="/" exact element={<EmployeeList />} />
            <Route path="/view/:id" element={<EmployeeDetail />} />
            <Route path="/add/_add" element={<EmployeeAdd />} />
            <Route path="/add/:id" element={<EmployeeAdd />} />
          </Routes>
        </div>
      </Router>
    );
  }
  
  export default App;