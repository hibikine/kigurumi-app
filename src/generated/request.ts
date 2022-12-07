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

export type Mutation = {
  __typename?: 'Mutation';
  addBelonging: Belonging;
  deleteBelonging: Belonging;
  updateBelonging: Belonging;
};


export type MutationAddBelongingArgs = {
  eventId?: InputMaybe<Scalars['Int']>;
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

export type EventUrl = {
  __typename?: 'eventUrl';
  createdAt: Scalars['DateTime'];
  eventId: Scalars['Int'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
  urlType: Scalars['Int'];
};

export type EventUrlType = {
  __typename?: 'eventUrlType';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type EventForBelongingsFragmentFragment = { __typename?: 'Event', id: number, name: string, date: string, location: string, createdAt: string, updatedAt: string };

export type EventFragmentFragment = { __typename?: 'Event', id: number, name: string, date: string, location: string, createdAt: string, updatedAt: string };

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