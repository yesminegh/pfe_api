import { GraphQLObjectType, GraphQLString } from 'graphql';
import { ClientType } from './client.type';
import { TokenType } from './token.type';
import { UserType } from './user.type';

export const AuthType = new GraphQLObjectType({
  name: 'Auth',
  fields: {
    user: { type: UserType },
    token: { type: TokenType },
    idClient: { type: ClientType || GraphQLString },
  },
});
