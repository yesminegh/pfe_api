import get from "crud/get";
import list from "crud/list";
import { GraphQLID } from "graphql";
import trainingParticipation from "models/trainingParticipation.model";
import { Role } from "models/user.model";
import { TrainingParticipationType } from "types/traininParticipation.type";

export default {
  trainingParticipations: list(
    trainingParticipation,
    TrainingParticipationType,
    {
      authorizationRoles: [Role.ADMIN],
    }
  ),
  trainingParticipation: get(trainingParticipation, TrainingParticipationType, {
    authorizationRoles: [Role.ADMIN],
  }),
  getClientParticipated: list(
    trainingParticipation,
    TrainingParticipationType,
    {
      authorizationRoles: [],
      args: {
        idTraining: { type: GraphQLID },
      },
    }
  ),
};
