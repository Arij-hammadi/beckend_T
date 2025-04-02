const Devis = require("../models/devisSchema");

// Obtenir tous les devis
module.exports.getAllDevis = async (req, res) => {
  try {
    const devis = await Devis.find();
    res.status(200).json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter un devis
module.exports.addDevis = async (req, res) => {
  try {
    const { prixEstime, details } = req.body;
    const devis = await Devis.create({ prixEstime, details });
    res.status(200).json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};