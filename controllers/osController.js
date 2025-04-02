const os = require('os'); //importation
// exportation des fct
module.exports.esmfonction = async (req,res) => { //async bch nrodouh multitache psq node est monotache
    try {
        //..
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getOsInformation = async (req,res) => {
    try {
        //..
        const getOsInformation = {
            hostname : os.hostname(),
            type : os.type(),
            platform : os.platform(),
        }
        res.status(200).json({getOsInformation});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}