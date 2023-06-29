// Import des models
import Match from '../models/matchModel.js'
import Step from "../models/stepModel.js";

// Ajouter le score d'un joueur à un match
export async function update(req, res) {
    try {
        const matchId = req.params.id;
        const playerId = req.user.id;
        const score1 = req.body.score1 * 1;
        const score2 = req.body.score2 * 1;

        // On vérifie si le match existe
        const match = await Match.findByPk(matchId);
        if (!match) {
            return res.status(404).json({message: 'Le match n\'existe pas.'});
        }

        // Vérifier qu'il n'y a pas d'égalité
        // Si oui pas besoin d'enregistrer, en renvoie un message invitant à rejouer
        if (score1 === score2) {
            return res.status(400).json({message: 'Égalité. Veuillez rejouer.'});
        }

        // On récupère l'event du match
        const step = await match.getStep();
        const event = await step.getEvent();

        //Vérifier si l'Event du match est bien en cours (date_début < now && now < date_fin)
        //Sinon erreur et fin
        const currentDate = Date.now()
        if (currentDate < event.start_date || event.end_date < currentDate) {
            return res.status(400).json({message: 'L\'événement n\'est pas en cours.'});
        }

        if (match.isDone) {
            return res.status(403).json({message: 'Match déjà validé'});
        }

        // Enregistrer les score saisis
        // On profite de la condition pour renvoyer une erreur si l'user est pas dans le match
        if (playerId === match.player1Id) {
            match.u1score1 = score1;
            match.u1score2 = score2;
        } else if (playerId === match.player2Id) {
            match.u2score1 = score1;
            match.u2score2 = score2;
        } else {
            return res.status(403).json({message: 'Vous n\'êtes pas autorisé à ajouter des scores à ce match.'});
        }

        // Enregistrer le match
        await match.save();

        // On revérifie que le match soit validé pour créer ou non une nouvelle step
        if (!match.isDone) {
            if (match.u1score1 == null || match.u2score1 == null) {
                res.status(200).json({message: `Scores enregistrés. En attente de confimation de l'autre participant·e`});
            } else {
                res.status(200).json({message: `Scores enregistrés. Mais non conformes à la saisie de l'adversaire. Mettez vous d'accord.`});
            }
            return;
        }

        // On veut d'abord connaitre la personne qui a gagné avant de la placer dans le match adéquat
        let winnerId;
        if (match.u1score1 > match.u1score2) {
            winnerId = match.player1Id;
        } else {
            winnerId = match.player2Id;
        }

        // On récupère la step actuelle
        const currentStep = await match.getStep();

        //@TODO A IMPLETEMENTER
        // Si mon dernier match de la step actuelle n'a pas de player2, alors on attribue d'office à ce match l'id de la step suivante


        // On vérifie si une step supérieur a déjà été créée
        const nextStep = await Step.findOrCreate({
            where: {
                eventId: event.id,
                level: currentStep.level + 1
            }
        });

        const nextStepMatches = await Match.findAll({ where: { stepId: nextStep[0].id, player2Id: null } });

        // Si le match n'existe pas ou a déjà un joueur 2, on crée un nouveau match et place le joueur 1
        if (!nextStepMatches || nextStepMatches.length === 0) {
            await Match.create({
                player1Id: playerId,
                stepId: nextStep[0].id
            });
        } else {
            const nextStepMatch = nextStepMatches[0];
            nextStepMatch.player2Id = playerId;
            await nextStepMatch.save();
        }
        // Si les scores sont enregistrés et qu'un nouveau match a été créé, on informe le client en ajoutant l'id du gagnant
        res.status(200).json({message: 'Scores ajoutés avec succès.', winnerId: winnerId});

    } catch
        (error) {
        console.error(error);
        return res.status(500).json({message: 'Une erreur est survenue lors de l\'ajout des scores.'});
    }
}