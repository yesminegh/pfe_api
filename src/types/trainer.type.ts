import { GraphQLBoolean, GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType } from 'types/user.type';
import { SubCategoryType } from 'types/subCategory.type';

export const TrainerType = new GraphQLObjectType({
  name: 'Trainer',
  fields: {
    id: { type: GraphQLID },
    availablity: { type: GraphQLBoolean },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    fullName: { type: GraphQLString },
    telephone: { type: GraphQLString },
    user: { type: UserType },
    speciality: { type: SubCategoryType },

  },
});
