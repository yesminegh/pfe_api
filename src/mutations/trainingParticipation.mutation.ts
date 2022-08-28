import apiWrapper from "crud/apiWrapper";
import remove from "crud/remove";
import { GraphQLID } from "graphql";
import trainingParticipation from "models/trainingParticipation.model";
import participationService from "services/participation.service";
import {
  clientInfoType,
  TrainingParticipationType,
} from "types/traininParticipation.type";

export default {
  createTrainingParticipation: apiWrapper(
    async (args, request) => {
      await participationService.createParticipation(args, args.clientInfo);
    },
    TrainingParticipationType,
    {
      idTraining: { type: GraphQLID, required: false },
      idClient: { type: GraphQLID, required: false },
      clientInfo: { type: clientInfoType, required: false },
    },
    {}
  ),

  removeTrainingParticipation: remove(trainingParticipation, {
    authorizationRoles: [],
  }),
};
