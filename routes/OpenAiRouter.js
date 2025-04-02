const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai"); // npm i @google/generative-ai

const router = express.Router();

// Initialisation de l'API Google Generative AI
const genAI = new GoogleGenerativeAI("AIzaSyD4Kr9JDg0OeIW4wdpaYCUxBc9RxZz2YK8"); //https://aistudio.google.com/apikey
 
// Route pour générer du texte avec Gemini
router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Le prompt est requis." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    const response = result.response;// Récupérer le texte généré
    if (!response || !response.text) {
      throw new Error("Réponse invalide de l'API Gemini.");
    }

    res.json({ generatedText: response.text() });

  } catch (error) {
    console.error("Erreur API Gemini :", error.message);
    res.status(500).json({ error: "Erreur lors de la génération du contenu." });
  }
});

module.exports = router;