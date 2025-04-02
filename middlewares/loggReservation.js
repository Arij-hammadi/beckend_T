reservationSchema.post("save", function (doc, next) {
    try {
      console.log("Nouvelle réservation créée avec succès :", doc._id);
      next();
    } catch (error) {
      next(error);
    }
  });