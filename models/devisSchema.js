const mongoose = require("mongoose");

const devisSchema = new mongoose.Schema(
  {
    dateCreation: {
      type: Date,
      default: Date.now,
    },
    prixEstime: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    reservationId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Reservation", 
      unique: true 
    }
  },
  { timestamps: true }
);

const Devis = mongoose.model("Devis", devisSchema);
module.exports = Devis;