reservationSchema.pre("save", async function (next) {
  try {
    // Vérifier si le volume ou les services supplémentaires ont été modifiés
    if (this.isModified("volume") || this.isModified("servicesSupplementaires")) {
      // Calcul du prix estimé
      const prixBase = this.volume * 10; // Exemple : 10€ par unité de volume
      const prixServices = this.servicesSupplementaires.length * 20; // Exemple : 20€ par service supplémentaire
      this.prixEstime = prixBase + prixServices;
    }
    next();
  } catch (error) {
    next(error);
  }
});