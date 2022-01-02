import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  denimReports?: Maybe<Array<DenimReport>>;
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
  detailImageUrls?: Maybe<Array<DenimReportDetailImageUrl>>;
  frontImageUrl?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type DenimReportDetailImageUrl = {
  __typename?: 'DenimReportDetailImageUrl';
  id: Scalars['String'];
  sortKey: Scalars['Int'];
  url: Scalars['String'];
};

export type DenimReportInput = {
  backImageUrl?: Maybe<Scalars['String']>;
  denimId: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  detailImageUrls: Array<Scalars['String']>;
  frontImageUrl?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type DenimReportsQueryInput = {
  offset: Scalars['Int'];
  perPage: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDenim: Denim;
  createDenimReport: DenimReport;
  createS3SignedUrl: S3SignedUrlResponse;
  createUserAccount: User;
  deleteDenim: Denim;
  deleteDenimReport: DenimReport;
  deleteUserAccount?: Maybe<Scalars['Boolean']>;
  updateDenim: Denim;
  updateDenimReport: DenimReport;
  updateDenimReportSortOrder: Denim;
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


export type MutationUpdateDenimReportSortOrderArgs = {
  input: UpdateDenimReportSortOrderInput;
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
  getDenim?: Maybe<Denim>;
  getDenimReport?: Maybe<DenimReport>;
  getDenimReports: Array<DenimReport>;
  getDenims: Array<Denim>;
  getProfile?: Maybe<Profile>;
  getUser?: Maybe<User>;
  isAvailableAccountId?: Maybe<Scalars['Boolean']>;
};


export type QueryGetDenimArgs = {
  id: Scalars['String'];
};


export type QueryGetDenimReportArgs = {
  id: Scalars['String'];
};


export type QueryGetDenimReportsArgs = {
  input: DenimReportsQueryInput;
};


export type QueryGetDenimsArgs = {
  accountId: Scalars['String'];
};


export type QueryGetProfileArgs = {
  accountId: Scalars['String'];
};


export type QueryGetUserArgs = {
  accountId: Scalars['String'];
};


export type QueryIsAvailableAccountIdArgs = {
  value: Scalars['String'];
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
  denims?: Maybe<Array<Denim>>;
  id: Scalars['String'];
  profile?: Maybe<Profile>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type UserInput = {
  accountId: Scalars['String'];
};

export type UpdateDenimReportSortOrderInput = {
  denimId: Scalars['String'];
  sortOrder: Array<Scalars['String']>;
};

export type CreateDenimMutationVariables = Exact<{
  input: DenimInput;
}>;


export type CreateDenimMutation = { __typename?: 'Mutation', createDenim: { __typename?: 'Denim', id: string, name?: string | null | undefined, description?: string | null | undefined, imageUrl?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } };

export type CreateDenimReportMutationVariables = Exact<{
  input: DenimReportInput;
}>;


export type CreateDenimReportMutation = { __typename?: 'Mutation', createDenimReport: { __typename?: 'DenimReport', id: string, title?: string | null | undefined, description?: string | null | undefined, frontImageUrl?: string | null | undefined, backImageUrl?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, detailImageUrls?: Array<{ __typename?: 'DenimReportDetailImageUrl', id: string, sortKey: number, url: string }> | null | undefined, denim?: { __typename?: 'Denim', id: string, name?: string | null | undefined, description?: string | null | undefined, imageUrl?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } | null | undefined } };

export type CreateS3SignedUrlMutationVariables = Exact<{
  input: S3SignedUrlInput;
}>;


export type CreateS3SignedUrlMutation = { __typename?: 'Mutation', createS3SignedUrl: { __typename?: 'S3SignedUrlResponse', fileName: string, signedUrl: string } };

export type CreateUserAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateUserAccountMutation = { __typename?: 'Mutation', createUserAccount: { __typename?: 'User', id: string, accountId: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } };

export type DeleteDenimMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteDenimMutation = { __typename?: 'Mutation', deleteDenim: { __typename?: 'Denim', id: string, name?: string | null | undefined, description?: string | null | undefined, imageUrl?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } };

export type DeleteDenimReportMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteDenimReportMutation = { __typename?: 'Mutation', deleteDenimReport: { __typename?: 'DenimReport', id: string, title?: string | null | undefined, description?: string | null | undefined, frontImageUrl?: string | null | undefined, backImageUrl?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } };

export type DeleteUserAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserAccountMutation = { __typename?: 'Mutation', deleteUserAccount?: boolean | null | undefined };

export type UpdateDenimMutationVariables = Exact<{
  id: Scalars['String'];
  input: DenimInput;
}>;


export type UpdateDenimMutation = { __typename?: 'Mutation', updateDenim: { __typename?: 'Denim', id: string, name?: string | null | undefined, description?: string | null | undefined, imageUrl?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } };

export type UpdateDenimReportMutationVariables = Exact<{
  id: Scalars['String'];
  input: DenimReportInput;
}>;


export type UpdateDenimReportMutation = { __typename?: 'Mutation', updateDenimReport: { __typename?: 'DenimReport', id: string, title?: string | null | undefined, description?: string | null | undefined, frontImageUrl?: string | null | undefined, backImageUrl?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, detailImageUrls?: Array<{ __typename?: 'DenimReportDetailImageUrl', id: string, sortKey: number, url: string }> | null | undefined } };

export type UpdateDenimReportSortOrderMutationVariables = Exact<{
  input: UpdateDenimReportSortOrderInput;
}>;


export type UpdateDenimReportSortOrderMutation = { __typename?: 'Mutation', updateDenimReportSortOrder: { __typename?: 'Denim', id: string, name?: string | null | undefined, description?: string | null | undefined, imageUrl?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, denimReports?: Array<{ __typename?: 'DenimReport', id: string, title?: string | null | undefined, description?: string | null | undefined, frontImageUrl?: string | null | undefined, backImageUrl?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, detailImageUrls?: Array<{ __typename?: 'DenimReportDetailImageUrl', id: string, sortKey: number, url: string }> | null | undefined }> | null | undefined } };

export type UpdateProfileMutationVariables = Exact<{
  updateProfileId: Scalars['String'];
  input: ProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'Profile', id: string, name?: string | null | undefined, iconImageUrl?: string | null | undefined, description?: string | null | undefined, twitterUserName?: string | null | undefined, instagramUserName?: string | null | undefined, websiteUrl?: string | null | undefined } };

export type UpdateUserMutationVariables = Exact<{
  updateUserId: Scalars['String'];
  input: UserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', accountId: string } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: string, accountId: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, profile?: { __typename?: 'Profile', id: string, name?: string | null | undefined, iconImageUrl?: string | null | undefined } | null | undefined, denims?: Array<{ __typename?: 'Denim', id: string, name?: string | null | undefined, createdAt?: any | null | undefined, imageUrl?: string | null | undefined, description?: string | null | undefined }> | null | undefined } | null | undefined };

export type GetDenimQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetDenimQuery = { __typename?: 'Query', getDenim?: { __typename?: 'Denim', id: string, name?: string | null | undefined, description?: string | null | undefined, imageUrl?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, denimReports?: Array<{ __typename?: 'DenimReport', id: string, title?: string | null | undefined, description?: string | null | undefined, frontImageUrl?: string | null | undefined, backImageUrl?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, detailImageUrls?: Array<{ __typename?: 'DenimReportDetailImageUrl', id: string, sortKey: number, url: string }> | null | undefined }> | null | undefined, user?: { __typename?: 'User', id: string, accountId: string, profile?: { __typename?: 'Profile', id: string, iconImageUrl?: string | null | undefined, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined };

export type GetDenimReportQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetDenimReportQuery = { __typename?: 'Query', getDenimReport?: { __typename?: 'DenimReport', id: string, title?: string | null | undefined, description?: string | null | undefined, frontImageUrl?: string | null | undefined, backImageUrl?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, detailImageUrls?: Array<{ __typename?: 'DenimReportDetailImageUrl', id: string, sortKey: number, url: string }> | null | undefined, denim?: { __typename?: 'Denim', id: string, name?: string | null | undefined, user?: { __typename?: 'User', id: string, accountId: string } | null | undefined, denimReports?: Array<{ __typename?: 'DenimReport', id: string, title?: string | null | undefined }> | null | undefined } | null | undefined } | null | undefined };

export type GetDenimReportsQueryVariables = Exact<{
  input: DenimReportsQueryInput;
}>;


export type GetDenimReportsQuery = { __typename?: 'Query', getDenimReports: Array<{ __typename?: 'DenimReport', id: string, title?: string | null | undefined, description?: string | null | undefined, frontImageUrl?: string | null | undefined, backImageUrl?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, denim?: { __typename?: 'Denim', id: string, name?: string | null | undefined, description?: string | null | undefined, imageUrl?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, user?: { __typename?: 'User', id: string, accountId: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } | null | undefined } | null | undefined }> };

export type GetDenimsQueryVariables = Exact<{
  accountId: Scalars['String'];
}>;


export type GetDenimsQuery = { __typename?: 'Query', getDenims: Array<{ __typename?: 'Denim', id: string, name?: string | null | undefined, description?: string | null | undefined, imageUrl?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined }> };

export type GetProfileQueryVariables = Exact<{
  accountId: Scalars['String'];
}>;


export type GetProfileQuery = { __typename?: 'Query', getProfile?: { __typename?: 'Profile', id: string, name?: string | null | undefined, iconImageUrl?: string | null | undefined, twitterUserName?: string | null | undefined, description?: string | null | undefined, instagramUserName?: string | null | undefined, websiteUrl?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, user?: { __typename?: 'User', id: string, accountId: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } | null | undefined } | null | undefined };

export type GetUserQueryVariables = Exact<{
  accountId: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id: string, accountId: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, profile?: { __typename?: 'Profile', id: string, name?: string | null | undefined, iconImageUrl?: string | null | undefined, description?: string | null | undefined, twitterUserName?: string | null | undefined, instagramUserName?: string | null | undefined, websiteUrl?: string | null | undefined, updatedAt?: any | null | undefined, createdAt?: any | null | undefined } | null | undefined, denims?: Array<{ __typename?: 'Denim', id: string, name?: string | null | undefined, description?: string | null | undefined, imageUrl?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined }> | null | undefined } | null | undefined };

export type IsAvailableAccountIdQueryVariables = Exact<{
  value: Scalars['String'];
}>;


export type IsAvailableAccountIdQuery = { __typename?: 'Query', isAvailableAccountId?: boolean | null | undefined };


export const CreateDenimDocument = gql`
    mutation CreateDenim($input: DenimInput!) {
  createDenim(input: $input) {
    id
    name
    description
    imageUrl
    createdAt
    updatedAt
  }
}
    `;
export const CreateDenimReportDocument = gql`
    mutation CreateDenimReport($input: DenimReportInput!) {
  createDenimReport(input: $input) {
    id
    title
    description
    frontImageUrl
    backImageUrl
    detailImageUrls {
      id
      sortKey
      url
    }
    createdAt
    updatedAt
    denim {
      id
      name
      description
      imageUrl
      createdAt
      updatedAt
    }
  }
}
    `;
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
export const DeleteDenimDocument = gql`
    mutation DeleteDenim($id: String!) {
  deleteDenim(id: $id) {
    id
    name
    description
    imageUrl
    createdAt
    updatedAt
  }
}
    `;
export const DeleteDenimReportDocument = gql`
    mutation DeleteDenimReport($id: String!) {
  deleteDenimReport(id: $id) {
    id
    title
    description
    frontImageUrl
    backImageUrl
    createdAt
    updatedAt
  }
}
    `;
export const DeleteUserAccountDocument = gql`
    mutation DeleteUserAccount {
  deleteUserAccount
}
    `;
export const UpdateDenimDocument = gql`
    mutation UpdateDenim($id: String!, $input: DenimInput!) {
  updateDenim(id: $id, input: $input) {
    id
    name
    description
    imageUrl
    createdAt
    updatedAt
  }
}
    `;
export const UpdateDenimReportDocument = gql`
    mutation UpdateDenimReport($id: String!, $input: DenimReportInput!) {
  updateDenimReport(id: $id, input: $input) {
    id
    title
    description
    frontImageUrl
    backImageUrl
    createdAt
    updatedAt
    detailImageUrls {
      id
      sortKey
      url
    }
  }
}
    `;
export const UpdateDenimReportSortOrderDocument = gql`
    mutation UpdateDenimReportSortOrder($input: updateDenimReportSortOrderInput!) {
  updateDenimReportSortOrder(input: $input) {
    id
    name
    description
    imageUrl
    createdAt
    updatedAt
    denimReports {
      id
      title
      description
      frontImageUrl
      backImageUrl
      createdAt
      updatedAt
      detailImageUrls {
        id
        sortKey
        url
      }
    }
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
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserId: String!, $input: UserInput!) {
  updateUser(id: $updateUserId, input: $input) {
    accountId
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
    denims {
      id
      name
      createdAt
      imageUrl
      description
    }
  }
}
    `;
export const GetDenimDocument = gql`
    query GetDenim($id: String!) {
  getDenim(id: $id) {
    id
    name
    description
    imageUrl
    denimReports {
      id
      title
      description
      frontImageUrl
      backImageUrl
      detailImageUrls {
        id
        sortKey
        url
      }
      createdAt
      updatedAt
    }
    user {
      id
      accountId
      profile {
        id
        iconImageUrl
        name
      }
    }
    createdAt
    updatedAt
  }
}
    `;
export const GetDenimReportDocument = gql`
    query GetDenimReport($id: String!) {
  getDenimReport(id: $id) {
    id
    title
    description
    frontImageUrl
    backImageUrl
    detailImageUrls {
      id
      sortKey
      url
    }
    createdAt
    updatedAt
    denim {
      id
      name
      user {
        id
        accountId
      }
      denimReports {
        id
        title
      }
    }
  }
}
    `;
export const GetDenimReportsDocument = gql`
    query GetDenimReports($input: DenimReportsQueryInput!) {
  getDenimReports(input: $input) {
    id
    title
    description
    frontImageUrl
    backImageUrl
    createdAt
    updatedAt
    denim {
      id
      name
      description
      imageUrl
      createdAt
      updatedAt
      user {
        id
        accountId
        createdAt
        updatedAt
      }
    }
  }
}
    `;
export const GetDenimsDocument = gql`
    query GetDenims($accountId: String!) {
  getDenims(accountId: $accountId) {
    id
    name
    description
    imageUrl
    createdAt
    updatedAt
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
export const GetUserDocument = gql`
    query GetUser($accountId: String!) {
  getUser(accountId: $accountId) {
    id
    accountId
    profile {
      id
      name
      iconImageUrl
      description
      twitterUserName
      instagramUserName
      websiteUrl
      updatedAt
      createdAt
    }
    createdAt
    updatedAt
    denims {
      id
      name
      description
      imageUrl
      createdAt
      updatedAt
    }
  }
}
    `;
export const IsAvailableAccountIdDocument = gql`
    query IsAvailableAccountId($value: String!) {
  isAvailableAccountId(value: $value)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateDenim(variables: CreateDenimMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateDenimMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateDenimMutation>(CreateDenimDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateDenim');
    },
    CreateDenimReport(variables: CreateDenimReportMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateDenimReportMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateDenimReportMutation>(CreateDenimReportDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateDenimReport');
    },
    CreateS3SignedUrl(variables: CreateS3SignedUrlMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateS3SignedUrlMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateS3SignedUrlMutation>(CreateS3SignedUrlDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateS3SignedUrl');
    },
    CreateUserAccount(variables?: CreateUserAccountMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserAccountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserAccountMutation>(CreateUserAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateUserAccount');
    },
    DeleteDenim(variables: DeleteDenimMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteDenimMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteDenimMutation>(DeleteDenimDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteDenim');
    },
    DeleteDenimReport(variables: DeleteDenimReportMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteDenimReportMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteDenimReportMutation>(DeleteDenimReportDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteDenimReport');
    },
    DeleteUserAccount(variables?: DeleteUserAccountMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteUserAccountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteUserAccountMutation>(DeleteUserAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteUserAccount');
    },
    UpdateDenim(variables: UpdateDenimMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateDenimMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateDenimMutation>(UpdateDenimDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateDenim');
    },
    UpdateDenimReport(variables: UpdateDenimReportMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateDenimReportMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateDenimReportMutation>(UpdateDenimReportDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateDenimReport');
    },
    UpdateDenimReportSortOrder(variables: UpdateDenimReportSortOrderMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateDenimReportSortOrderMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateDenimReportSortOrderMutation>(UpdateDenimReportSortOrderDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateDenimReportSortOrder');
    },
    UpdateProfile(variables: UpdateProfileMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateProfileMutation>(UpdateProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateProfile');
    },
    UpdateUser(variables: UpdateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateUserMutation>(UpdateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateUser');
    },
    GetCurrentUser(variables?: GetCurrentUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCurrentUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCurrentUserQuery>(GetCurrentUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCurrentUser');
    },
    GetDenim(variables: GetDenimQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDenimQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDenimQuery>(GetDenimDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetDenim');
    },
    GetDenimReport(variables: GetDenimReportQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDenimReportQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDenimReportQuery>(GetDenimReportDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetDenimReport');
    },
    GetDenimReports(variables: GetDenimReportsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDenimReportsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDenimReportsQuery>(GetDenimReportsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetDenimReports');
    },
    GetDenims(variables: GetDenimsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDenimsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDenimsQuery>(GetDenimsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetDenims');
    },
    GetProfile(variables: GetProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProfileQuery>(GetProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetProfile');
    },
    GetUser(variables: GetUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUser');
    },
    IsAvailableAccountId(variables: IsAvailableAccountIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<IsAvailableAccountIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<IsAvailableAccountIdQuery>(IsAvailableAccountIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'IsAvailableAccountId');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;