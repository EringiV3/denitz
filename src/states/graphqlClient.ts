import { atom } from 'recoil';
import { createGraphqlClient } from '../lib/graphqlClient';

export const graphqlClientState = atom({
  key: 'GRAPHQL_CLIENT',
  default: createGraphqlClient(),
});

export const hasTokenState = atom({
  key: 'GRAPHQL_CLIENT/HAS_TOKEN',
  default: false,
});
