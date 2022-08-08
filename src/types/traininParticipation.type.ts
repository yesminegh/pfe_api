import { GraphQLID, GraphQLObjectType, GraphQLInputObjectType } from 'graphql';
import { ClientType } from './client.type';

export const TrainingParticipationType = new GraphQLObjectType({
  name: 'TraininParticipation',
  fields: {
    id: { type: GraphQLID },
    idClient: { type: ClientType },
  },
});
export const TrainingParticipationInput = new GraphQLInputObjectType({
  name: 'TraininParticipationInput',
  fields: {
    id: { type: GraphQLID },
    idClient: { type: GraphQLID },
  },
});
