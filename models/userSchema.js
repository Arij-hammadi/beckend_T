const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Entrez une adresse mail valide"],
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.",
      ],
    },
    role: {
      type: String,
      enum: ["admin", "client", "transporteur"],
      required: true,
    },
    adresse: {
      type: String,
      required: function() {
        return this.role === "transporteur";
      },
    },
    noteMoyenne: {
      type: Number,
      default: 0,
      required: function() {
        return this.role === "transporteur";
      },
    },
    historiqueMissions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: function() {
        return this.role === "transporteur";
      },
    }],
    user_image: { type: String, require: false, default: "client.png" },
    vehicule: {
      modele: { 
        type: String, 
        required: function() { return this.role === "transporteur"; } 
      },
      capacite: { 
        type: Number, 
        required: function() { return this.role === "transporteur"; } 
      },
      plaqueImmatriculation: {
        type: String,
        required: function() { return this.role === "transporteur"; },
        unique: true
      }
    },
    // Relations
    reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }]
  },
  { timestamps: true }
);

// Sécurité : Hachage du mot de passe avant de sauvegarder l'utilisateur
//userSchema.pre("save", async function (next) {
  //try {
    //const salt = await bcrypt.genSalt();
    //const user = this;
    //user.password = await bcrypt.hash(user.password, salt);
    //user.etat = false ;
    //user.count = user.count + 1; //nbre de connexion d'user
    //next();
  //} catch (error) {
    //next(error);
  //}
//});
userSchema.pre('save', async function (next) {
  try {
    const User = this;

    // Only hash the password if it has been modified (or is new)
    if (User.isModified('password')) {
      console.log('🔐 Hashing password...');
      const salt = await bcrypt.genSalt(10); // Use 10 salt rounds
      User.password = await bcrypt.hash(User.password, salt);
      console.log('✅ Password hashed successfully');
    }

    next();
  } catch (error) {
    console.error('❌ Error in pre-save hook:', error.message);
    next(error);
  }
});

userSchema.post("save", function(doc, next) {
  console.log(`Utilisateur ${doc.username} créé avec succès. Rôle: ${doc.role}`);  
  next();
});

userSchema.statics.login = async function (email, password) {
  //console.log(email, password);
  const user = await this.findOne({ email });
  //console.log(user)
  if (user) {
    const auth = await bcrypt.compare(password,user.password);
    //console.log(auth)
    if (auth) {
      // if (user.etat === true) {
      //   if (user.ban === false) {
          return user;
      //   } else {
      //     throw new Error("compte bané");
      //   }
      // } else {
      //   throw new Error("compte desactivé ");
      // }
    } else {
      throw new Error("Mot de passe incorrecte"); 
    }
  } else {
    throw new Error("email non trouvé");
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;