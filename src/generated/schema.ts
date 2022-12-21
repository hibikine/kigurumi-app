import { gql } from 'apollo-server-micro';
export const schema = gql`
type Account {
  id: ID!
  provider: String!
  providerAccountId: String!
  type: String!
  userId: String!
}

type Belonging {
  completed: Boolean!
  createdAt: DateTime!
  event: Event
  id: Int!
  name: String!
  updatedAt: DateTime!
  user: User!
}

scalar DateTime

type Event {
  createdAt: DateTime!
  date: DateTime!
  endDate: DateTime
  id: Int!
  location: String!
  locationGoogleUrl: String
  name: String!
  updatedAt: DateTime!
}

type EventUrl {
  createdAt: DateTime!
  eventId: Int!
  id: Int!
  updatedAt: DateTime!
  url: String!
  urlType: EventUrlType!
}

type EventUrlType {
  createdAt: DateTime!
  id: Int!
  name: String!
  updatedAt: DateTime!
}

type Link {
  description: String
  image: String
  title: String
  url: String!
}

type Mutation {
  addBelonging(eventId: Int, name: String!): Belonging!
  addProgram(date: DateTime!, detail: String!, endDate: DateTime, location: String, name: String!, ownerUrl: String, url: String): Program!
  createEvent(date: DateTime!, endDate: DateTime, location: String!, locationGoogleUrl: String, name: String!): Event!
  createLink(url: String!): Link
  deleteBelonging(belongingId: String!): Belonging!
  deleteEvent(id: Int!): Event!
  deleteProgram(id: Int!): Program!
  updateBelonging(belongingId: String!, completed: Boolean, name: String): Belonging!
  updateEvent(date: DateTime, endDate: DateTime, id: Int!, location: String, locationGoogleUrl: String, name: String): Event!
  updateProgram(date: DateTime, detail: String, endDate: DateTime, id: Int!, location: String, name: String, ownerUrl: String, url: String): Program!
}

type Program {
  createdAt: DateTime!
  date: DateTime!
  deletedAt: DateTime
  detail: String!
  endDate: DateTime
  id: Int!
  location: String
  name: String!
  ownerUrl: String
  updatedAt: DateTime!
  url: String
}

type Query {
  belongings: [Belonging!]!
  currentUser: User
  events: [Event!]!
  link(url: String!): Link
  program(id: Int!): Program
  programs: [Program!]!
  twipla(id: Int!): Twipla
}

type Twipla {
  date: String
  detail: String
  name: String!
  ownerUrl: String
  url: String
}

type User {
  admin: Boolean
  email: String
  id: ID
  name: String
}
`;