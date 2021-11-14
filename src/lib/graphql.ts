import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type Denim = {
  __typename?: 'Denim';
  createdAt?: Maybe<Scalars['Date']>;
  denimReports?: Maybe<Array<Maybe<DenimReport>>>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  user?: Maybe<User>;
};

export type DenimInput = {
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type DenimReport = {
  __typename?: 'DenimReport';
  backImageUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  denim?: Maybe<Denim>;
  description?: Maybe<Scalars['String']>;
  detailImageUrl?: Maybe<Array<Maybe<Scalars['String']>>>;
  frontImageUrl?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type DenimReportInput = {
  backImageUrl?: Maybe<Scalars['String']>;
  denimId: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  detailImageUrl: Array<Scalars['String']>;
  frontImageUrl?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDenim: Denim;
  createDenimReport: DenimReport;
  createS3SignedUrl: S3SignedUrlResponse;
  createUserAccount: User;
  deleteDenim: Denim;
  deleteDenimReport: DenimReport;
  updateDenim: Denim;
  updateDenimReport: DenimReport;
  updateProfile: Profile;
  updateUser: User;
};

export type MutationCreateDenimArgs = {
  input: DenimInput;
};

export type MutationCreateDenimReportArgs = {
  input: DenimReportInput;
};

export type MutationCreateS3SignedUrlArgs = {
  input: S3SignedUrlInput;
};

export type MutationDeleteDenimArgs = {
  id: Scalars['String'];
};

export type MutationDeleteDenimReportArgs = {
  id: Scalars['String'];
};

export type MutationUpdateDenimArgs = {
  id: Scalars['String'];
  input: DenimInput;
};

export type MutationUpdateDenimReportArgs = {
  id: Scalars['String'];
  input: DenimReportInput;
};

export type MutationUpdateProfileArgs = {
  id: Scalars['String'];
  input: ProfileInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  input: UserInput;
};

export type Profile = {
  __typename?: 'Profile';
  createdAt?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  iconImageUrl?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  instagramUserName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  twitterUserName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  user?: Maybe<User>;
  websiteUrl?: Maybe<Scalars['String']>;
};

export type ProfileInput = {
  description?: Maybe<Scalars['String']>;
  iconImageUrl?: Maybe<Scalars['String']>;
  instagramUserName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  twitterUserName?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getCurrentUser?: Maybe<User>;
  getDenim: Denim;
  getDenimReport: DenimReport;
  getProfile: Profile;
};

export type QueryGetDenimArgs = {
  id: Scalars['String'];
};

export type QueryGetDenimReportArgs = {
  id: Scalars['String'];
};

export type QueryGetProfileArgs = {
  accountId: Scalars['String'];
};

export type S3SignedUrlInput = {
  contentType: Scalars['String'];
};

export type S3SignedUrlResponse = {
  __typename?: 'S3SignedUrlResponse';
  fileName: Scalars['String'];
  signedUrl: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  accountId: Scalars['String'];
  createdAt?: Maybe<Scalars['Date']>;
  denim?: Maybe<Array<Maybe<Denim>>>;
  id: Scalars['String'];
  profile?: Maybe<Profile>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type UserInput = {
  accountId: Scalars['String'];
};

export type CreateS3SignedUrlMutationVariables = Exact<{
  input: S3SignedUrlInput;
}>;

export type CreateS3SignedUrlMutation = {
  __typename?: 'Mutation';
  createS3SignedUrl: {
    __typename?: 'S3SignedUrlResponse';
    fileName: string;
    signedUrl: string;
  };
};

export type CreateUserAccountMutationVariables = Exact<{
  [key: string]: never;
}>;

export type CreateUserAccountMutation = {
  __typename?: 'Mutation';
  createUserAccount: {
    __typename?: 'User';
    id: string;
    accountId: string;
    createdAt?: any | null | undefined;
    updatedAt?: any | null | undefined;
  };
};

export type UpdateProfileMutationVariables = Exact<{
  updateProfileId: Scalars['String'];
  input: ProfileInput;
}>;

export type UpdateProfileMutation = {
  __typename?: 'Mutation';
  updateProfile: {
    __typename?: 'Profile';
    id: string;
    name?: string | null | undefined;
    iconImageUrl?: string | null | undefined;
    description?: string | null | undefined;
    twitterUserName?: string | null | undefined;
    instagramUserName?: string | null | undefined;
    websiteUrl?: string | null | undefined;
  };
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentUserQuery = {
  __typename?: 'Query';
  getCurrentUser?:
    | {
        __typename?: 'User';
        id: string;
        accountId: string;
        createdAt?: any | null | undefined;
        updatedAt?: any | null | undefined;
        profile?:
          | {
              __typename?: 'Profile';
              id: string;
              name?: string | null | undefined;
              iconImageUrl?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type GetProfileQueryVariables = Exact<{
  accountId: Scalars['String'];
}>;

export type GetProfileQuery = {
  __typename?: 'Query';
  getProfile: {
    __typename?: 'Profile';
    id: string;
    name?: string | null | undefined;
    iconImageUrl?: string | null | undefined;
    twitterUserName?: string | null | undefined;
    description?: string | null | undefined;
    instagramUserName?: string | null | undefined;
    websiteUrl?: string | null | undefined;
    createdAt?: any | null | undefined;
    updatedAt?: any | null | undefined;
    user?:
      | {
          __typename?: 'User';
          id: string;
          accountId: string;
          createdAt?: any | null | undefined;
          updatedAt?: any | null | undefined;
        }
      | null
      | undefined;
  };
};

export const CreateS3SignedUrlDocument = gql`
  mutation CreateS3SignedUrl($input: S3SignedUrlInput!) {
    createS3SignedUrl(input: $input) {
      fileName
      signedUrl
    }
  }
`;
export const CreateUserAccountDocument = gql`
  mutation CreateUserAccount {
    createUserAccount {
      id
      accountId
      createdAt
      updatedAt
    }
  }
`;
export const UpdateProfileDocument = gql`
  mutation UpdateProfile($updateProfileId: String!, $input: ProfileInput!) {
    updateProfile(id: $updateProfileId, input: $input) {
      id
      name
      iconImageUrl
      description
      twitterUserName
      instagramUserName
      websiteUrl
    }
  }
`;
export const GetCurrentUserDocument = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      accountId
      createdAt
      updatedAt
      profile {
        id
        name
        iconImageUrl
      }
    }
  }
`;
export const GetProfileDocument = gql`
  query GetProfile($accountId: String!) {
    getProfile(accountId: $accountId) {
      id
      name
      iconImageUrl
      twitterUserName
      description
      instagramUserName
      websiteUrl
      user {
        id
        accountId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    CreateS3SignedUrl(
      variables: CreateS3SignedUrlMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<CreateS3SignedUrlMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateS3SignedUrlMutation>(
            CreateS3SignedUrlDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'CreateS3SignedUrl'
      );
    },
    CreateUserAccount(
      variables?: CreateUserAccountMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<CreateUserAccountMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateUserAccountMutation>(
            CreateUserAccountDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'CreateUserAccount'
      );
    },
    UpdateProfile(
      variables: UpdateProfileMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<UpdateProfileMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateProfileMutation>(
            UpdateProfileDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'UpdateProfile'
      );
    },
    GetCurrentUser(
      variables?: GetCurrentUserQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetCurrentUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetCurrentUserQuery>(
            GetCurrentUserDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'GetCurrentUser'
      );
    },
    GetProfile(
      variables: GetProfileQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetProfileQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetProfileQuery>(GetProfileDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetProfile'
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
