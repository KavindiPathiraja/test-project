import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';
import './AllStudents.css';

export default function DeleteStudent(props) {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ID from useParams:", id);
    axios.get(`http://localhost:8070/student/get/${id}`)
      .then((response) => {
        const { name, age, gender } = response.data.student; // Access 'student' property
        setName(name);
        setAge(age.toString()); // Convert age to string for the input field
        setGender(gender);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, [id]);
  

  const handleDelete = () => {
    // Send a PUT request to update the student data
    axios.delete(`http://localhost:8070/student/delete/${id}`, {
      name,
      age: parseInt(age), // Parse age as an integer
      gender,
    })
      .then(() => {
        console.log("Student deleted successfully");
        alert("Student deleted");
        navigate('/');
        // Redirect to the students list page after updating
       // window.location.href = "/AllStudents";
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  return (
    <div>
      <h2>Delete Student</h2>
      <form>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} readOnly />

        <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} readOnly/>

        <label>Gender:</label>
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} readOnly/>

          {/* <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select> */}


        <button type="button" onClick={handleDelete}>Delete</button>
      </form>
    </div>
  );
}
