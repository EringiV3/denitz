import { GraphQLClient } from 'graphql-request';
import { GRAPHQL_END_POINT } from '../config/constants';
import { getSdk } from './graphql';

export const createGraphQLClient = (token: string | null) => {
  const headers =
    token !== null
      ? {
          authorization: `Bearer ${token}`,
        }
      : undefined;
  const client = new GraphQLClient(GRAPHQL_END_POINT, {
    headers,
  });
  return getSdk(client);
};

export type Client = ReturnType<typeof createGraphQLClient>;
