import create from 'crud/create';
import remove from 'crud/remove';
import { GraphQLID } from 'graphql';
import trainingParticipation from 'models/trainingParticipation.model';
import { TrainingParticipationType } from 'types/traininParticipation.type';

export default {
  createTrainingParticipation: create(
    trainingParticipation,
    {
      idTraining: { type: GraphQLID, required: true },
      idClient: { type: GraphQLID, required: true },
    },
    TrainingParticipationType,
    { validateSchema: {}, authorizationRoles: [] },
  ),

  removeTrainingParticipation: remove(trainingParticipation, { authorizationRoles: [] }),
};
