const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    heure: { 
      type: String, 
      required: true,
      match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    },
    adresseDepart: {
      type: String,
      required: true,
    },
    adresseArrivee: {
      type: String,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
      min: 0, // Le volume ne peut pas être négatif
    },
    prixEstime: {
      type: Number,
      default: 0, // Le prix estimé sera calculé automatiquement
    },
    statut: {
      type: String,
      enum: ["en attente", "confirmée", "annulée"], // Statuts possibles
      default: "en attente",
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Référence à l'utilisateur (client)
      required: true,
    },
    transporteurId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transporteur", // Référence au transporteur
      required: function () {
        return this.statut === "confirmée"; // Le transporteur est requis uniquement si la réservation est confirmée
      },
    },
  },
  { timestamps: true } // Ajoute les champs `createdAt` et `updatedAt`
);
// Middleware pour calculer le prix estimé avant de sauvegarder la réservation
reservationSchema.pre("save", async function (next) {
  try {
    if (this.isModified("volume") || this.isModified("servicesSupplementaires")) {
      // Calcul du prix estimé en fonction du volume et des services supplémentaires
      const prixBase = this.volume * 10; // Exemple : 10dt par unité de volume
      const prixServices = this.servicesSupplementaires.length * 20; // Exemple : 20dt par service supplémentaire
      this.prixEstime = prixBase + prixServices;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Middleware pour valider la réservation avant de la sauvegarder
reservationSchema.pre("save", function (next) {
  if (this.statut === "confirmée" && !this.transporteurId) {
    const error = new Error("Un transporteur est requis pour confirmer la réservation.");
    return next(error);
  }
  next();
});

// Middleware pour logger la création d'une réservation
reservationSchema.post("save", function (doc, next) {
  console.log("Nouvelle réservation créée avec succès :", doc._id);
  next();
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;