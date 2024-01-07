import './App.css';
import React from 'react';
import Header from './components/Header';
import AddStudent from './components/AddStudent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllStudents from './components/AllStudents';
import UpdateStudent from './components/UpdateStudent';
import DeleteStudent from './components/DeleteStudent';

function App() {
  return (
    <Router>
      <div>
        <Header />
        
        
        <Routes>
          <Route path="/add" element={<AddStudent />} />
        </Routes>

        <Routes>
          <Route path="/update/:id" element={<UpdateStudent />} />
          {/* Other routes as needed */}
        </Routes>

        <Routes>
          <Route path="/delete/:id" element={<DeleteStudent />} />
          {/* Other routes as needed */}
        </Routes>

        <Routes>
          <Route path="/" element={<AllStudents />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
