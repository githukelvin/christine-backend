const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        // unique: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    companyLogo: {
        type: String,
    },
    minPrice: {
        type: String,
        required: true,
    },
    maxPrice: {
        type: String,
        required: true,
    },
    salaryType: {
        type: String,
        required: true,
    },
    jobLocation: {
        type: String,
        required: true,
    },
    postingDate: {
        type: Date,
        required: true,
    },
    experienceLevel: {
        type: String,
        required: true,
    },
    employmentType: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;