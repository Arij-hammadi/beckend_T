const userModel = require('../models/userSchema');

module.exports.addUserClient = async (req,res) => {
    try {
        const {username , email , password } = req.body;
        const roleClient = 'client'
        // if (!checkIfUserExists) {
        //     throw new Error("User not found");
        //   }
        const user = await userModel.create({
            username,email ,password,role :roleClient
        })
        // const user = new userModel({name,age,address,moy});
        //   const adduser = await user.save();
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
module.exports.addUserClientWithImg = async (req,res) => {
    try {
        const {username , email , password } = req.body;
        const roleClient = 'client'
        const {filename} = req.file

        const user = await userModel.create({
            username,email ,password,role :roleClient , user_image : filename
        })
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.addUserAdmin= async (req,res) => {
    try {
        const {username , email , password } = req.body;
        const roleAdmin = 'admin'
        const user = await userModel.create({
            username,email ,password,role :roleAdmin
        })
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.addUserTransporteur= async (req,res) => {
    try {
        const {username , email , password } = req.body;
        const roleTransporteur = 'transporteur'
        const user = await userModel.create({
            username,email ,password,role :roleTransporteur
        })
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.addUserTransporteurWithImg = async (req,res) => {
    try {
        const {username , email , password } = req.body;
        const roleClient = 'transporteur'
        const {filename} = req.file

        const user = await userModel.create({
            username,email ,password,role :roleClient , user_image : filename
        })
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getAllUsers= async (req,res) => {
    try {
        const userListe = await userModel.find()

        res.status(200).json({userListe});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getUserById= async (req,res) => {
    try {
        //const id = req.params.id
        const {id} = req.params
        //console.log(req.params.id)
        const user = await userModel.findById(id)

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.deleteUserById= async (req,res) => {
    try {
        const {id} = req.params

        const checkIfUserExists = await userModel.findById(id);
        if (!checkIfUserExists) {
          throw new Error("User not found");
        }

        await carModel.updateMany({owner : id},{
            $unset: { owner: 1 },// null "" 
          });

        await userModel.findByIdAndDelete(id)

        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.updateUserById = async (req, res) => {
try {
    const {id} = req.params
    const {email , username} = req.body;

    await userModel.findByIdAndUpdate(id,{$set : {email , username }})
    const updated = await userModel.findById(id)

    res.status(200).json({updated})
} catch (error) {
    res.status(500).json({message: error.message});
}
}
//metier
module.exports.searchUserByUsername = async (req, res) => {
    try {

        const { username } = req.query
        if(!username){
            throw new Error("Veuillez fournir un nom pour la recherche.");
        }

        const userListe = await userModel.find({
            username: {$regex: username , $options: "i"}
        })

        if (!userListe) {
            throw new Error("User not found");
          }
          const count = userListe.length
        res.status(200).json({userListe,count})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    }

    module.exports.getAllClient= async (req,res) => {
        try {

            const userListe = await userModel.find({role : "client"})
    
            res.status(200).json({userListe});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    module.exports.getAllTransporteur= async (req,res) => {
        try {

            const userListe = await userModel.find({role : "transporteur"})
    
            res.status(200).json({userListe});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    module.exports.getAllAdmin= async (req,res) => {
        try {

            const userListe = await userModel.find({role : "admin"})
    
            res.status(200).json({userListe});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
