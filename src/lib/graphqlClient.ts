import { GraphQLClient } from 'graphql-request';
import { GRAPHQL_END_POINT } from '../config/constants';
import { getSdk } from '../lib/graphql';

export const createGraphqlClient = () => {
  return getSdk(new GraphQLClient(GRAPHQL_END_POINT));
};
