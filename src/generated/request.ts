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

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID'];
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  type: Scalars['String'];
  userId: Scalars['String'];
};

export type Belonging = {
  __typename?: 'Belonging';
  completed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  event?: Maybe<Event>;
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Event = {
  __typename?: 'Event';
  createdAt: Scalars['DateTime'];
  date: Scalars['DateTime'];
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  location: Scalars['String'];
  locationGoogleUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type EventUrl = {
  __typename?: 'EventUrl';
  createdAt: Scalars['DateTime'];
  eventId: Scalars['Int'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
  urlType: EventUrlType;
};

export type EventUrlType = {
  __typename?: 'EventUrlType';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBelonging: Belonging;
  addProgram: Program;
  createEvent: Event;
  deleteBelonging: Belonging;
  deleteEvent: Event;
  deleteProgram: Program;
  updateBelonging: Belonging;
  updateEvent: Event;
  updateProgram: Program;
};


export type MutationAddBelongingArgs = {
  eventId?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
};


export type MutationAddProgramArgs = {
  date: Scalars['DateTime'];
  detail: Scalars['String'];
  endDate?: InputMaybe<Scalars['DateTime']>;
  location?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  ownerUrl?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};


export type MutationCreateEventArgs = {
  date: Scalars['DateTime'];
  endDate?: InputMaybe<Scalars['DateTime']>;
  location: Scalars['String'];
  locationGoogleUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationDeleteBelongingArgs = {
  belongingId: Scalars['String'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProgramArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateBelongingArgs = {
  belongingId: Scalars['String'];
  completed?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateEventArgs = {
  date?: InputMaybe<Scalars['DateTime']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  location?: InputMaybe<Scalars['String']>;
  locationGoogleUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateProgramArgs = {
  date?: InputMaybe<Scalars['DateTime']>;
  detail?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  ownerUrl?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type Program = {
  __typename?: 'Program';
  createdAt: Scalars['DateTime'];
  date: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  detail: Scalars['String'];
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  ownerUrl?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  belongings: Array<Belonging>;
  currentUser?: Maybe<User>;
  events: Array<Event>;
  programs: Array<Program>;
};

export type User = {
  __typename?: 'User';
  admin?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type BelongingFragmentFragment = { __typename?: 'Belonging', id: number, name: string, completed: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', id?: string | null, name?: string | null }, event?: { __typename?: 'Event', id: number, name: string, date: string, location: string, locationGoogleUrl?: string | null, createdAt: string, updatedAt: string } | null };

export type BelongingsQueryVariables = Exact<{ [key: string]: never; }>;


export type BelongingsQuery = { __typename?: 'Query', belongings: Array<{ __typename?: 'Belonging', id: number, name: string, completed: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', id?: string | null, name?: string | null }, event?: { __typename?: 'Event', id: number, name: string, date: string, location: string, locationGoogleUrl?: string | null, createdAt: string, updatedAt: string } | null }> };

export type AddBelongingMutationVariables = Exact<{
  name: Scalars['String'];
  eventId?: InputMaybe<Scalars['Int']>;
}>;


export type AddBelongingMutation = { __typename?: 'Mutation', addBelonging: { __typename?: 'Belonging', id: number, name: string, completed: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', id?: string | null, name?: string | null }, event?: { __typename?: 'Event', id: number, name: string, date: string, location: string, locationGoogleUrl?: string | null, createdAt: string, updatedAt: string } | null } };

export type UpdateBelongingMutationVariables = Exact<{
  belongingId: Scalars['String'];
  completed?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
}>;


export type UpdateBelongingMutation = { __typename?: 'Mutation', updateBelonging: { __typename?: 'Belonging', id: number, name: string, completed: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', id?: string | null, name?: string | null }, event?: { __typename?: 'Event', id: number, name: string, date: string, location: string, locationGoogleUrl?: string | null, createdAt: string, updatedAt: string } | null } };

export type DeleteBelongingMutationVariables = Exact<{
  belongingId: Scalars['String'];
}>;


export type DeleteBelongingMutation = { __typename?: 'Mutation', deleteBelonging: { __typename?: 'Belonging', id: number, name: string, completed: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', id?: string | null, name?: string | null }, event?: { __typename?: 'Event', id: number, name: string, date: string, location: string, locationGoogleUrl?: string | null, createdAt: string, updatedAt: string } | null } };

export type EventForBelongingsFragmentFragment = { __typename?: 'Event', id: number, name: string, date: string, location: string, locationGoogleUrl?: string | null, createdAt: string, updatedAt: string };

export type EventFragmentFragment = { __typename?: 'Event', id: number, name: string, date: string, location: string, locationGoogleUrl?: string | null, createdAt: string, updatedAt: string };

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', id: number, name: string, date: string, location: string, locationGoogleUrl?: string | null, createdAt: string, updatedAt: string }> };

export type UpdateEventMutationVariables = Exact<{
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['DateTime']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  location?: InputMaybe<Scalars['String']>;
  locationGoogleUrl?: InputMaybe<Scalars['String']>;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent: { __typename?: 'Event', id: number, name: string, date: string, location: string, locationGoogleUrl?: string | null, createdAt: string, updatedAt: string } };

export type EventUrlFragmentFragment = { __typename?: 'EventUrl', id: number, eventId: number, url: string, createdAt: string, updatedAt: string, urlType: { __typename?: 'EventUrlType', id: number, name: string, createdAt: string, updatedAt: string } };

export type EventUrlTypeFragmentFragment = { __typename?: 'EventUrlType', id: number, name: string, createdAt: string, updatedAt: string };

export type ProgramFragmentFragment = { __typename?: 'Program', id: number, name: string, date: string, endDate?: string | null, detail: string, location?: string | null, url?: string | null, ownerUrl?: string | null, createdAt: string, updatedAt: string };

export type ProgramsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProgramsQuery = { __typename?: 'Query', programs: Array<{ __typename?: 'Program', id: number, name: string, date: string, endDate?: string | null, detail: string, location?: string | null, url?: string | null, ownerUrl?: string | null, createdAt: string, updatedAt: string }> };

export type AddProgramMutationVariables = Exact<{
  name: Scalars['String'];
  date: Scalars['DateTime'];
  endDate?: InputMaybe<Scalars['DateTime']>;
  detail: Scalars['String'];
  location?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  ownerUrl?: InputMaybe<Scalars['String']>;
}>;


export type AddProgramMutation = { __typename?: 'Mutation', addProgram: { __typename?: 'Program', id: number, name: string, date: string, endDate?: string | null, detail: string, location?: string | null, url?: string | null, ownerUrl?: string | null, createdAt: string, updatedAt: string } };

export type UpdateProgramMutationVariables = Exact<{
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['DateTime']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  detail?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  ownerUrl?: InputMaybe<Scalars['String']>;
}>;


export type UpdateProgramMutation = { __typename?: 'Mutation', updateProgram: { __typename?: 'Program', id: number, name: string, date: string, endDate?: string | null, detail: string, location?: string | null, url?: string | null, ownerUrl?: string | null, createdAt: string, updatedAt: string } };

export type DeleteProgramMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteProgramMutation = { __typename?: 'Mutation', deleteProgram: { __typename?: 'Program', id: number, name: string, date: string, endDate?: string | null, detail: string, location?: string | null, url?: string | null, ownerUrl?: string | null, createdAt: string, updatedAt: string } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, admin?: boolean | null } | null };

export type CurrentUserFragmentFragment = { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, admin?: boolean | null };

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
  locationGoogleUrl
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
  locationGoogleUrl
  createdAt
  updatedAt
}
    `;
export const EventUrlTypeFragmentFragmentDoc = `
    fragment EventUrlTypeFragment on EventUrlType {
  id
  name
  createdAt
  updatedAt
}
    `;
export const EventUrlFragmentFragmentDoc = `
    fragment EventUrlFragment on EventUrl {
  id
  eventId
  url
  urlType {
    ...EventUrlTypeFragment
  }
  createdAt
  updatedAt
}
    ${EventUrlTypeFragmentFragmentDoc}`;
export const ProgramFragmentFragmentDoc = `
    fragment ProgramFragment on Program {
  id
  name
  date
  endDate
  detail
  location
  url
  ownerUrl
  createdAt
  updatedAt
}
    `;
export const CurrentUserFragmentFragmentDoc = `
    fragment CurrentUserFragment on User {
  id
  name
  email
  admin
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
    mutation AddBelonging($name: String!, $eventId: Int) {
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
export const EventsDocument = `
    query Events {
  events {
    ...EventFragment
  }
}
    ${EventFragmentFragmentDoc}`;
export const useEventsQuery = <
      TData = EventsQuery,
      TError = unknown
    >(
      variables?: EventsQueryVariables,
      options?: UseQueryOptions<EventsQuery, TError, TData>
    ) =>
    useQuery<EventsQuery, TError, TData>(
      variables === undefined ? ['Events'] : ['Events', variables],
      useFetchData<EventsQuery, EventsQueryVariables>(EventsDocument).bind(null, variables),
      options
    );
export const UpdateEventDocument = `
    mutation UpdateEvent($id: Int!, $name: String, $date: DateTime, $endDate: DateTime, $location: String, $locationGoogleUrl: String) {
  updateEvent(
    id: $id
    name: $name
    date: $date
    endDate: $endDate
    location: $location
    locationGoogleUrl: $locationGoogleUrl
  ) {
    ...EventFragment
  }
}
    ${EventFragmentFragmentDoc}`;
export const useUpdateEventMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateEventMutation, TError, UpdateEventMutationVariables, TContext>) =>
    useMutation<UpdateEventMutation, TError, UpdateEventMutationVariables, TContext>(
      ['UpdateEvent'],
      useFetchData<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument),
      options
    );
export const ProgramsDocument = `
    query Programs {
  programs {
    ...ProgramFragment
  }
}
    ${ProgramFragmentFragmentDoc}`;
export const useProgramsQuery = <
      TData = ProgramsQuery,
      TError = unknown
    >(
      variables?: ProgramsQueryVariables,
      options?: UseQueryOptions<ProgramsQuery, TError, TData>
    ) =>
    useQuery<ProgramsQuery, TError, TData>(
      variables === undefined ? ['Programs'] : ['Programs', variables],
      useFetchData<ProgramsQuery, ProgramsQueryVariables>(ProgramsDocument).bind(null, variables),
      options
    );
export const AddProgramDocument = `
    mutation AddProgram($name: String!, $date: DateTime!, $endDate: DateTime, $detail: String!, $location: String, $url: String, $ownerUrl: String) {
  addProgram(
    name: $name
    date: $date
    endDate: $endDate
    detail: $detail
    location: $location
    url: $url
    ownerUrl: $ownerUrl
  ) {
    ...ProgramFragment
  }
}
    ${ProgramFragmentFragmentDoc}`;
export const useAddProgramMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddProgramMutation, TError, AddProgramMutationVariables, TContext>) =>
    useMutation<AddProgramMutation, TError, AddProgramMutationVariables, TContext>(
      ['AddProgram'],
      useFetchData<AddProgramMutation, AddProgramMutationVariables>(AddProgramDocument),
      options
    );
export const UpdateProgramDocument = `
    mutation UpdateProgram($id: Int!, $name: String, $date: DateTime, $endDate: DateTime, $detail: String, $location: String, $url: String, $ownerUrl: String) {
  updateProgram(
    id: $id
    name: $name
    date: $date
    endDate: $endDate
    detail: $detail
    location: $location
    url: $url
    ownerUrl: $ownerUrl
  ) {
    ...ProgramFragment
  }
}
    ${ProgramFragmentFragmentDoc}`;
export const useUpdateProgramMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateProgramMutation, TError, UpdateProgramMutationVariables, TContext>) =>
    useMutation<UpdateProgramMutation, TError, UpdateProgramMutationVariables, TContext>(
      ['UpdateProgram'],
      useFetchData<UpdateProgramMutation, UpdateProgramMutationVariables>(UpdateProgramDocument),
      options
    );
export const DeleteProgramDocument = `
    mutation DeleteProgram($id: Int!) {
  deleteProgram(id: $id) {
    ...ProgramFragment
  }
}
    ${ProgramFragmentFragmentDoc}`;
export const useDeleteProgramMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteProgramMutation, TError, DeleteProgramMutationVariables, TContext>) =>
    useMutation<DeleteProgramMutation, TError, DeleteProgramMutationVariables, TContext>(
      ['DeleteProgram'],
      useFetchData<DeleteProgramMutation, DeleteProgramMutationVariables>(DeleteProgramDocument),
      options
    );
export const CurrentUserDocument = `
    query CurrentUser {
  currentUser {
    ...CurrentUserFragment
  }
}
    ${CurrentUserFragmentFragmentDoc}`;
export const useCurrentUserQuery = <
      TData = CurrentUserQuery,
      TError = unknown
    >(
      variables?: CurrentUserQueryVariables,
      options?: UseQueryOptions<CurrentUserQuery, TError, TData>
    ) =>
    useQuery<CurrentUserQuery, TError, TData>(
      variables === undefined ? ['CurrentUser'] : ['CurrentUser', variables],
      useFetchData<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument).bind(null, variables),
      options
    );