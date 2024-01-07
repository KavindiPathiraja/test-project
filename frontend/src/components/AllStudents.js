import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from 'react-icons/ai';
import {  MdOutlineDelete } from 'react-icons/md';
import './AllStudents.css';

export default function AllStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    function getStudents() {
      axios.get("http://localhost:8070/student/")
        .then((res) => {
          setStudents(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getStudents();

  }, []);

  return (
    <div className="container">
      <h1>All Students</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Action</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>
              <Link to={{ pathname: `/update/${student._id}`, state: { student } }}>
              <AiOutlineEdit className='text-2x1 text-yellow-600' />
              </Link>
              <Link to={{ pathname: `/delete/${student._id}`, state: { student } }}>
              <MdOutlineDelete className='text-2x1 text-red-600' />
              </Link>

              </td>
              {/* Add more table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
