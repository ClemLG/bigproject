// Import des models
import Match from '../models/matchModel.js'
import Step from "../models/stepModel.js";
import Event from "../models/eventModel.js";

// Ajouter le score d'un joueur à un match
export async function update(req, res) {
    try {
        const matchId = req.params.id;
        const playerId = req.user.id;
        const score1 = req.body.score1 * 1;
        const score2 = req.body.score2 * 1;
        const event = await Event.findByPk(req.params.id);

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

        // Vérifier si l'Event du match est bien en cours (date_début < now && now < date_fin)
        // Sinon erreur et fin
        const currentDate = Date.now()
        if (currentDate < event.start_date.getTime() || currentDate > event.end_date.getTime()) {
            return res.status(400).json({ message: 'L\'événement n\'est pas en cours.' });
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

        // On veut d'abord connaitre la personne qui a gagné avant de la placer dans le match adéquat
        let winnerId;
        if (match.u1score1 > match.u1score2) { // tout simplement
            winnerId = match.player1Id;
        } else {
            winnerId = match.player2Id;
        }

        // On revérifie que le match soit validé pour créer ou non une nouvelle step
        if (!match.isDone) {
            if (match.u1score1 == null || match.u2score1 == null) {
                res.status(200).json({message: `Scores enregistrés. En attente de confimation de l'autre participant·e`});
            } else {
                res.status(200).json({message: `Scores enregistrés. Mais non conformes à la saisie de l'adversaire. Mettez vous d'accord.`});
            }
            return;
        }

        // Enregistrer le match
        await match.save();

        // On récupère la step actuelle
        const currentStep = await match.getStep();

        // On vérifie si une step supérieur a déjà été créée
        const nextStep = await Step.findOrCreate({where: {eventId: event.id, level: currentStep.level + 1}});

        // Si mon dernier match de la step actuelle n'a pas de player2, alors on attribue d'office à ce match l'id de la step suivante
        // Ca passe au pluriel cette variable, car c'est un tableau, et ça serait plutôt `currentStepMatches`
        const currentStepMatches = await currentStep.getMatches({order: [['createdAt', 'DESC']]});
        if (currentStepMatches.length > 0 && currentStepMatches[0].player2Id === null) {
            currentStepMatches[0].stepId = nextStep.id;
            currentStepMatches[0].player2Id = winnerId
            await currentStepMatches[0].save();
        } else {
            // Même logique que joinEvent, je recherche le dernier match de la step
            // S'il n'existe pas ou a déjà un P2 j'en cré 1 et je place le P1
            // S'il existe je place le winner en P2
            // Et FI-NI-TO

            // On récupère le dernier match de l'étape actuelle
            const lastMatch = await currentStep.getMatches({order: [['createdAt', 'DESC']], limit: 1});
            const match = lastMatch[0];

            // Si le match n'existe pas ou a déjà un joueur 2, on crée un nouveau match et place le joueur 1
            if (!match || match.player2Id) {
                await Match.create({
                    player1Id: playerId,
                    stepId: currentStep.id
                });
            } else {
                // Sinon, on place le gagnant en tant que joueur 2 du dernier match
                match.player2Id = playerId;
                await match.save();
            }
        }

        // @TODO si les scores sont enregistrés et qu'un nouveau match a été créé c'est chouette d'en informer le client
        // Histoire de pouvoir lui afficher des confettis ou un smiley qui pleure
        res.status(200).json({ message: 'Scores ajoutés avec succès.', winnerId: winnerId });

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Une erreur est survenue lors de l\'ajout des scores.'});
    }
}