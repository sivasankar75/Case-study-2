const mongoose = require('mongoose');

// schema definition
const Schema = mongoose.Schema;

const Employee_Info = new Schema({
    name : String,
    location : String,
    position : String,
    salary :  Number
});

const EmployeeInfo = mongoose.model('employee', Employee_Info);

module.exports = EmployeeInfo;