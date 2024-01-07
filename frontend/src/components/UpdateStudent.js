import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate ,useParams } from 'react-router-dom';
import './AllStudents.css';

export default function UpdateStudent(props) {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    console.log("ID from useParams:", id);
    axios.get(`http://localhost:8070/student/get/${id}`)
      .then((response) => {
        const { name, age, gender } = response.data.student; 
        setName(name);
        setAge(age.toString()); 
        setGender(gender);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, [id]);
  

  const handleUpdate = () => {
   
    axios.put(`http://localhost:8070/student/update/${id}`, {
      name,
      age: parseInt(age), 
      gender,
    })
      .then(() => {
        console.log("Student updated successfully");
        alert("Student updated");
        navigate('/');
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  };

  return (
    <div className="form-container">
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        {/* Uncomment the following block if you want to use a dropdown for gender */}
        {/* <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div> */}

        <button type="button" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
}

