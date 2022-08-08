import { GraphQLBoolean, GraphQLID, GraphQLString } from 'graphql';

import create from 'crud/create';
import update from 'crud/update';
import remove from 'crud/remove';
import Trainer from 'models/trainer.model';

import { TrainerType } from 'types/trainer.type';

export default {
  createTrainer: create(
    Trainer,
    {
      fullName: { type: GraphQLString, required: false },
      email: { type: GraphQLString, required: false },
      telephone: { type: GraphQLString, required: false },
      speciality: { type: GraphQLID, required: false },
      availablity: { type: GraphQLBoolean, required: false },
    },
    TrainerType,
  ),
  updateTrainer: update(
    Trainer,
    {
      fullName: GraphQLString,
      email: GraphQLString,
      telephone: GraphQLString,
      speciality: GraphQLID,
      availablity: GraphQLBoolean,
    },
    TrainerType,
    {
      authorizationRoles: [],
    },
  ),
  removeTrainer: remove(Trainer, { authorizationRoles: [] }),
};
