import bcrypt from "bcryptjs";
import {
  GraphQLBoolean,
  GraphQLError,
  GraphQLID,
  GraphQLString,
} from "graphql";
import joi from "joi";
import reviewModel from "models/review.model";

import participationService from "services/participation.service";
import { ClientType } from "types/client.type";
import create from "crud/create";
import { ReviewType } from "types/review.type";
import clientModel from "models/client.model";
import trainingModel from "models/training.model";
import trainingParticipationModel from "models/trainingParticipation.model";

export default {
  createReview: create(
    reviewModel,
    {
      email: { type: GraphQLString, required: false },
      text: { type: GraphQLString, required: false },
      idTraining: { type: GraphQLID, required: false },
      idTrainer: { type: GraphQLID, required: false },
      idCategory: { type: GraphQLID, required: false },
      idSubCategory: { type: GraphQLID, required: false },
    },
    ReviewType,
    {
      validateSchema: {},
      authorizationRoles: [],
      pre: async (args, req) => {
        const clientSchema = await clientModel.findOne({ email: args.email });
        const clientPartSchema = await trainingParticipationModel.findOne({
          idClient: clientSchema?._id,
          idTraining: args.idTraining,
        });
        console.log(clientPartSchema, "cc");
        if (!clientSchema || !clientPartSchema)
          throw new GraphQLError("Vous n'avez pas assisté à cette formation");
      },
    }
  ),
};
