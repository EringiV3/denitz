import { atom } from 'recoil';
import { Client, createGraphQLClient } from '../lib/graphqlClient';

export const graphqlClientState = atom<Client>({
  key: 'GRAPHQL_CLIENT',
  default: createGraphQLClient(null),
});
