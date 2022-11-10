import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import { CategoryType } from "./category.type";
import { SubCategoryType } from "./subCategory.type";
import { TrainerType } from "./trainer.type";
import { TrainingType } from "./training.type";

export const ReviewType = new GraphQLObjectType({
  name: "Review",
  fields: {
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    idTraining: { type: TrainingType },
    idCategory: { type: CategoryType },
    idSubCategory: { type: SubCategoryType },
    idTrainer: { type: TrainerType },
  },
});
