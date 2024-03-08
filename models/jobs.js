const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
    id: {
        type:Number,
        require:true
    },
    companyName: {
        type:String,
        require:true
    },
    jobTitle: {
        type:String,
        require:true
    },
    companyLogo: {
        type:String,
        require:true
    },
    minPrice: {
        type:String,
        require:true
    },
    maxPrice: {
        type:String,
        require:true
    },
    salaryType: {
        type:String,
        require:true
    },
    jobLocation: {
        type:String,
        require:true
    },
    postingDate: {
        type:String,
        require:true
    },
    experienceLevel: {
        type:String,
        require:true
    },
    employmentType: {
        type:String,
        require:true
    },
    description: {
        type:String,
        require:true
    },
})
module.exports = mongoose.model('Jobs', JobSchema);