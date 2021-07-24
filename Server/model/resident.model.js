const mongoose  = require("mongoose")


const reqString = {
    required: true,
    trim: true,
};

const residentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            ...reqString
        }, 
        gender: {
          type: String,
          enum: ['Male', 'Female', 'Other'],
          default: 'Male',
        },
        age: { 
            type: Number, 
            ...reqString
        },
    },
    {
      timestamps: true,
    }
  );

const Resident = mongoose.model("resident",residentSchema)

module.exports = Resident