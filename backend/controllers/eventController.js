// Import des models
import Event from '../models/eventModel.js'
import Step from '../models/stepModel.js'
import Match from "../models/matchModel.js";
import User from "../models/userModel.js";

//Création d'un evenement (tournoi)
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
    }
}

//Rejoindre un évenement
export async function joinEvent(req, res) {
    try {
        //On rajoute l'utilisateur connecté
        const user = req.user
        const event = await Event.findByPk(req.params.id);

        //On vérifie si le tournoi existe
        if (!event) {
            res.status(404).json({message: 'L\'événement n\'existe pas.'})
            return
        }

        // On vérifie si on est pas déjà dans le tournoi
        const alreadyInEvent = await event.hasUser(user)
        if (alreadyInEvent) {
            res.json({message: 'Vous êtes déjà dans cet evenement'})
            return
        }

        // On vérifie si le tournoi est complet
        const nbUsers = await event.countUsers()
        if (nbUsers >= event.nb_users) {
            res.status(405).json({message: 'L\'événement est complet.'})
            return
        }
        // On vérifie si le tournoi a deja commencé
        if (event.start_date.getTime() < Date.now()) {
            res.status(405).json({message: 'L\'événement a déjà commencé.'})
            return
        }

        //On rajoute l'utilisateur dans le tournoi
        await event.addUser(user)

        //Si tournoi vide, on crée une step
        // On vérifie si une step est présente
        const stepsAmount = await event.countSteps()
        let step
        if (stepsAmount === 0) {
            // On créer une step
            step = await Step.create({
                level: 1,
                eventId: event.id
            });
        }
        //On récupère la premiere step et son dernier match
        const steps = await event.getSteps()
        step = steps[0]
        const matchs = await step.getMatches()
        const match = matchs[matchs.length - 1]

        // De cette step je recupere le dernier match,
        // Si le match existe pas ou qu'il est plein
        if (!match || (match.player1Id && match.player2Id)) {

            // On créer un match dans la step
            await Match.create({
                player1Id: user.id,
                stepId: step.id
            });
        } else if (!match.player1Id) {
            // Sinon si le slot du player1 est disponible
            // on met le user dans le slot p1
            await match.setPlayer1(user)
        } else {
            //Sinon on le met dans le slot p2
            await match.setPlayer2(user)
        }


        return res.status(200).json({message: 'Vous avez rejoint l\'événement avec succès.'})

    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Une erreur est survenue lors de la participation à l\'événement.'});
    }
}

//Inviter des participants
//@TODO A implementer
// export async function invitePlayers(req, res) {
//
// }

// Récupérer tous les evenements
export async function getAllEvents(req, res) {
    try {
        const events = await Event.findAll({
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur s\'est produite lors de la récupération des événements.'});
    }
}

// Récupérer un seul evenement
export async function getOneEvent(req, res) {
    try {
        const eventId = req.params.id;
        const event = await Event.findByPk(eventId, {
            include: [
                {
                    model: Step,
                    include: {
                        model: Match,
                        attributes: ['id', 'player1Id', 'player2Id', 'stepId', 'u1score1', 'u1score2', 'u2score1', 'u2score2'],
                    },
                },
                {
                    model: User,
                    attributes: {exclude: ['email', 'password', 'is_active', 'token']},
                    through: {attributes: []}, // Exclure les attributs de la table de jointure
                },
            ],
        });

        if (!event) {
            return res.status(404).json({message: 'Événement non trouvé'});
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'événement :', error);
        res.status(500).json({message: 'Une erreur est survenue lors de la récupération de l\'événement'});
    }
}