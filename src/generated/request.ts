import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { useFetchData } from '../graphql/customFetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  DateTime: string;
};

export type Belonging = {
  __typename?: 'Belonging';
  completed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  event: Event;
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Event = {
  __typename?: 'Event';
  createdAt: Scalars['DateTime'];
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  location: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBelonging: Belonging;
  deleteBelonging: Belonging;
  updateBelonging: Belonging;
};


export type MutationAddBelongingArgs = {
  eventId: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationDeleteBelongingArgs = {
  belongingId: Scalars['String'];
};


export type MutationUpdateBelongingArgs = {
  belongingId: Scalars['String'];
  completed?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  belongings: Array<Belonging>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type BelongingFragmentFragment = { __typename?: 'Belonging', id: number, name: string, completed: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', id?: string | null, name?: string | null }, event: { __typename?: 'Event', id: number, name: string, date: string, location: string, createdAt: string, updatedAt: string } };

export type BelongingsQueryVariables = Exact<{ [key: string]: never; }>;


export type BelongingsQuery = { __typename?: 'Query', belongings: Array<{ __typename?: 'Belonging', id: number, name: string, completed: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', id?: string | null, name?: string | null }, event: { __typename?: 'Event', id: number, name: string, date: string, location: string, createdAt: string, updatedAt: string } }> };

export type AddBelongingMutationVariables = Exact<{
  name: Scalars['String'];
  eventId: Scalars['Int'];
}>;


export type AddBelongingMutation = { __typename?: 'Mutation', addBelonging: { __typename?: 'Belonging', id: number, name: string, completed: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', id?: string | null, name?: string | null }, event: { __typename?: 'Event', id: number, name: string, date: string, location: string, createdAt: string, updatedAt: string } } };

export type UpdateBelongingMutationVariables = Exact<{
  belongingId: Scalars['String'];
  completed?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
}>;


export type UpdateBelongingMutation = { __typename?: 'Mutation', updateBelonging: { __typename?: 'Belonging', id: number, name: string, completed: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', id?: string | null, name?: string | null }, event: { __typename?: 'Event', id: number, name: string, date: string, location: string, createdAt: string, updatedAt: string } } };

export type DeleteBelongingMutationVariables = Exact<{
  belongingId: Scalars['String'];
}>;


export type DeleteBelongingMutation = { __typename?: 'Mutation', deleteBelonging: { __typename?: 'Belonging', id: number, name: string, completed: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', id?: string | null, name?: string | null }, event: { __typename?: 'Event', id: number, name: string, date: string, location: string, createdAt: string, updatedAt: string } } };

export type EventForBelongingsFragmentFragment = { __typename?: 'Event', id: number, name: string, date: string, location: string, createdAt: string, updatedAt: string };

export type EventFragmentFragment = { __typename?: 'Event', id: number, name: string, date: string, location: string, createdAt: string, updatedAt: string };

export type UserFragmentFragment = { __typename?: 'User', id?: string | null, name?: string | null };

export const UserFragmentFragmentDoc = `
    fragment UserFragment on User {
  id
  name
}
    `;
export const EventForBelongingsFragmentFragmentDoc = `
    fragment EventForBelongingsFragment on Event {
  id
  name
  date
  location
  createdAt
  updatedAt
}
    `;
export const BelongingFragmentFragmentDoc = `
    fragment BelongingFragment on Belonging {
  id
  name
  completed
  createdAt
  updatedAt
  user {
    ...UserFragment
  }
  event {
    ...EventForBelongingsFragment
  }
}
    ${UserFragmentFragmentDoc}
${EventForBelongingsFragmentFragmentDoc}`;
export const EventFragmentFragmentDoc = `
    fragment EventFragment on Event {
  id
  name
  date
  location
  createdAt
  updatedAt
}
    `;
export const BelongingsDocument = `
    query Belongings {
  belongings {
    ...BelongingFragment
  }
}
    ${BelongingFragmentFragmentDoc}`;
export const useBelongingsQuery = <
      TData = BelongingsQuery,
      TError = unknown
    >(
      variables?: BelongingsQueryVariables,
      options?: UseQueryOptions<BelongingsQuery, TError, TData>
    ) =>
    useQuery<BelongingsQuery, TError, TData>(
      variables === undefined ? ['Belongings'] : ['Belongings', variables],
      useFetchData<BelongingsQuery, BelongingsQueryVariables>(BelongingsDocument).bind(null, variables),
      options
    );
export const AddBelongingDocument = `
    mutation AddBelonging($name: String!, $eventId: Int!) {
  addBelonging(name: $name, eventId: $eventId) {
    ...BelongingFragment
  }
}
    ${BelongingFragmentFragmentDoc}`;
export const useAddBelongingMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddBelongingMutation, TError, AddBelongingMutationVariables, TContext>) =>
    useMutation<AddBelongingMutation, TError, AddBelongingMutationVariables, TContext>(
      ['AddBelonging'],
      useFetchData<AddBelongingMutation, AddBelongingMutationVariables>(AddBelongingDocument),
      options
    );
export const UpdateBelongingDocument = `
    mutation UpdateBelonging($belongingId: String!, $completed: Boolean, $name: String) {
  updateBelonging(belongingId: $belongingId, completed: $completed, name: $name) {
    ...BelongingFragment
  }
}
    ${BelongingFragmentFragmentDoc}`;
export const useUpdateBelongingMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateBelongingMutation, TError, UpdateBelongingMutationVariables, TContext>) =>
    useMutation<UpdateBelongingMutation, TError, UpdateBelongingMutationVariables, TContext>(
      ['UpdateBelonging'],
      useFetchData<UpdateBelongingMutation, UpdateBelongingMutationVariables>(UpdateBelongingDocument),
      options
    );
export const DeleteBelongingDocument = `
    mutation DeleteBelonging($belongingId: String!) {
  deleteBelonging(belongingId: $belongingId) {
    ...BelongingFragment
  }
}
    ${BelongingFragmentFragmentDoc}`;
export const useDeleteBelongingMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteBelongingMutation, TError, DeleteBelongingMutationVariables, TContext>) =>
    useMutation<DeleteBelongingMutation, TError, DeleteBelongingMutationVariables, TContext>(
      ['DeleteBelonging'],
      useFetchData<DeleteBelongingMutation, DeleteBelongingMutationVariables>(DeleteBelongingDocument),
      options
    );