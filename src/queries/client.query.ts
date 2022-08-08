import get from 'crud/get';
import list from 'crud/list';
import { GraphQLError } from 'graphql';
import clientSchema from 'models/client.model';

import { Role } from 'models/user.model';
import { ClientType } from 'types/client.type';

export default {
  clients: list(clientSchema, ClientType, {
    authorizationRoles: [Role.ADMIN],
    autoPopulate: false,
  }),
  client: get(clientSchema, ClientType, { authorizationRoles: [Role.ADMIN] }),
};
