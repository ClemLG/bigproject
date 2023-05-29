import User from '../models/userModel.js'

export async function getOneUser(req, res) {
    try {
            //On récupère l'utilsateur dans la base de données
            const user = await User.findByPk(req.params.id)
            //Si récupération réussie
            res.status(200).json(user)
    }

        // Sinon
    catch (error) {
        res.status(404).json({message: "Utilisateur introuvable"})
    }
}