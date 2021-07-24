const mongoose  = require("mongoose")


const reqString = {
    required: true,
    trim: true,
};

const flatSchema = mongoose.Schema(
    {
      type: {
        type: String,
        ...reqString,
        enum: ['Owner', 'Tenant'],
      },
      block: {
        type: String,
        ...reqString},
      flatnumber: { ...reqString, type: Number },
      residents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'resident' }],
      pictures: { type: String,
        ...reqString,}
    },
    {
      timestamps: true,
    }
  );

const Flats = mongoose.model("flat",flatSchema)

module.exports = Flats