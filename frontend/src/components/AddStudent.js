import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './AllStudents.css';

export default function AddStudent(){

    const[name,setName] = useState("");
    const[age,setAge] = useState("");
    const[gender,setGender] = useState("");
    const navigate = useNavigate();

    function sendData(e){
        e.preventDefault();
        

        const newStudent = {
            name,
            age,
            gender
        }
        //console.log(newStudent);

        axios.post("http://localhost:8070/student/add",newStudent).then(()=>{
            alert("Student Added")

            setName("");
            setAge("");
            setGender("");
            navigate('/');

        }).catch((err)=>{
            alert(err)
        })
        
    }


    return(
       
       <div className="container">
        <form onSubmit={sendData}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Student Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter Student Name" onChange={(e)=>{

                setName(e.target.value);

            }}></input>
            
        </div>
        <div className="mb-3">
            <label htmlFor="age" className="form-label">Student Age</label>
            <input type="text" className="form-control" id="age" placeholder="Enter Student Age" onChange={(e)=>{

                setAge(e.target.value);

            }}></input>
            
        </div>
        <div className="mb-3">
            <label htmlFor="gender" className="form-label">Student Gender</label>
            <input type="text" className="form-control" id="gender" placeholder="Enter Student Gender" onChange={(e)=>{

                setGender(e.target.value);

            }}></input>
            
        </div>
        
             <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    )


}