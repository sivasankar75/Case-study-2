// Task1: initiate app and run server at 3000
const express = require('express');
const mongoose = require('mongoose');
const Employee_Info = require('./models/employees');

const app = new express();
app.use(express.json());

const PORT = 3000;

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 
mongoose.connect('mongodb+srv://sivasankar75:atLasDB22@cluster0.nxczl99.mongodb.net/employeeDB?retryWrites=true&w=majority')
.then( () => {
    console.log("Mongodb successfully connected");
})
.catch(error =>{
    console.log("connection error :"+ error);
})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', (req,res) => {
    try {
        Employee_Info.find({}, (err, employees) => {
            if(err){
                console.log("error in listing" + err);
            }
            else
            {
                res.send(employees);
            }
        });
    }
    catch(error) {
        console.log("error :" + error);
    }

});

//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id', (req,res) => {
    try {
        Employee_Info.findById(req.params.id, (err, employee) => {
            if(err){
                console.log("error in listing." + err);
            }
            else
            {
                res.send(employee);
            }
        });
    }
    catch(error) {
        console.log("error :" + error);
    }    
});


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async (req,res) => {
    try {
        let info = req.body;
        const employee = new Employee_Info(info);
        const saveEmp = await employee.save();
        res.send();        
    }
    catch(error){
        res.send("error occured: "+error);
    }       
});

//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id', async (req, res) => {
    try {
        Employee_Info.deleteOne({"_id":req.params.id}, (err,employees) => {
            if(err){
                console.log("error in delete." + err);
            }
            else
            {
                console.log("employee successfully deleted");
                res.send(employees);
            }
        });
    }
    catch(error) {
        res.send("error occured: " +error);
    }
});


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist', async (req,res) => {
    try {
        Employee_Info.findByIdAndUpdate(req.body._id, req.body, (err,employee) => {
            if(err){
                console.log("error in update." + err);
            }
            else
            {
                res.send(employee);
            }
        });
    }
    catch(error) {
        res.send("error occured: " +error);
    }
});


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname+'/dist/Frontend/index.html'));
});

// port connection
app.listen(PORT,()=>{
    console.log("server connected to port:3000");
});


