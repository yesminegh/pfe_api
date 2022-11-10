import get from "crud/get";
import list from "crud/list";
import { GraphQLError, GraphQLID } from "graphql";
import reviewSchema from "models/review.model";

import { Role } from "models/user.model";
import { ReviewType } from "types/review.type";
import { TrainingType } from "types/training.type";
interface SearchArguments {
  idCategory: string[];
}

export default {
  review: get(reviewSchema, ReviewType, { authorizationRoles: [Role.ADMIN] }),

  searchReview: list(reviewSchema, ReviewType, {
    authorizationRoles: [],
    args: {
      idTraining: { type: GraphQLID },
      idCategory: { type: GraphQLID },
      idSubCategory: { type: GraphQLID },
      idTrainer: { type: GraphQLID },
    },
    autoPopulate: true,
  }),
};
