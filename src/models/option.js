const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema(
    {
        resource: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        methodName: {
            type: String,
            required: false
        },
        destination: {
            type: String,
            required: true
        },
        baseURL: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Option = mongoose.model("Option", optionSchema);
module.exports = Option;