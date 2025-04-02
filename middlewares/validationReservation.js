reservationSchema.pre("save", function (next) {
    try {
      // Vérifier si la réservation est confirmée et qu'un transporteur est requis
      if (this.statut === "confirmée" && !this.transporteurId) {
        throw new Error("Un transporteur est requis pour confirmer la réservation.");
      }
      next();
    } catch (error) {
      next(error);
    }
  });