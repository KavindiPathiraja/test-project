const router = require("express").Router();
let Student = require("../models/student");

router.route("/add").post((req,res) => {

    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student({
        
        name,
        age,
        gender
    })

    newStudent.save().then(() => {
         res.json("Student Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res) => {

    Student.find().then((students)=>{
        res.json(students)
    }).catch((err)=>{
        console.log(err)
    })
})

//htttp://localhost:8070/student/update/id

router.route("/update/:id").put(async(req,res) => {
    let userid = req.params.id;
    const {name,age,gender} = req.body;

    const updateStudent = {
        name,
        age,
        gender
    }

    const update = await Student.findByIdAndUpdate(userid,updateStudent).then(() =>{
        res.status(200).send({status: "User updated"});
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating data ",error: err.message});
    })
    
})

//htttp://localhost:8070/student/delete/id

router.route("/delete/:id").delete(async(req,res) =>{
    let userid = req.params.id;

    await Student.findByIdAndDelete(userid).then(() =>{
        res.status(200).send({status: "User deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting user ",error: err.message});
    })
})

//if use email instead id findone is used

router.route("/get/:id").get(async(req,res) =>{
    let userid = req.params.id;
    const user = await Student.findById(userid).then((student) => {
        res.status(200).send({status: "User fetched",student});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user ",error: err.message});
    })
})



module.exports = router;