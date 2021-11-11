import { GraphQLClient } from 'graphql-request';
import { useRecoilState } from 'recoil';
import { GRAPHQL_END_POINT } from '../config/constants';
import { getSdk } from '../lib/graphql';
import { graphqlClientState, hasTokenState } from '../states/graphqlClient';

export const useGraphqlClient = () => {
  const [client, setClient] = useRecoilState(graphqlClientState);
  const [hasToken, setHasToken] = useRecoilState(hasTokenState);

  const updateGraphqlClient = (token: string | null) => {
    const headers =
      token !== null
        ? {
            authorization: `Bearer ${token}`,
          }
        : undefined;

    setHasToken(token !== null);
    setClient(
      getSdk(
        new GraphQLClient(GRAPHQL_END_POINT, {
          headers,
        })
      )
    );
  };

  return { client, updateGraphqlClient, hasToken };
};
