const Reservation = require("../models/reservationSchema");
const Transporteur = require("../models/transporteurSchema");

// Créer une nouvelle réservation
module.exports.addReservation = async (req, res) => {
  try {
    const { date, hours, adresseDepart, adresseArrivee, volume, statut, clientId, transporteurId, servicesSupplementaires } = req.body;

    // Récupérer les informations du transporteur
    const transporteur = await Transporteur.findById(transporteurId);
    if (!transporteur) {
      throw new Error("Transporteur introuvable");
    }

    // Créer la réservation (le prix estimé sera calculé automatiquement par le middleware)
    const reservation = await Reservation.create({
      date,
      hours,
      adresseDepart,
      adresseArrivee,
      volume,
      statut,
      clientId,
      transporteurId,
      modeleVehicule: transporteur.modeleVehicule,
      capaciteVehicule: transporteur.capaciteVehicule,
      servicesSupplementaires,
    });

    res.status(200).json({ reservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir toutes les réservations
module.exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("clientId transporteurId");
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une réservation par son ID
module.exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate("clientId transporteurId");
    if (!reservation) {
      throw new Error("Réservation introuvable");
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une réservation
module.exports.updateReservation = async (req, res) => {
  try {
    const { date, hours, adresseDepart, adresseArrivee, volume, statut, servicesSupplementaires } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { date, hours, adresseDepart, adresseArrivee, volume, statut, servicesSupplementaires },
      { new: true }
    );
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une réservation
module.exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json("Réservation supprimée avec succès");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};