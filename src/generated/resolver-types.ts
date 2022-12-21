import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../graphql/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<Account>;
  Belonging: ResolverTypeWrapper<Belonging>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Event: ResolverTypeWrapper<Event>;
  EventUrl: ResolverTypeWrapper<EventUrl>;
  EventUrlType: ResolverTypeWrapper<EventUrlType>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Program: ResolverTypeWrapper<Program>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  Belonging: Belonging;
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  Event: Event;
  EventUrl: EventUrl;
  EventUrlType: EventUrlType;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Program: Program;
  Query: {};
  String: Scalars['String'];
  User: User;
};

export type AccountResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  provider?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  providerAccountId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BelongingResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Belonging'] = ResolversParentTypes['Belonging']> = {
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  locationGoogleUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventUrlResolvers<ContextType = Context, ParentType extends ResolversParentTypes['EventUrl'] = ResolversParentTypes['EventUrl']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  eventId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  urlType?: Resolver<ResolversTypes['EventUrlType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventUrlTypeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['EventUrlType'] = ResolversParentTypes['EventUrlType']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addBelonging?: Resolver<ResolversTypes['Belonging'], ParentType, ContextType, RequireFields<MutationAddBelongingArgs, 'name'>>;
  addProgram?: Resolver<ResolversTypes['Program'], ParentType, ContextType, RequireFields<MutationAddProgramArgs, 'date' | 'detail' | 'name'>>;
  createEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType, RequireFields<MutationCreateEventArgs, 'date' | 'location' | 'name'>>;
  deleteBelonging?: Resolver<ResolversTypes['Belonging'], ParentType, ContextType, RequireFields<MutationDeleteBelongingArgs, 'belongingId'>>;
  deleteEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType, RequireFields<MutationDeleteEventArgs, 'id'>>;
  deleteProgram?: Resolver<ResolversTypes['Program'], ParentType, ContextType, RequireFields<MutationDeleteProgramArgs, 'id'>>;
  updateBelonging?: Resolver<ResolversTypes['Belonging'], ParentType, ContextType, RequireFields<MutationUpdateBelongingArgs, 'belongingId'>>;
  updateEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType, RequireFields<MutationUpdateEventArgs, 'id'>>;
  updateProgram?: Resolver<ResolversTypes['Program'], ParentType, ContextType, RequireFields<MutationUpdateProgramArgs, 'id'>>;
};

export type ProgramResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Program'] = ResolversParentTypes['Program']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  detail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ownerUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  belongings?: Resolver<Array<ResolversTypes['Belonging']>, ParentType, ContextType>;
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>;
  programs?: Resolver<Array<ResolversTypes['Program']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  admin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Account?: AccountResolvers<ContextType>;
  Belonging?: BelongingResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Event?: EventResolvers<ContextType>;
  EventUrl?: EventUrlResolvers<ContextType>;
  EventUrlType?: EventUrlTypeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Program?: ProgramResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

