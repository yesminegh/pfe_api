import list from 'crud/list';
import get from 'crud/get';

import { Role } from 'models/user.model';
import Trainer from 'models/trainer.model';

import { GraphQLBoolean, GraphQLID, GraphQLList } from 'graphql';
import { TrainerType } from 'types/trainer.type';

interface SearchArguments {
  speciality: string;
  availablity: boolean;
}

function getCategorysSearchArguments({ availablity, speciality, ...rest }: SearchArguments) {
  const query: any = { ...rest };
  if (speciality) {
    query.speciality === speciality;
  } else if (query.availablity === true) return query;
}

export default {
  trainers: list(Trainer, TrainerType, {
    authorizationRoles: [],
    args: {
      speciality: { type: GraphQLID },
      availablity: { type: GraphQLBoolean },
    },
    pre: getCategorysSearchArguments as any,
  }),

  trainer: get(Trainer, TrainerType, { authorizationRoles: [] }),
};
