import list from "crud/list";
import get from "crud/get";

import Training from "models/training.model";

import { TrainingType } from "types/training.type";
import { GraphQLID, GraphQLString } from "graphql";
import { reg } from "utils/regs";

function getMedicinesSearchArguments({ name, ...rest }: any) {
  const query: any = { ...rest };
  if (name) query.name = reg(name);
  return query;
}
export default {
  trainings: list(Training, TrainingType, {
    authorizationRoles: [],
    args: {
      idCategory: { type: GraphQLID },
      idSubCategories: { type: GraphQLID },
      name: { type: GraphQLString },
    },
    pre: getMedicinesSearchArguments as any,
  }),
  training: get(Training, TrainingType, { authorizationRoles: [] }),
};
