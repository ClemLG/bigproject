// Import des models
import Event from '../models/eventModel.js'
import User from '../models/userModel.js'
import Step from '../models/stepModel.js'
import * as matchCtrl from "./matchController.js";

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
        const existingEvent = await Event.findByPk(req.params.id);
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

        //Si le tournoi est créé, on genere son tableau
        if(event){
            await generateTournamentTable(event.id);
        }

        return res.status(201).json({event});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur s\'est produite lors de la création de la compétition.'});
    }
}

// Génération du tableau de tournoi après sa création
async function generateTournamentTable(eventId) {
    const event = await Event.findByPk(eventId, { include: Step });

    if (!event) {
        throw new Error('Événement non trouvé');
    }

    const steps = event.Step;

// On génère les rencontres aléatoires pour la première étape seulement
    const firstStep = steps[0];
    await matchCtrl.generateRandomMatches(firstStep);

    console.log('Tableau du tournoi généré avec succès !');
}

//Rejoindre un évenement
export async function joinEvent(req, res) {
    try {
        //On rajoute l'utilisateur connecté
        const user = await User.findByPk(req.params.id)
        if (!user) {
            return res.status(404).json({message: 'Utilisateur non trouvé.'})
        }

        const tournament = await Event.findByPk(req.params.id);

        // On vérifie si le tournoi existe, a deja commencé ou s'il est plein
        let nbPlayers;
        if (!tournament || tournament.start_date != null || nbPlayers === tournament.nb_users) {
            return res.status(404).json({message: 'Impossible de rejoindre le tournoi'})
        }

        //On rajoute l'utilisateur dans le tournoi
        tournament.user.push(user)
        await Event.save(tournament)

    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Une erreur est survenue lors de la participation à l\'événement.'});
    }
}

//Inviter des participants
export async function invitePlayers(req, res) {

}

// Récupérer tous les evenements
export async function getAllEvents(req, res) {
    try {
        const events = await Event.findAll({
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des événements.' });
    }
}

// Récupérer un seul evenement
export async function getOneEvent(req, res) {

}