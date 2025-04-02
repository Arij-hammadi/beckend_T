const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    adresse: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    historiqueReservations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation", // Référence aux réservations
      },
    ],
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;                                                                      