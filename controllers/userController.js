const userModel = require('../models/userSchema');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

const maxTime = 24 *60 * 60 //24H
//const maxTime = 1 * 60 //1min 
const createToken = (id) => {
    return jwt.sign({ id }, 'net secret pfe', { expiresIn: maxTime })
}
//67a73ce6ce362ba943c4c9d3 + net secret pfe + 1m
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Yjc0MjE5ZTFhMTM2OWRlZmZkNzJiMCIsImlhdCI6MTc0MDA2MzI2MCwiZXhwIjoxNzQwNjY4MDYwfQ.38r9wuoAG-Toz_e5yPf1uBdv8bAxgWqU58FaZHUBYeA
module.exports.addUserClient = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const roleClient = 'client'
        // if (!checkIfUserExists) {
        //     throw new Error("User not found");
        //   }
        const user = await userModel.create({
            username, email, password, role: roleClient
        })
        // const user = new userModel({name,age,address,moy});
        //   const adduser = await user.save();
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.addUserClientWithImg = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const roleClient = 'client'
        const { filename } = req.file

        const user = await userModel.create({
            username, email, password, role: roleClient, user_image: filename
        })
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.addUserAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const roleAdmin = 'admin'
        const user = await userModel.create({
            username, email, password, role: roleAdmin
        })
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//module.exports.addUserTransporteur = async (req, res) => {
    //try {
        //const { username, email, password } = req.body;
        //const roleTransporteur = 'transporteur'
        //const user = await userModel.create({
            //username, email, password, role: roleTransporteur
        //})
        //res.status(200).json({ user });
    //} catch (error) {
        //res.status(500).json({ message: error.message });
    //}
//}

module.exports.addUserTransporteur = async (req, res) => {
    try {
      const user = new User(req.body); // crée l'objet avec accès au `this.role`
      await user.save();               // déclenche la validation
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports.addUserTransporteurWithImg = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const roleClient = 'transporteur'
        const { filename } = req.file

        const user = await userModel.create({
            username, email, password, role: roleClient, user_image: filename
        })
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();

        if (!users || users.length === 0) {
            throw new Error("Liste vide");
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getUserById = async (req, res) => {
    try {
        //const id = req.params.id
        const { id } = req.params
        //console.log(req.params.id)
        const user = await userModel.findById(id)

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.deleteUserById = async (req, res) => {
    try {
        const { id } = req.params

        const checkIfUserExists = await userModel.findById(id);
        if (!checkIfUserExists) {
            throw new Error("User not found");
        }

        await carModel.updateMany({ owner: id }, {
            $unset: { owner: 1 },// null "" 
        });

        await userModel.findByIdAndDelete(id)

        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.updateUserById = async (req, res) => {
    try {
        const { id } = req.params
        const { email, username } = req.body;

        await userModel.findByIdAndUpdate(id, { $set: { email, username } })
        const updated = await userModel.findById(id)

        res.status(200).json({ updated })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//metier
module.exports.searchUserByUsername = async (req, res) => {
    try {

        const { username } = req.query
        if (!username) {
            throw new Error("Veuillez fournir un nom pour la recherche.");
        }

        const userListe = await userModel.find({
            username: { $regex: username, $options: "i" }
        })

        if (!userListe) {
            throw new Error("User not found");
        }
        const count = userListe.length
        res.status(200).json({ userListe, count })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getAllClient = async (req, res) => {
    try {

        const userListe = await userModel.find({ role: "client" })

        res.status(200).json({ userListe });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getAllTransporteur = async (req, res) => {
    try {

        const userListe = await userModel.find({ role: "transporteur" })

        res.status(200).json({ userListe });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getAllAdmin = async (req, res) => {
    try {

        const userListe = await userModel.find({ role: "admin" })

        res.status(200).json({ userListe });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.login(email, password)
        const token = createToken(user._id)
        res.cookie("jwt_token_9antra", token, { httpOnly: true, maxAge: maxTime * 1000 })
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.logout = async (req, res) => {
    try {

        res.cookie("jwt_token_9antra", "", { httpOnly: false, maxAge: 1 })
        res.status(200).json("logged")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}