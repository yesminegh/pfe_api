import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

import { UserType } from "types/user.type";

export const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    fullName: { type: GraphQLString },
    telephone: { type: GraphQLString },
    totalAmountPaid: { type: GraphQLString },
    user: { type: UserType },
  },
});
