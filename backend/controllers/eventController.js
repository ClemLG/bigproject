// Import des models
import Event from '../models/eventModel.js'
import User from '../models/userModel.js'


//Création d'un evenement (compétition)
export async function createEvent(req, res) {
    try {
        const requestPayload = req.body;

        // On vérifie et valide les données envoyées dans la requête
        if (!requestPayload.nb_users ||
            !requestPayload.title ||
            !requestPayload.game ||
            !requestPayload.start_date ||
            !requestPayload.end_date) {
            return res.status(400).json({message: 'Toutes les informations nécessaires doivent être fournies.'});
        }

        // On vérifie si la compétition n'est pas déjà créée
        const existingEvent = await Event.findOne({where: {title: requestPayload.title}});
        if (existingEvent) {
            res.status(409).json({message: 'Une compétition avec ce nom existe déjà.'});
            return
        }

        // On créer un nouvel événement en utilisant les données reçues
        const event = await Event.create({
            nb_users: `${requestPayload.nb_users}`,
            title: `${requestPayload.title}`,
            game: `${requestPayload.game}`,
            start_date: `${requestPayload.start_date}`,
            end_date: `${requestPayload.end_date}`
        });

        return res.status(201).json({event});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur s\'est produite lors de la création de la compétition.'});
        return
    }
}

//Rejoindre un évenement
export async function joinEvent(req, res) {
    try {
        //On rajoute l'utilisateur connecté
        const user = await User.findByPk(req.params.id)
        if (!user) {
            return res.status(404).json({message: 'Utilisateur non trouvé.'})
        }
        //Faire toutes les conditions pour l'ajout (si tournoi a demarré, si plein ou pas encore...)
        const tournament = await Event.findByPk(req.params.id);
        //On rajoute l'utilisateur dans le tournoi
        await tournament(user)
        Event.save(tournament)

    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Une erreur est survenue lors de la participation à l\'événement.'});
    }
}

//Inviter des participants
export async function invitePlayers(req, res) {

}