const mongoose = require("mongoose");

const transporteurSchema = new mongoose.Schema(
  {
    adresse: {
      type: String,
      required: true,
    },
    vehicule: {
        modele: { type: String, required: true }, // Ex: "Renault Master"
        capacite: { type: Number, required: true }, // Ex: 20 (en m³)
        plaqueImmatriculation: { type: String, required: true, unique: true }
      },
    noteMoyenne: {
      type: Number,
      default: 0,
    },
    historiqueMissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation", // Référence aux réservations
      },
    ],
    reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }] // 1-N
  },
  { timestamps: true }
);

const Transporteur = mongoose.model("Transporteur", transporteurSchema);
module.exports = mongoose.model("Transporteur", transporteurSchema);
