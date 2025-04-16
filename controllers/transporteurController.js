const Transporteur = require("../models/transporteurSchema");

// Obtenir tous les transporteurs
module.exports.getAllTransporteurs = async (req, res) => {
  try {
    const transporteurs = await Transporteur.find().populate("historiqueMissions");
    res.status(200).json(transporteurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un transporteur par son ID
module.exports.getTransporteurById = async (req, res) => {
  try {
    const transporteur = await Transporteur.findById(req.params.id).populate("historiqueMissions");
    if (!transporteur) {
      throw new Error("Transporteur introuvable");
    }
    res.status(200).json(transporteur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un transporteur avec son véhicule
module.exports.addTransporteur = async (req, res) => {
  try {
    const { adresse, vehicule } = req.body;

    const transporteur = await Transporteur.create({
      adresse,
      vehicule
    });

    res.status(201).json(transporteur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Mettre à jour le véhicule d'un transporteur
module.exports.updateVehicule = async (req, res) => {
    try {
      const { modele, capacite, plaqueImmatriculation } = req.body;
      const transporteur = await Transporteur.findByIdAndUpdate(
        req.params.id,
        { vehicule: { modele, capacite, plaqueImmatriculation } },
        { new: true }
      );
      res.status(200).json(transporteur);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Mettre à jour un transporteur
module.exports.updateTransporteur = async (req, res) => {
  try {
    const { adresse, modeleVehicule, capaciteVehicule, noteMoyenne } = req.body;
    const transporteur = await Transporteur.findByIdAndUpdate(
      req.params.id,
      { adresse, modele, capacite, noteMoyenne, plaqueImmatriculation },
      { new: true }
    );
    res.status(200).json(transporteur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un transporteur
module.exports.deleteTransporteur = async (req, res) => {
  try {
    await Transporteur.findByIdAndDelete(req.params.id);
    res.status(200).json("Transporteur supprimé avec succès");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};