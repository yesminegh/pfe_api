import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";
import { ClientType } from "./client.type";

export const TrainingParticipationType = new GraphQLObjectType({
  name: "TraininParticipation",
  fields: {
    valid: { type: GraphQLBoolean },
    idTraining: { type: GraphQLID },
    idClient: { type: ClientType },
  },
});
export const TrainingParticipationInput = new GraphQLInputObjectType({
  name: "TraininParticipationInput",
  fields: {
    idTraining: { type: GraphQLID },
    idClient: { type: GraphQLID },
  },
});

export const clientInfoType = new GraphQLInputObjectType({
  name: "clientInfo",
  fields: {
    fullName: { type: GraphQLString },
    telephone: { type: GraphQLString },
    email: { type: GraphQLString },
    totalAmountPaid: { type: GraphQLString },
  },
});
