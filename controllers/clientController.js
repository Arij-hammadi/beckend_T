const Client = require("../models/clientSchema");

// Obtenir tous les clients
module.exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().populate("historiqueReservations");
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un client par son ID
module.exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate("historiqueReservations");
    if (!client) {
      throw new Error("Client introuvable");
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un client
module.exports.addClient = async (req, res) => {
  try {
    const { adresse, telephone } = req.body;
    const client = await Client.create({ adresse, telephone });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un client
module.exports.updateClient = async (req, res) => {
  try {
    const { adresse, telephone } = req.body;
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { adresse, telephone },
      { new: true }
    );
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un client
module.exports.deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.status(200).json("Client supprimé avec succès");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};