// Import des models
import Event from '../models/eventModel.js'
import Step from '../models/stepModel.js'
import Match from "../models/matchModel.js";

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

// On génère le tableau de tournoi
export async function generateTournamentTable(req, res) {
    try {
        // Vérifier si l'événement existe
        const event = await Event.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({message: 'L\'événement n\'existe pas.'});
        }

        // Vérifier si le tableau de tournoi a déjà été généré pour cet événement
        const steps = await Step.findAll({where: {EventId: eventId}});
        if (steps.length > 0) {
            return res.status(400).json({message: 'Le tableau de tournoi a déjà été généré pour cet événement.'});
        }

        // Générer le tableau de tournoi
        const participants = event.nb_users;
        const totalSteps = Math.ceil(Math.log2(participants));

        for (let i = 1; i <= totalSteps; i++) {
            const step = await Step.create({start_date: new Date(), level: i, EventId: eventId});

            const totalMatches = participants / Math.pow(2, i);
            for (let j = 1; j <= totalMatches; j++) {
                await Match.create({StepId: step.id});
            }
        }

        return res.status(200).json({message: 'Le tableau de tournoi a été généré avec succès.'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Une erreur est survenue lors de la génération du tableau de tournoi.'});
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

        //On met à jour le nombre d'utilisateurs pour l'événement
        // await event.save()


        //Si tournoi vide, on crée une step
        // On vérifie si une step est présente
        const stepsAmount = await event.countSteps()
        let step
        if (stepsAmount === 0) {
            // On créer une step
            step = await Step.create({
                level: 1,
                event: event
            });
        }
        //On récupère la premiere step et son deni
        const steps = await event.getSteps()
        step = steps[0]
        const matchs = await step.getMatchs()
        const match = matchs[matchs.length - 1]

        // De cette step je recupere le dernier(getMatch _1),
        // Si le getMatch existe pas || qu'il est plein
        if (!matchs || (match.player1Id && matchs.player2Id)) {

            // On créer un match dans la step
            const newMatch = await Match.create({
                player1: user,
                step: step
            });
        } else if (!match.player1Id) {
            // Sinon si le slot du player1 est disponible
            // on met le user dans le slot p1
            match.player1Id = user.id
        } else {
            //Sinon on le met dans le slot p2
            match.player2Id = user.id
        }

        return res.status(200).json({message: 'Vous avez rejoint l\'événement avec succès.'})

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
        res.status(500).json({message: 'Une erreur s\'est produite lors de la récupération des événements.'});
    }
}

// Récupérer un seul evenement
export async function getOneEvent(req, res) {

}