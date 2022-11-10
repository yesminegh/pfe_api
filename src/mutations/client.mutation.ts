import bcrypt from "bcryptjs";

import update from "crud/update";
import { GraphQLBoolean, GraphQLID, GraphQLString } from "graphql";
import joi from "joi";
import clientModel from "models/client.model";

import User, { Role } from "models/user.model";
import participationService from "services/participation.service";
import { ClientType } from "types/client.type";

export default {
  updateClient: update(
    clientModel,
    {
      id: GraphQLID,
      email: GraphQLString,
      fullName: GraphQLString,
      telephone: GraphQLString,
      password: GraphQLString,
      totalAmountPaid: GraphQLString,
      idTraining: GraphQLString,
      valid: GraphQLBoolean,
    },
    ClientType,
    {
      validateSchema: {},
      authorizationRoles: [],
      pre: async ({ idTraining, valid, ...args }) => {
        const query: any = {
          idTraining,
          valid,
          idClient: args.id,
          clientInfo: { totalAmountPaid: args.totalAmountPaid },
          ...args,
        };
        await participationService.updateParticipation(query);

        return query;
      },
    }
  ),
};
