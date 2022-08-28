import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';
import { CategoryType } from 'types/category.type';
import { SubCategoryType } from 'types/subCategory.type';
import { TrainerType } from 'types/trainer.type';
import { GraphQLUpload } from 'graphql-upload';

export const TrainingType = new GraphQLObjectType({
  name: 'Training',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLString },
    idCategory: { type: CategoryType },
    idSubCategories: { type: SubCategoryType},
    membersNumber: { type: GraphQLInt },
    description: { type: GraphQLString },
    image: { type: new GraphQLList(GraphQLString) },
    idTrainer: { type: TrainerType },
    dateStart: { type: GraphQLString },
    dateEnd: { type: GraphQLString },

  },
});

