import Step from '../models/stepModel.js';
import Event from '../models/eventModel.js'
import Match from '../models/matchModel.js'

// Méthode pour passer à la prochaine étape
export async function moveToNextStep(req, res) {
    const {eventId} = req.params;

    try {
        // Vérifier si l'événement existe
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({message: 'L\'événement n\'existe pas.'});
        }

        // Vérifier si l'événement est terminé
        if (event.is_finished) {
            return res.status(400).json({message: 'L\'événement est déjà terminé.'});
        }

        // Trouver l'étape actuelle
        const currentStep = await Step.findOne({where: {EventId: eventId, is_finished: false}});
        if (!currentStep) {
            return res.status(400).json({message: 'Aucune étape en cours pour cet événement.'});
        }

        // Vérifier si tous les matchs de l'étape actuelle sont terminés
        const allMatchesFinished = await Match.count({where: {StepId: currentStep.id, is_finished: false}}) === 0;
        if (!allMatchesFinished) {
            return res.status(400).json({message: 'Tous les matchs de l\'étape actuelle ne sont pas encore terminés.'});
        }

        // Marquer l'étape actuelle comme terminée
        currentStep.is_finished = true;
        await currentStep.save();

        // Créer la prochaine étape
        const nextStepNumber = currentStep.level + 1;
        if (nextStepNumber > event.max_steps) {
            event.is_finished = true;
            await event.save();
            return res.status(200).json({message: 'L\'événement est terminé.'});
        }

        const nextStep = await Step.create({start_date: new Date(), level: nextStepNumber, EventId: eventId});

        // Mettre à jour les matchs de l'étape suivante avec les participants de l'étape actuelle
        const matches = await Match.findAll({where: {StepId: currentStep.id}, order: [['id', 'ASC']]});
        let participantIndex = 0;

        for (let i = 0; i < matches.length; i += 2) {
            const match1 = matches[i];
            const match2 = matches[i + 1];

            if (match1 && match2) {
                const participants = await match1.getUsers();
                await match2.setUsers(participants);

                participantIndex += participants.length;
            }
        }

        return res.status(200).json({message: 'L\'étape suivante a commencé.'});
    } catch (error) {
        console.error(error);
        return res.status
    }
}