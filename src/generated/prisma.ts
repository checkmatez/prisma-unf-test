import { Prisma as BasePrisma, BasePrismaOptions } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export const typeDefs = `
type Client implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  manager(where: UserWhereInput): User
}

type Color implements Node {
  id: ID!
  hexValue: String!
}

type Company implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  officialName: String!
}

type Currency implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  code: String!
  name: String!
}

type Lead implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  description: String!
  state(where: LeadStateWhereInput): LeadState!
  note: String!
  manager(where: UserWhereInput): User!
  contactDetails(where: ContactDetailWhereInput, orderBy: ContactDetailOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ContactDetail!]
}

type LeadState implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  color(where: ColorWhereInput): Color!
}

type Nomenclature implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  type: NomenclatureType!
  name: String!
  description: String!
}

type Nomenclature1C implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  refKey: String!
  deletionMark: Boolean!
  parentKey(where: Nomenclature1CWhereInput): Nomenclature1C
  isFolder: Boolean!
  code: String!
  description: String!
  vendorCode: String
  dateOfChange: DateTime
}

type Order implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  client(where: ClientWhereInput): Client!
  manager(where: UserWhereInput): User
  positions(where: OrderPositionsWhereInput, orderBy: OrderPositionsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OrderPositions!]
}

type OrderPositions implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  nomenclature(where: NomenclatureWhereInput): Nomenclature!
  quantity: Float!
  price: Float!
  amount: Float!
  currency(where: CurrencyWhereInput): Currency!
}

type Partner1C implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  refKey: String!
  deletionMark: Boolean!
  parentKey(where: Partner1CWhereInput): Partner1C
  isFolder: Boolean!
  code: String!
  description: String!
  contactDetails(where: ContactDetailWhereInput, orderBy: ContactDetailOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ContactDetail!]
}

type User implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  login: String!
  password: String!
  company(where: CompanyWhereInput): Company
  status: UserStatus!
}

type AggregateClient {
  count: Int!
}

type AggregateColor {
  count: Int!
}

type AggregateCompany {
  count: Int!
}

type AggregateContactDetail {
  count: Int!
}

type AggregateCurrency {
  count: Int!
}

type AggregateLead {
  count: Int!
}

type AggregateLeadState {
  count: Int!
}

type AggregateNomenclature {
  count: Int!
}

type AggregateNomenclature1C {
  count: Int!
}

type AggregateOrder {
  count: Int!
}

type AggregateOrderPositions {
  count: Int!
}

type AggregatePartner1C {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  """
  The number of nodes that have been affected by the Batch operation.
  """
  count: Long!
}

"""
A connection to a list of items.
"""
type ClientConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ClientEdge]!
  aggregate: AggregateClient!
}

input ClientCreateInput {
  name: String!
  manager: UserCreateOneInput
}

input ClientCreateOneInput {
  create: ClientCreateInput
  connect: ClientWhereUniqueInput
}

"""
An edge in a connection.
"""
type ClientEdge {
  """
  The item at the end of the edge.
  """
  node: Client!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ClientOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
}

type ClientPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
}

type ClientSubscriptionPayload {
  mutation: MutationType!
  node: Client
  updatedFields: [String!]
  previousValues: ClientPreviousValues
}

input ClientSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ClientSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ClientSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ClientWhereInput
}

input ClientUpdateDataInput {
  name: String
  manager: UserUpdateOneInput
}

input ClientUpdateInput {
  name: String
  manager: UserUpdateOneInput
}

input ClientUpdateOneInput {
  create: ClientCreateInput
  connect: ClientWhereUniqueInput
  delete: Boolean
  update: ClientUpdateDataInput
  upsert: ClientUpsertNestedInput
}

input ClientUpsertNestedInput {
  update: ClientUpdateDataInput!
  create: ClientCreateInput!
}

input ClientWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ClientWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ClientWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  manager: UserWhereInput
}

input ClientWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type ColorConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ColorEdge]!
  aggregate: AggregateColor!
}

input ColorCreateInput {
  hexValue: String!
}

input ColorCreateOneInput {
  create: ColorCreateInput
  connect: ColorWhereUniqueInput
}

"""
An edge in a connection.
"""
type ColorEdge {
  """
  The item at the end of the edge.
  """
  node: Color!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ColorOrderByInput {
  id_ASC
  id_DESC
  hexValue_ASC
  hexValue_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ColorPreviousValues {
  id: ID!
  hexValue: String!
}

type ColorSubscriptionPayload {
  mutation: MutationType!
  node: Color
  updatedFields: [String!]
  previousValues: ColorPreviousValues
}

input ColorSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ColorSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ColorSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ColorWhereInput
}

input ColorUpdateDataInput {
  hexValue: String
}

input ColorUpdateInput {
  hexValue: String
}

input ColorUpdateOneInput {
  create: ColorCreateInput
  connect: ColorWhereUniqueInput
  delete: Boolean
  update: ColorUpdateDataInput
  upsert: ColorUpsertNestedInput
}

input ColorUpsertNestedInput {
  update: ColorUpdateDataInput!
  create: ColorCreateInput!
}

input ColorWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ColorWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ColorWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  hexValue: String
  """
  All values that are not equal to given value.
  """
  hexValue_not: String
  """
  All values that are contained in given list.
  """
  hexValue_in: [String!]
  """
  All values that are not contained in given list.
  """
  hexValue_not_in: [String!]
  """
  All values less than the given value.
  """
  hexValue_lt: String
  """
  All values less than or equal the given value.
  """
  hexValue_lte: String
  """
  All values greater than the given value.
  """
  hexValue_gt: String
  """
  All values greater than or equal the given value.
  """
  hexValue_gte: String
  """
  All values containing the given string.
  """
  hexValue_contains: String
  """
  All values not containing the given string.
  """
  hexValue_not_contains: String
  """
  All values starting with the given string.
  """
  hexValue_starts_with: String
  """
  All values not starting with the given string.
  """
  hexValue_not_starts_with: String
  """
  All values ending with the given string.
  """
  hexValue_ends_with: String
  """
  All values not ending with the given string.
  """
  hexValue_not_ends_with: String
}

input ColorWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type CompanyConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [CompanyEdge]!
  aggregate: AggregateCompany!
}

input CompanyCreateInput {
  name: String!
  officialName: String!
}

input CompanyCreateOneInput {
  create: CompanyCreateInput
  connect: CompanyWhereUniqueInput
}

"""
An edge in a connection.
"""
type CompanyEdge {
  """
  The item at the end of the edge.
  """
  node: Company!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum CompanyOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
  officialName_ASC
  officialName_DESC
}

type CompanyPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  officialName: String!
}

type CompanySubscriptionPayload {
  mutation: MutationType!
  node: Company
  updatedFields: [String!]
  previousValues: CompanyPreviousValues
}

input CompanySubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [CompanySubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [CompanySubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: CompanyWhereInput
}

input CompanyUpdateDataInput {
  name: String
  officialName: String
}

input CompanyUpdateInput {
  name: String
  officialName: String
}

input CompanyUpdateOneInput {
  create: CompanyCreateInput
  connect: CompanyWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: CompanyUpdateDataInput
  upsert: CompanyUpsertNestedInput
}

input CompanyUpsertNestedInput {
  update: CompanyUpdateDataInput!
  create: CompanyCreateInput!
}

input CompanyWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [CompanyWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [CompanyWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  officialName: String
  """
  All values that are not equal to given value.
  """
  officialName_not: String
  """
  All values that are contained in given list.
  """
  officialName_in: [String!]
  """
  All values that are not contained in given list.
  """
  officialName_not_in: [String!]
  """
  All values less than the given value.
  """
  officialName_lt: String
  """
  All values less than or equal the given value.
  """
  officialName_lte: String
  """
  All values greater than the given value.
  """
  officialName_gt: String
  """
  All values greater than or equal the given value.
  """
  officialName_gte: String
  """
  All values containing the given string.
  """
  officialName_contains: String
  """
  All values not containing the given string.
  """
  officialName_not_contains: String
  """
  All values starting with the given string.
  """
  officialName_starts_with: String
  """
  All values not starting with the given string.
  """
  officialName_not_starts_with: String
  """
  All values ending with the given string.
  """
  officialName_ends_with: String
  """
  All values not ending with the given string.
  """
  officialName_not_ends_with: String
}

input CompanyWhereUniqueInput {
  id: ID
}

type ContactDetail {
  createdAt: DateTime!
  updatedAt: DateTime!
  kind: ContactDetailsKind!
  value: String!
  rawValue: String!
}

"""
A connection to a list of items.
"""
type ContactDetailConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ContactDetailEdge]!
  aggregate: AggregateContactDetail!
}

input ContactDetailCreateInput {
  kind: ContactDetailsKind!
  value: String!
  rawValue: String!
}

input ContactDetailCreateManyInput {
  create: [ContactDetailCreateInput!]
}

"""
An edge in a connection.
"""
type ContactDetailEdge {
  """
  The item at the end of the edge.
  """
  node: ContactDetail!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ContactDetailOrderByInput {
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  kind_ASC
  kind_DESC
  value_ASC
  value_DESC
  rawValue_ASC
  rawValue_DESC
  id_ASC
  id_DESC
}

type ContactDetailPreviousValues {
  createdAt: DateTime!
  updatedAt: DateTime!
  kind: ContactDetailsKind!
  value: String!
  rawValue: String!
}

enum ContactDetailsKind {
  EMAIL
  PHONE
  ADDRESS
}

type ContactDetailSubscriptionPayload {
  mutation: MutationType!
  node: ContactDetail
  updatedFields: [String!]
  previousValues: ContactDetailPreviousValues
}

input ContactDetailSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ContactDetailSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ContactDetailSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ContactDetailWhereInput
}

input ContactDetailUpdateInput {
  kind: ContactDetailsKind
  value: String
  rawValue: String
}

input ContactDetailUpdateManyInput {
  create: [ContactDetailCreateInput!]
}

input ContactDetailWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ContactDetailWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ContactDetailWhereInput!]
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  kind: ContactDetailsKind
  """
  All values that are not equal to given value.
  """
  kind_not: ContactDetailsKind
  """
  All values that are contained in given list.
  """
  kind_in: [ContactDetailsKind!]
  """
  All values that are not contained in given list.
  """
  kind_not_in: [ContactDetailsKind!]
  value: String
  """
  All values that are not equal to given value.
  """
  value_not: String
  """
  All values that are contained in given list.
  """
  value_in: [String!]
  """
  All values that are not contained in given list.
  """
  value_not_in: [String!]
  """
  All values less than the given value.
  """
  value_lt: String
  """
  All values less than or equal the given value.
  """
  value_lte: String
  """
  All values greater than the given value.
  """
  value_gt: String
  """
  All values greater than or equal the given value.
  """
  value_gte: String
  """
  All values containing the given string.
  """
  value_contains: String
  """
  All values not containing the given string.
  """
  value_not_contains: String
  """
  All values starting with the given string.
  """
  value_starts_with: String
  """
  All values not starting with the given string.
  """
  value_not_starts_with: String
  """
  All values ending with the given string.
  """
  value_ends_with: String
  """
  All values not ending with the given string.
  """
  value_not_ends_with: String
  rawValue: String
  """
  All values that are not equal to given value.
  """
  rawValue_not: String
  """
  All values that are contained in given list.
  """
  rawValue_in: [String!]
  """
  All values that are not contained in given list.
  """
  rawValue_not_in: [String!]
  """
  All values less than the given value.
  """
  rawValue_lt: String
  """
  All values less than or equal the given value.
  """
  rawValue_lte: String
  """
  All values greater than the given value.
  """
  rawValue_gt: String
  """
  All values greater than or equal the given value.
  """
  rawValue_gte: String
  """
  All values containing the given string.
  """
  rawValue_contains: String
  """
  All values not containing the given string.
  """
  rawValue_not_contains: String
  """
  All values starting with the given string.
  """
  rawValue_starts_with: String
  """
  All values not starting with the given string.
  """
  rawValue_not_starts_with: String
  """
  All values ending with the given string.
  """
  rawValue_ends_with: String
  """
  All values not ending with the given string.
  """
  rawValue_not_ends_with: String
}

"""
A connection to a list of items.
"""
type CurrencyConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [CurrencyEdge]!
  aggregate: AggregateCurrency!
}

input CurrencyCreateInput {
  code: String!
  name: String!
}

input CurrencyCreateOneInput {
  create: CurrencyCreateInput
  connect: CurrencyWhereUniqueInput
}

"""
An edge in a connection.
"""
type CurrencyEdge {
  """
  The item at the end of the edge.
  """
  node: Currency!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum CurrencyOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  code_ASC
  code_DESC
  name_ASC
  name_DESC
}

type CurrencyPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  code: String!
  name: String!
}

type CurrencySubscriptionPayload {
  mutation: MutationType!
  node: Currency
  updatedFields: [String!]
  previousValues: CurrencyPreviousValues
}

input CurrencySubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [CurrencySubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [CurrencySubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: CurrencyWhereInput
}

input CurrencyUpdateDataInput {
  code: String
  name: String
}

input CurrencyUpdateInput {
  code: String
  name: String
}

input CurrencyUpdateOneInput {
  create: CurrencyCreateInput
  connect: CurrencyWhereUniqueInput
  delete: Boolean
  update: CurrencyUpdateDataInput
  upsert: CurrencyUpsertNestedInput
}

input CurrencyUpsertNestedInput {
  update: CurrencyUpdateDataInput!
  create: CurrencyCreateInput!
}

input CurrencyWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [CurrencyWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [CurrencyWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  code: String
  """
  All values that are not equal to given value.
  """
  code_not: String
  """
  All values that are contained in given list.
  """
  code_in: [String!]
  """
  All values that are not contained in given list.
  """
  code_not_in: [String!]
  """
  All values less than the given value.
  """
  code_lt: String
  """
  All values less than or equal the given value.
  """
  code_lte: String
  """
  All values greater than the given value.
  """
  code_gt: String
  """
  All values greater than or equal the given value.
  """
  code_gte: String
  """
  All values containing the given string.
  """
  code_contains: String
  """
  All values not containing the given string.
  """
  code_not_contains: String
  """
  All values starting with the given string.
  """
  code_starts_with: String
  """
  All values not starting with the given string.
  """
  code_not_starts_with: String
  """
  All values ending with the given string.
  """
  code_ends_with: String
  """
  All values not ending with the given string.
  """
  code_not_ends_with: String
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
}

input CurrencyWhereUniqueInput {
  id: ID
}

scalar DateTime

"""
A connection to a list of items.
"""
type LeadConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [LeadEdge]!
  aggregate: AggregateLead!
}

input LeadCreateInput {
  description: String!
  note: String
  state: LeadStateCreateOneInput!
  manager: UserCreateOneInput!
  contactDetails: ContactDetailCreateManyInput
}

"""
An edge in a connection.
"""
type LeadEdge {
  """
  The item at the end of the edge.
  """
  node: Lead!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum LeadOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  description_ASC
  description_DESC
  note_ASC
  note_DESC
}

type LeadPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  description: String!
  note: String!
}

"""
A connection to a list of items.
"""
type LeadStateConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [LeadStateEdge]!
  aggregate: AggregateLeadState!
}

input LeadStateCreateInput {
  name: String!
  color: ColorCreateOneInput!
}

input LeadStateCreateOneInput {
  create: LeadStateCreateInput
  connect: LeadStateWhereUniqueInput
}

"""
An edge in a connection.
"""
type LeadStateEdge {
  """
  The item at the end of the edge.
  """
  node: LeadState!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum LeadStateOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
}

type LeadStatePreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
}

type LeadStateSubscriptionPayload {
  mutation: MutationType!
  node: LeadState
  updatedFields: [String!]
  previousValues: LeadStatePreviousValues
}

input LeadStateSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [LeadStateSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [LeadStateSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: LeadStateWhereInput
}

input LeadStateUpdateDataInput {
  name: String
  color: ColorUpdateOneInput
}

input LeadStateUpdateInput {
  name: String
  color: ColorUpdateOneInput
}

input LeadStateUpdateOneInput {
  create: LeadStateCreateInput
  connect: LeadStateWhereUniqueInput
  delete: Boolean
  update: LeadStateUpdateDataInput
  upsert: LeadStateUpsertNestedInput
}

input LeadStateUpsertNestedInput {
  update: LeadStateUpdateDataInput!
  create: LeadStateCreateInput!
}

input LeadStateWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [LeadStateWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [LeadStateWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  color: ColorWhereInput
}

input LeadStateWhereUniqueInput {
  id: ID
}

type LeadSubscriptionPayload {
  mutation: MutationType!
  node: Lead
  updatedFields: [String!]
  previousValues: LeadPreviousValues
}

input LeadSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [LeadSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [LeadSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: LeadWhereInput
}

input LeadUpdateInput {
  description: String
  note: String
  state: LeadStateUpdateOneInput
  manager: UserUpdateOneInput
  contactDetails: ContactDetailUpdateManyInput
}

input LeadWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [LeadWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [LeadWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  description: String
  """
  All values that are not equal to given value.
  """
  description_not: String
  """
  All values that are contained in given list.
  """
  description_in: [String!]
  """
  All values that are not contained in given list.
  """
  description_not_in: [String!]
  """
  All values less than the given value.
  """
  description_lt: String
  """
  All values less than or equal the given value.
  """
  description_lte: String
  """
  All values greater than the given value.
  """
  description_gt: String
  """
  All values greater than or equal the given value.
  """
  description_gte: String
  """
  All values containing the given string.
  """
  description_contains: String
  """
  All values not containing the given string.
  """
  description_not_contains: String
  """
  All values starting with the given string.
  """
  description_starts_with: String
  """
  All values not starting with the given string.
  """
  description_not_starts_with: String
  """
  All values ending with the given string.
  """
  description_ends_with: String
  """
  All values not ending with the given string.
  """
  description_not_ends_with: String
  note: String
  """
  All values that are not equal to given value.
  """
  note_not: String
  """
  All values that are contained in given list.
  """
  note_in: [String!]
  """
  All values that are not contained in given list.
  """
  note_not_in: [String!]
  """
  All values less than the given value.
  """
  note_lt: String
  """
  All values less than or equal the given value.
  """
  note_lte: String
  """
  All values greater than the given value.
  """
  note_gt: String
  """
  All values greater than or equal the given value.
  """
  note_gte: String
  """
  All values containing the given string.
  """
  note_contains: String
  """
  All values not containing the given string.
  """
  note_not_contains: String
  """
  All values starting with the given string.
  """
  note_starts_with: String
  """
  All values not starting with the given string.
  """
  note_not_starts_with: String
  """
  All values ending with the given string.
  """
  note_ends_with: String
  """
  All values not ending with the given string.
  """
  note_not_ends_with: String
  state: LeadStateWhereInput
  manager: UserWhereInput
  contactDetails_every: ContactDetailWhereInput
  contactDetails_some: ContactDetailWhereInput
  contactDetails_none: ContactDetailWhereInput
}

input LeadWhereUniqueInput {
  id: ID
}

"""
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""
An object with an ID
"""
interface Node {
  """
  The id of the object.
  """
  id: ID!
}

"""
A connection to a list of items.
"""
type Nomenclature1CConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [Nomenclature1CEdge]!
  aggregate: AggregateNomenclature1C!
}

input Nomenclature1CCreateInput {
  refKey: String!
  deletionMark: Boolean
  isFolder: Boolean
  code: String!
  description: String!
  vendorCode: String
  dateOfChange: DateTime
  parentKey: Nomenclature1CCreateOneInput
}

input Nomenclature1CCreateOneInput {
  create: Nomenclature1CCreateInput
  connect: Nomenclature1CWhereUniqueInput
}

"""
An edge in a connection.
"""
type Nomenclature1CEdge {
  """
  The item at the end of the edge.
  """
  node: Nomenclature1C!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum Nomenclature1COrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  refKey_ASC
  refKey_DESC
  deletionMark_ASC
  deletionMark_DESC
  isFolder_ASC
  isFolder_DESC
  code_ASC
  code_DESC
  description_ASC
  description_DESC
  vendorCode_ASC
  vendorCode_DESC
  dateOfChange_ASC
  dateOfChange_DESC
}

type Nomenclature1CPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  refKey: String!
  deletionMark: Boolean!
  isFolder: Boolean!
  code: String!
  description: String!
  vendorCode: String
  dateOfChange: DateTime
}

type Nomenclature1CSubscriptionPayload {
  mutation: MutationType!
  node: Nomenclature1C
  updatedFields: [String!]
  previousValues: Nomenclature1CPreviousValues
}

input Nomenclature1CSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [Nomenclature1CSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [Nomenclature1CSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: Nomenclature1CWhereInput
}

input Nomenclature1CUpdateDataInput {
  refKey: String
  deletionMark: Boolean
  isFolder: Boolean
  code: String
  description: String
  vendorCode: String
  dateOfChange: DateTime
  parentKey: Nomenclature1CUpdateOneInput
}

input Nomenclature1CUpdateInput {
  refKey: String
  deletionMark: Boolean
  isFolder: Boolean
  code: String
  description: String
  vendorCode: String
  dateOfChange: DateTime
  parentKey: Nomenclature1CUpdateOneInput
}

input Nomenclature1CUpdateOneInput {
  create: Nomenclature1CCreateInput
  connect: Nomenclature1CWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: Nomenclature1CUpdateDataInput
  upsert: Nomenclature1CUpsertNestedInput
}

input Nomenclature1CUpsertNestedInput {
  update: Nomenclature1CUpdateDataInput!
  create: Nomenclature1CCreateInput!
}

input Nomenclature1CWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [Nomenclature1CWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [Nomenclature1CWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  refKey: String
  """
  All values that are not equal to given value.
  """
  refKey_not: String
  """
  All values that are contained in given list.
  """
  refKey_in: [String!]
  """
  All values that are not contained in given list.
  """
  refKey_not_in: [String!]
  """
  All values less than the given value.
  """
  refKey_lt: String
  """
  All values less than or equal the given value.
  """
  refKey_lte: String
  """
  All values greater than the given value.
  """
  refKey_gt: String
  """
  All values greater than or equal the given value.
  """
  refKey_gte: String
  """
  All values containing the given string.
  """
  refKey_contains: String
  """
  All values not containing the given string.
  """
  refKey_not_contains: String
  """
  All values starting with the given string.
  """
  refKey_starts_with: String
  """
  All values not starting with the given string.
  """
  refKey_not_starts_with: String
  """
  All values ending with the given string.
  """
  refKey_ends_with: String
  """
  All values not ending with the given string.
  """
  refKey_not_ends_with: String
  deletionMark: Boolean
  """
  All values that are not equal to given value.
  """
  deletionMark_not: Boolean
  isFolder: Boolean
  """
  All values that are not equal to given value.
  """
  isFolder_not: Boolean
  code: String
  """
  All values that are not equal to given value.
  """
  code_not: String
  """
  All values that are contained in given list.
  """
  code_in: [String!]
  """
  All values that are not contained in given list.
  """
  code_not_in: [String!]
  """
  All values less than the given value.
  """
  code_lt: String
  """
  All values less than or equal the given value.
  """
  code_lte: String
  """
  All values greater than the given value.
  """
  code_gt: String
  """
  All values greater than or equal the given value.
  """
  code_gte: String
  """
  All values containing the given string.
  """
  code_contains: String
  """
  All values not containing the given string.
  """
  code_not_contains: String
  """
  All values starting with the given string.
  """
  code_starts_with: String
  """
  All values not starting with the given string.
  """
  code_not_starts_with: String
  """
  All values ending with the given string.
  """
  code_ends_with: String
  """
  All values not ending with the given string.
  """
  code_not_ends_with: String
  description: String
  """
  All values that are not equal to given value.
  """
  description_not: String
  """
  All values that are contained in given list.
  """
  description_in: [String!]
  """
  All values that are not contained in given list.
  """
  description_not_in: [String!]
  """
  All values less than the given value.
  """
  description_lt: String
  """
  All values less than or equal the given value.
  """
  description_lte: String
  """
  All values greater than the given value.
  """
  description_gt: String
  """
  All values greater than or equal the given value.
  """
  description_gte: String
  """
  All values containing the given string.
  """
  description_contains: String
  """
  All values not containing the given string.
  """
  description_not_contains: String
  """
  All values starting with the given string.
  """
  description_starts_with: String
  """
  All values not starting with the given string.
  """
  description_not_starts_with: String
  """
  All values ending with the given string.
  """
  description_ends_with: String
  """
  All values not ending with the given string.
  """
  description_not_ends_with: String
  vendorCode: String
  """
  All values that are not equal to given value.
  """
  vendorCode_not: String
  """
  All values that are contained in given list.
  """
  vendorCode_in: [String!]
  """
  All values that are not contained in given list.
  """
  vendorCode_not_in: [String!]
  """
  All values less than the given value.
  """
  vendorCode_lt: String
  """
  All values less than or equal the given value.
  """
  vendorCode_lte: String
  """
  All values greater than the given value.
  """
  vendorCode_gt: String
  """
  All values greater than or equal the given value.
  """
  vendorCode_gte: String
  """
  All values containing the given string.
  """
  vendorCode_contains: String
  """
  All values not containing the given string.
  """
  vendorCode_not_contains: String
  """
  All values starting with the given string.
  """
  vendorCode_starts_with: String
  """
  All values not starting with the given string.
  """
  vendorCode_not_starts_with: String
  """
  All values ending with the given string.
  """
  vendorCode_ends_with: String
  """
  All values not ending with the given string.
  """
  vendorCode_not_ends_with: String
  dateOfChange: DateTime
  """
  All values that are not equal to given value.
  """
  dateOfChange_not: DateTime
  """
  All values that are contained in given list.
  """
  dateOfChange_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  dateOfChange_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  dateOfChange_lt: DateTime
  """
  All values less than or equal the given value.
  """
  dateOfChange_lte: DateTime
  """
  All values greater than the given value.
  """
  dateOfChange_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  dateOfChange_gte: DateTime
  parentKey: Nomenclature1CWhereInput
}

input Nomenclature1CWhereUniqueInput {
  id: ID
  refKey: String
}

"""
A connection to a list of items.
"""
type NomenclatureConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [NomenclatureEdge]!
  aggregate: AggregateNomenclature!
}

input NomenclatureCreateInput {
  type: NomenclatureType
  name: String!
  description: String!
}

input NomenclatureCreateOneInput {
  create: NomenclatureCreateInput
  connect: NomenclatureWhereUniqueInput
}

"""
An edge in a connection.
"""
type NomenclatureEdge {
  """
  The item at the end of the edge.
  """
  node: Nomenclature!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum NomenclatureOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  type_ASC
  type_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
}

type NomenclaturePreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  type: NomenclatureType!
  name: String!
  description: String!
}

type NomenclatureSubscriptionPayload {
  mutation: MutationType!
  node: Nomenclature
  updatedFields: [String!]
  previousValues: NomenclaturePreviousValues
}

input NomenclatureSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [NomenclatureSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [NomenclatureSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: NomenclatureWhereInput
}

enum NomenclatureType {
  GOOD
  SERVICE
}

input NomenclatureUpdateDataInput {
  type: NomenclatureType
  name: String
  description: String
}

input NomenclatureUpdateInput {
  type: NomenclatureType
  name: String
  description: String
}

input NomenclatureUpdateOneInput {
  create: NomenclatureCreateInput
  connect: NomenclatureWhereUniqueInput
  delete: Boolean
  update: NomenclatureUpdateDataInput
  upsert: NomenclatureUpsertNestedInput
}

input NomenclatureUpsertNestedInput {
  update: NomenclatureUpdateDataInput!
  create: NomenclatureCreateInput!
}

input NomenclatureWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [NomenclatureWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [NomenclatureWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  type: NomenclatureType
  """
  All values that are not equal to given value.
  """
  type_not: NomenclatureType
  """
  All values that are contained in given list.
  """
  type_in: [NomenclatureType!]
  """
  All values that are not contained in given list.
  """
  type_not_in: [NomenclatureType!]
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  description: String
  """
  All values that are not equal to given value.
  """
  description_not: String
  """
  All values that are contained in given list.
  """
  description_in: [String!]
  """
  All values that are not contained in given list.
  """
  description_not_in: [String!]
  """
  All values less than the given value.
  """
  description_lt: String
  """
  All values less than or equal the given value.
  """
  description_lte: String
  """
  All values greater than the given value.
  """
  description_gt: String
  """
  All values greater than or equal the given value.
  """
  description_gte: String
  """
  All values containing the given string.
  """
  description_contains: String
  """
  All values not containing the given string.
  """
  description_not_contains: String
  """
  All values starting with the given string.
  """
  description_starts_with: String
  """
  All values not starting with the given string.
  """
  description_not_starts_with: String
  """
  All values ending with the given string.
  """
  description_ends_with: String
  """
  All values not ending with the given string.
  """
  description_not_ends_with: String
}

input NomenclatureWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type OrderConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [OrderEdge]!
  aggregate: AggregateOrder!
}

input OrderCreateInput {
  client: ClientCreateOneInput!
  manager: UserCreateOneInput
  positions: OrderPositionsCreateManyInput
}

"""
An edge in a connection.
"""
type OrderEdge {
  """
  The item at the end of the edge.
  """
  node: Order!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum OrderOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

"""
A connection to a list of items.
"""
type OrderPositionsConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [OrderPositionsEdge]!
  aggregate: AggregateOrderPositions!
}

input OrderPositionsCreateInput {
  quantity: Float!
  price: Float!
  amount: Float!
  nomenclature: NomenclatureCreateOneInput!
  currency: CurrencyCreateOneInput!
}

input OrderPositionsCreateManyInput {
  create: [OrderPositionsCreateInput!]
  connect: [OrderPositionsWhereUniqueInput!]
}

"""
An edge in a connection.
"""
type OrderPositionsEdge {
  """
  The item at the end of the edge.
  """
  node: OrderPositions!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum OrderPositionsOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  quantity_ASC
  quantity_DESC
  price_ASC
  price_DESC
  amount_ASC
  amount_DESC
}

type OrderPositionsPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  quantity: Float!
  price: Float!
  amount: Float!
}

type OrderPositionsSubscriptionPayload {
  mutation: MutationType!
  node: OrderPositions
  updatedFields: [String!]
  previousValues: OrderPositionsPreviousValues
}

input OrderPositionsSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [OrderPositionsSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [OrderPositionsSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: OrderPositionsWhereInput
}

input OrderPositionsUpdateDataInput {
  quantity: Float
  price: Float
  amount: Float
  nomenclature: NomenclatureUpdateOneInput
  currency: CurrencyUpdateOneInput
}

input OrderPositionsUpdateInput {
  quantity: Float
  price: Float
  amount: Float
  nomenclature: NomenclatureUpdateOneInput
  currency: CurrencyUpdateOneInput
}

input OrderPositionsUpdateManyInput {
  create: [OrderPositionsCreateInput!]
  connect: [OrderPositionsWhereUniqueInput!]
  disconnect: [OrderPositionsWhereUniqueInput!]
  delete: [OrderPositionsWhereUniqueInput!]
  update: [OrderPositionsUpdateWithWhereUniqueNestedInput!]
  upsert: [OrderPositionsUpsertWithWhereUniqueNestedInput!]
}

input OrderPositionsUpdateWithWhereUniqueNestedInput {
  where: OrderPositionsWhereUniqueInput!
  data: OrderPositionsUpdateDataInput!
}

input OrderPositionsUpsertWithWhereUniqueNestedInput {
  where: OrderPositionsWhereUniqueInput!
  update: OrderPositionsUpdateDataInput!
  create: OrderPositionsCreateInput!
}

input OrderPositionsWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [OrderPositionsWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [OrderPositionsWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  quantity: Float
  """
  All values that are not equal to given value.
  """
  quantity_not: Float
  """
  All values that are contained in given list.
  """
  quantity_in: [Float!]
  """
  All values that are not contained in given list.
  """
  quantity_not_in: [Float!]
  """
  All values less than the given value.
  """
  quantity_lt: Float
  """
  All values less than or equal the given value.
  """
  quantity_lte: Float
  """
  All values greater than the given value.
  """
  quantity_gt: Float
  """
  All values greater than or equal the given value.
  """
  quantity_gte: Float
  price: Float
  """
  All values that are not equal to given value.
  """
  price_not: Float
  """
  All values that are contained in given list.
  """
  price_in: [Float!]
  """
  All values that are not contained in given list.
  """
  price_not_in: [Float!]
  """
  All values less than the given value.
  """
  price_lt: Float
  """
  All values less than or equal the given value.
  """
  price_lte: Float
  """
  All values greater than the given value.
  """
  price_gt: Float
  """
  All values greater than or equal the given value.
  """
  price_gte: Float
  amount: Float
  """
  All values that are not equal to given value.
  """
  amount_not: Float
  """
  All values that are contained in given list.
  """
  amount_in: [Float!]
  """
  All values that are not contained in given list.
  """
  amount_not_in: [Float!]
  """
  All values less than the given value.
  """
  amount_lt: Float
  """
  All values less than or equal the given value.
  """
  amount_lte: Float
  """
  All values greater than the given value.
  """
  amount_gt: Float
  """
  All values greater than or equal the given value.
  """
  amount_gte: Float
  nomenclature: NomenclatureWhereInput
  currency: CurrencyWhereInput
}

input OrderPositionsWhereUniqueInput {
  id: ID
}

type OrderPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type OrderSubscriptionPayload {
  mutation: MutationType!
  node: Order
  updatedFields: [String!]
  previousValues: OrderPreviousValues
}

input OrderSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [OrderSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [OrderSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: OrderWhereInput
}

input OrderUpdateInput {
  client: ClientUpdateOneInput
  manager: UserUpdateOneInput
  positions: OrderPositionsUpdateManyInput
}

input OrderWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [OrderWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [OrderWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  client: ClientWhereInput
  manager: UserWhereInput
  positions_every: OrderPositionsWhereInput
  positions_some: OrderPositionsWhereInput
  positions_none: OrderPositionsWhereInput
}

input OrderWhereUniqueInput {
  id: ID
}

"""
Information about pagination in a connection.
"""
type PageInfo {
  """
  When paginating forwards, are there more items?
  """
  hasNextPage: Boolean!
  """
  When paginating backwards, are there more items?
  """
  hasPreviousPage: Boolean!
  """
  When paginating backwards, the cursor to continue.
  """
  startCursor: String
  """
  When paginating forwards, the cursor to continue.
  """
  endCursor: String
}

"""
A connection to a list of items.
"""
type Partner1CConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [Partner1CEdge]!
  aggregate: AggregatePartner1C!
}

input Partner1CCreateInput {
  refKey: String!
  deletionMark: Boolean
  isFolder: Boolean
  code: String!
  description: String!
  parentKey: Partner1CCreateOneInput
  contactDetails: ContactDetailCreateManyInput
}

input Partner1CCreateOneInput {
  create: Partner1CCreateInput
  connect: Partner1CWhereUniqueInput
}

"""
An edge in a connection.
"""
type Partner1CEdge {
  """
  The item at the end of the edge.
  """
  node: Partner1C!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum Partner1COrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  refKey_ASC
  refKey_DESC
  deletionMark_ASC
  deletionMark_DESC
  isFolder_ASC
  isFolder_DESC
  code_ASC
  code_DESC
  description_ASC
  description_DESC
}

type Partner1CPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  refKey: String!
  deletionMark: Boolean!
  isFolder: Boolean!
  code: String!
  description: String!
}

type Partner1CSubscriptionPayload {
  mutation: MutationType!
  node: Partner1C
  updatedFields: [String!]
  previousValues: Partner1CPreviousValues
}

input Partner1CSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [Partner1CSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [Partner1CSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: Partner1CWhereInput
}

input Partner1CUpdateDataInput {
  refKey: String
  deletionMark: Boolean
  isFolder: Boolean
  code: String
  description: String
  parentKey: Partner1CUpdateOneInput
  contactDetails: ContactDetailUpdateManyInput
}

input Partner1CUpdateInput {
  refKey: String
  deletionMark: Boolean
  isFolder: Boolean
  code: String
  description: String
  parentKey: Partner1CUpdateOneInput
  contactDetails: ContactDetailUpdateManyInput
}

input Partner1CUpdateOneInput {
  create: Partner1CCreateInput
  connect: Partner1CWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: Partner1CUpdateDataInput
  upsert: Partner1CUpsertNestedInput
}

input Partner1CUpsertNestedInput {
  update: Partner1CUpdateDataInput!
  create: Partner1CCreateInput!
}

input Partner1CWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [Partner1CWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [Partner1CWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  refKey: String
  """
  All values that are not equal to given value.
  """
  refKey_not: String
  """
  All values that are contained in given list.
  """
  refKey_in: [String!]
  """
  All values that are not contained in given list.
  """
  refKey_not_in: [String!]
  """
  All values less than the given value.
  """
  refKey_lt: String
  """
  All values less than or equal the given value.
  """
  refKey_lte: String
  """
  All values greater than the given value.
  """
  refKey_gt: String
  """
  All values greater than or equal the given value.
  """
  refKey_gte: String
  """
  All values containing the given string.
  """
  refKey_contains: String
  """
  All values not containing the given string.
  """
  refKey_not_contains: String
  """
  All values starting with the given string.
  """
  refKey_starts_with: String
  """
  All values not starting with the given string.
  """
  refKey_not_starts_with: String
  """
  All values ending with the given string.
  """
  refKey_ends_with: String
  """
  All values not ending with the given string.
  """
  refKey_not_ends_with: String
  deletionMark: Boolean
  """
  All values that are not equal to given value.
  """
  deletionMark_not: Boolean
  isFolder: Boolean
  """
  All values that are not equal to given value.
  """
  isFolder_not: Boolean
  code: String
  """
  All values that are not equal to given value.
  """
  code_not: String
  """
  All values that are contained in given list.
  """
  code_in: [String!]
  """
  All values that are not contained in given list.
  """
  code_not_in: [String!]
  """
  All values less than the given value.
  """
  code_lt: String
  """
  All values less than or equal the given value.
  """
  code_lte: String
  """
  All values greater than the given value.
  """
  code_gt: String
  """
  All values greater than or equal the given value.
  """
  code_gte: String
  """
  All values containing the given string.
  """
  code_contains: String
  """
  All values not containing the given string.
  """
  code_not_contains: String
  """
  All values starting with the given string.
  """
  code_starts_with: String
  """
  All values not starting with the given string.
  """
  code_not_starts_with: String
  """
  All values ending with the given string.
  """
  code_ends_with: String
  """
  All values not ending with the given string.
  """
  code_not_ends_with: String
  description: String
  """
  All values that are not equal to given value.
  """
  description_not: String
  """
  All values that are contained in given list.
  """
  description_in: [String!]
  """
  All values that are not contained in given list.
  """
  description_not_in: [String!]
  """
  All values less than the given value.
  """
  description_lt: String
  """
  All values less than or equal the given value.
  """
  description_lte: String
  """
  All values greater than the given value.
  """
  description_gt: String
  """
  All values greater than or equal the given value.
  """
  description_gte: String
  """
  All values containing the given string.
  """
  description_contains: String
  """
  All values not containing the given string.
  """
  description_not_contains: String
  """
  All values starting with the given string.
  """
  description_starts_with: String
  """
  All values not starting with the given string.
  """
  description_not_starts_with: String
  """
  All values ending with the given string.
  """
  description_ends_with: String
  """
  All values not ending with the given string.
  """
  description_not_ends_with: String
  parentKey: Partner1CWhereInput
  contactDetails_every: ContactDetailWhereInput
  contactDetails_some: ContactDetailWhereInput
  contactDetails_none: ContactDetailWhereInput
}

input Partner1CWhereUniqueInput {
  id: ID
  refKey: String
}

"""
A connection to a list of items.
"""
type UserConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  login: String!
  password: String!
  status: UserStatus
  company: CompanyCreateOneInput
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

"""
An edge in a connection.
"""
type UserEdge {
  """
  The item at the end of the edge.
  """
  node: User!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  login_ASC
  login_DESC
  password_ASC
  password_DESC
  status_ASC
  status_DESC
}

type UserPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  login: String!
  password: String!
  status: UserStatus!
}

enum UserStatus {
  ACTIVE
  DISABLED
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateDataInput {
  login: String
  password: String
  status: UserStatus
  company: CompanyUpdateOneInput
}

input UserUpdateInput {
  login: String
  password: String
  status: UserStatus
  company: CompanyUpdateOneInput
}

input UserUpdateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  login: String
  """
  All values that are not equal to given value.
  """
  login_not: String
  """
  All values that are contained in given list.
  """
  login_in: [String!]
  """
  All values that are not contained in given list.
  """
  login_not_in: [String!]
  """
  All values less than the given value.
  """
  login_lt: String
  """
  All values less than or equal the given value.
  """
  login_lte: String
  """
  All values greater than the given value.
  """
  login_gt: String
  """
  All values greater than or equal the given value.
  """
  login_gte: String
  """
  All values containing the given string.
  """
  login_contains: String
  """
  All values not containing the given string.
  """
  login_not_contains: String
  """
  All values starting with the given string.
  """
  login_starts_with: String
  """
  All values not starting with the given string.
  """
  login_not_starts_with: String
  """
  All values ending with the given string.
  """
  login_ends_with: String
  """
  All values not ending with the given string.
  """
  login_not_ends_with: String
  password: String
  """
  All values that are not equal to given value.
  """
  password_not: String
  """
  All values that are contained in given list.
  """
  password_in: [String!]
  """
  All values that are not contained in given list.
  """
  password_not_in: [String!]
  """
  All values less than the given value.
  """
  password_lt: String
  """
  All values less than or equal the given value.
  """
  password_lte: String
  """
  All values greater than the given value.
  """
  password_gt: String
  """
  All values greater than or equal the given value.
  """
  password_gte: String
  """
  All values containing the given string.
  """
  password_contains: String
  """
  All values not containing the given string.
  """
  password_not_contains: String
  """
  All values starting with the given string.
  """
  password_starts_with: String
  """
  All values not starting with the given string.
  """
  password_not_starts_with: String
  """
  All values ending with the given string.
  """
  password_ends_with: String
  """
  All values not ending with the given string.
  """
  password_not_ends_with: String
  status: UserStatus
  """
  All values that are not equal to given value.
  """
  status_not: UserStatus
  """
  All values that are contained in given list.
  """
  status_in: [UserStatus!]
  """
  All values that are not contained in given list.
  """
  status_not_in: [UserStatus!]
  company: CompanyWhereInput
}

input UserWhereUniqueInput {
  id: ID
}

type Mutation {
  createNomenclature1C(data: Nomenclature1CCreateInput!): Nomenclature1C!
  createPartner1C(data: Partner1CCreateInput!): Partner1C!
  createCompany(data: CompanyCreateInput!): Company!
  createUser(data: UserCreateInput!): User!
  createContactDetail(data: ContactDetailCreateInput!): ContactDetail!
  createLead(data: LeadCreateInput!): Lead!
  createLeadState(data: LeadStateCreateInput!): LeadState!
  createColor(data: ColorCreateInput!): Color!
  createClient(data: ClientCreateInput!): Client!
  createOrder(data: OrderCreateInput!): Order!
  createOrderPositions(data: OrderPositionsCreateInput!): OrderPositions!
  createCurrency(data: CurrencyCreateInput!): Currency!
  createNomenclature(data: NomenclatureCreateInput!): Nomenclature!
  updateNomenclature1C(data: Nomenclature1CUpdateInput!, where: Nomenclature1CWhereUniqueInput!): Nomenclature1C
  updatePartner1C(data: Partner1CUpdateInput!, where: Partner1CWhereUniqueInput!): Partner1C
  updateCompany(data: CompanyUpdateInput!, where: CompanyWhereUniqueInput!): Company
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateLead(data: LeadUpdateInput!, where: LeadWhereUniqueInput!): Lead
  updateLeadState(data: LeadStateUpdateInput!, where: LeadStateWhereUniqueInput!): LeadState
  updateColor(data: ColorUpdateInput!, where: ColorWhereUniqueInput!): Color
  updateClient(data: ClientUpdateInput!, where: ClientWhereUniqueInput!): Client
  updateOrder(data: OrderUpdateInput!, where: OrderWhereUniqueInput!): Order
  updateOrderPositions(data: OrderPositionsUpdateInput!, where: OrderPositionsWhereUniqueInput!): OrderPositions
  updateCurrency(data: CurrencyUpdateInput!, where: CurrencyWhereUniqueInput!): Currency
  updateNomenclature(data: NomenclatureUpdateInput!, where: NomenclatureWhereUniqueInput!): Nomenclature
  deleteNomenclature1C(where: Nomenclature1CWhereUniqueInput!): Nomenclature1C
  deletePartner1C(where: Partner1CWhereUniqueInput!): Partner1C
  deleteCompany(where: CompanyWhereUniqueInput!): Company
  deleteUser(where: UserWhereUniqueInput!): User
  deleteLead(where: LeadWhereUniqueInput!): Lead
  deleteLeadState(where: LeadStateWhereUniqueInput!): LeadState
  deleteColor(where: ColorWhereUniqueInput!): Color
  deleteClient(where: ClientWhereUniqueInput!): Client
  deleteOrder(where: OrderWhereUniqueInput!): Order
  deleteOrderPositions(where: OrderPositionsWhereUniqueInput!): OrderPositions
  deleteCurrency(where: CurrencyWhereUniqueInput!): Currency
  deleteNomenclature(where: NomenclatureWhereUniqueInput!): Nomenclature
  upsertNomenclature1C(where: Nomenclature1CWhereUniqueInput!, create: Nomenclature1CCreateInput!, update: Nomenclature1CUpdateInput!): Nomenclature1C!
  upsertPartner1C(where: Partner1CWhereUniqueInput!, create: Partner1CCreateInput!, update: Partner1CUpdateInput!): Partner1C!
  upsertCompany(where: CompanyWhereUniqueInput!, create: CompanyCreateInput!, update: CompanyUpdateInput!): Company!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertLead(where: LeadWhereUniqueInput!, create: LeadCreateInput!, update: LeadUpdateInput!): Lead!
  upsertLeadState(where: LeadStateWhereUniqueInput!, create: LeadStateCreateInput!, update: LeadStateUpdateInput!): LeadState!
  upsertColor(where: ColorWhereUniqueInput!, create: ColorCreateInput!, update: ColorUpdateInput!): Color!
  upsertClient(where: ClientWhereUniqueInput!, create: ClientCreateInput!, update: ClientUpdateInput!): Client!
  upsertOrder(where: OrderWhereUniqueInput!, create: OrderCreateInput!, update: OrderUpdateInput!): Order!
  upsertOrderPositions(where: OrderPositionsWhereUniqueInput!, create: OrderPositionsCreateInput!, update: OrderPositionsUpdateInput!): OrderPositions!
  upsertCurrency(where: CurrencyWhereUniqueInput!, create: CurrencyCreateInput!, update: CurrencyUpdateInput!): Currency!
  upsertNomenclature(where: NomenclatureWhereUniqueInput!, create: NomenclatureCreateInput!, update: NomenclatureUpdateInput!): Nomenclature!
  updateManyNomenclature1Cs(data: Nomenclature1CUpdateInput!, where: Nomenclature1CWhereInput): BatchPayload!
  updateManyPartner1Cs(data: Partner1CUpdateInput!, where: Partner1CWhereInput): BatchPayload!
  updateManyCompanies(data: CompanyUpdateInput!, where: CompanyWhereInput): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyContactDetails(data: ContactDetailUpdateInput!, where: ContactDetailWhereInput): BatchPayload!
  updateManyLeads(data: LeadUpdateInput!, where: LeadWhereInput): BatchPayload!
  updateManyLeadStates(data: LeadStateUpdateInput!, where: LeadStateWhereInput): BatchPayload!
  updateManyColors(data: ColorUpdateInput!, where: ColorWhereInput): BatchPayload!
  updateManyClients(data: ClientUpdateInput!, where: ClientWhereInput): BatchPayload!
  updateManyOrders(data: OrderUpdateInput!, where: OrderWhereInput): BatchPayload!
  updateManyOrderPositionses(data: OrderPositionsUpdateInput!, where: OrderPositionsWhereInput): BatchPayload!
  updateManyCurrencies(data: CurrencyUpdateInput!, where: CurrencyWhereInput): BatchPayload!
  updateManyNomenclatures(data: NomenclatureUpdateInput!, where: NomenclatureWhereInput): BatchPayload!
  deleteManyNomenclature1Cs(where: Nomenclature1CWhereInput): BatchPayload!
  deleteManyPartner1Cs(where: Partner1CWhereInput): BatchPayload!
  deleteManyCompanies(where: CompanyWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyContactDetails(where: ContactDetailWhereInput): BatchPayload!
  deleteManyLeads(where: LeadWhereInput): BatchPayload!
  deleteManyLeadStates(where: LeadStateWhereInput): BatchPayload!
  deleteManyColors(where: ColorWhereInput): BatchPayload!
  deleteManyClients(where: ClientWhereInput): BatchPayload!
  deleteManyOrders(where: OrderWhereInput): BatchPayload!
  deleteManyOrderPositionses(where: OrderPositionsWhereInput): BatchPayload!
  deleteManyCurrencies(where: CurrencyWhereInput): BatchPayload!
  deleteManyNomenclatures(where: NomenclatureWhereInput): BatchPayload!
}

type Query {
  nomenclature1Cs(where: Nomenclature1CWhereInput, orderBy: Nomenclature1COrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Nomenclature1C]!
  partner1Cs(where: Partner1CWhereInput, orderBy: Partner1COrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Partner1C]!
  companies(where: CompanyWhereInput, orderBy: CompanyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Company]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  contactDetails(where: ContactDetailWhereInput, orderBy: ContactDetailOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ContactDetail]!
  leads(where: LeadWhereInput, orderBy: LeadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Lead]!
  leadStates(where: LeadStateWhereInput, orderBy: LeadStateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [LeadState]!
  colors(where: ColorWhereInput, orderBy: ColorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Color]!
  clients(where: ClientWhereInput, orderBy: ClientOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Client]!
  orders(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Order]!
  orderPositionses(where: OrderPositionsWhereInput, orderBy: OrderPositionsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OrderPositions]!
  currencies(where: CurrencyWhereInput, orderBy: CurrencyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Currency]!
  nomenclatures(where: NomenclatureWhereInput, orderBy: NomenclatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Nomenclature]!
  nomenclature1C(where: Nomenclature1CWhereUniqueInput!): Nomenclature1C
  partner1C(where: Partner1CWhereUniqueInput!): Partner1C
  company(where: CompanyWhereUniqueInput!): Company
  user(where: UserWhereUniqueInput!): User
  lead(where: LeadWhereUniqueInput!): Lead
  leadState(where: LeadStateWhereUniqueInput!): LeadState
  color(where: ColorWhereUniqueInput!): Color
  client(where: ClientWhereUniqueInput!): Client
  order(where: OrderWhereUniqueInput!): Order
  orderPositions(where: OrderPositionsWhereUniqueInput!): OrderPositions
  currency(where: CurrencyWhereUniqueInput!): Currency
  nomenclature(where: NomenclatureWhereUniqueInput!): Nomenclature
  nomenclature1CsConnection(where: Nomenclature1CWhereInput, orderBy: Nomenclature1COrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): Nomenclature1CConnection!
  partner1CsConnection(where: Partner1CWhereInput, orderBy: Partner1COrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): Partner1CConnection!
  companiesConnection(where: CompanyWhereInput, orderBy: CompanyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CompanyConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  contactDetailsConnection(where: ContactDetailWhereInput, orderBy: ContactDetailOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ContactDetailConnection!
  leadsConnection(where: LeadWhereInput, orderBy: LeadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): LeadConnection!
  leadStatesConnection(where: LeadStateWhereInput, orderBy: LeadStateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): LeadStateConnection!
  colorsConnection(where: ColorWhereInput, orderBy: ColorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ColorConnection!
  clientsConnection(where: ClientWhereInput, orderBy: ClientOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ClientConnection!
  ordersConnection(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OrderConnection!
  orderPositionsesConnection(where: OrderPositionsWhereInput, orderBy: OrderPositionsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OrderPositionsConnection!
  currenciesConnection(where: CurrencyWhereInput, orderBy: CurrencyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CurrencyConnection!
  nomenclaturesConnection(where: NomenclatureWhereInput, orderBy: NomenclatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): NomenclatureConnection!
  """
  Fetches an object given its ID
  """
  node("""
  The ID of an object
  """
  id: ID!): Node
}

type Subscription {
  nomenclature1C(where: Nomenclature1CSubscriptionWhereInput): Nomenclature1CSubscriptionPayload
  partner1C(where: Partner1CSubscriptionWhereInput): Partner1CSubscriptionPayload
  company(where: CompanySubscriptionWhereInput): CompanySubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  contactDetail(where: ContactDetailSubscriptionWhereInput): ContactDetailSubscriptionPayload
  lead(where: LeadSubscriptionWhereInput): LeadSubscriptionPayload
  leadState(where: LeadStateSubscriptionWhereInput): LeadStateSubscriptionPayload
  color(where: ColorSubscriptionWhereInput): ColorSubscriptionPayload
  client(where: ClientSubscriptionWhereInput): ClientSubscriptionPayload
  order(where: OrderSubscriptionWhereInput): OrderSubscriptionPayload
  orderPositions(where: OrderPositionsSubscriptionWhereInput): OrderPositionsSubscriptionPayload
  currency(where: CurrencySubscriptionWhereInput): CurrencySubscriptionPayload
  nomenclature(where: NomenclatureSubscriptionWhereInput): NomenclatureSubscriptionPayload
}
`

export type ColorOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'hexValue_ASC' |
  'hexValue_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type UserStatus = 
  'ACTIVE' |
  'DISABLED'

export type ContactDetailsKind = 
  'EMAIL' |
  'PHONE' |
  'ADDRESS'

export type NomenclatureOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'type_ASC' |
  'type_DESC' |
  'name_ASC' |
  'name_DESC' |
  'description_ASC' |
  'description_DESC'

export type Partner1COrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'refKey_ASC' |
  'refKey_DESC' |
  'deletionMark_ASC' |
  'deletionMark_DESC' |
  'isFolder_ASC' |
  'isFolder_DESC' |
  'code_ASC' |
  'code_DESC' |
  'description_ASC' |
  'description_DESC'

export type Nomenclature1COrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'refKey_ASC' |
  'refKey_DESC' |
  'deletionMark_ASC' |
  'deletionMark_DESC' |
  'isFolder_ASC' |
  'isFolder_DESC' |
  'code_ASC' |
  'code_DESC' |
  'description_ASC' |
  'description_DESC' |
  'vendorCode_ASC' |
  'vendorCode_DESC' |
  'dateOfChange_ASC' |
  'dateOfChange_DESC'

export type LeadStateOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'name_ASC' |
  'name_DESC'

export type OrderOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type CompanyOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'name_ASC' |
  'name_DESC' |
  'officialName_ASC' |
  'officialName_DESC'

export type UserOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'login_ASC' |
  'login_DESC' |
  'password_ASC' |
  'password_DESC' |
  'status_ASC' |
  'status_DESC'

export type LeadOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'description_ASC' |
  'description_DESC' |
  'note_ASC' |
  'note_DESC'

export type ContactDetailOrderByInput = 
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'kind_ASC' |
  'kind_DESC' |
  'value_ASC' |
  'value_DESC' |
  'rawValue_ASC' |
  'rawValue_DESC' |
  'id_ASC' |
  'id_DESC'

export type NomenclatureType = 
  'GOOD' |
  'SERVICE'

export type OrderPositionsOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'quantity_ASC' |
  'quantity_DESC' |
  'price_ASC' |
  'price_DESC' |
  'amount_ASC' |
  'amount_DESC'

export type CurrencyOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'code_ASC' |
  'code_DESC' |
  'name_ASC' |
  'name_DESC'

export type MutationType = 
  'CREATED' |
  'UPDATED' |
  'DELETED'

export type ClientOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'name_ASC' |
  'name_DESC'

export interface ContactDetailCreateInput {
  kind: ContactDetailsKind
  value: String
  rawValue: String
}

export interface Nomenclature1CWhereInput {
  AND?: Nomenclature1CWhereInput[] | Nomenclature1CWhereInput
  OR?: Nomenclature1CWhereInput[] | Nomenclature1CWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  refKey?: String
  refKey_not?: String
  refKey_in?: String[] | String
  refKey_not_in?: String[] | String
  refKey_lt?: String
  refKey_lte?: String
  refKey_gt?: String
  refKey_gte?: String
  refKey_contains?: String
  refKey_not_contains?: String
  refKey_starts_with?: String
  refKey_not_starts_with?: String
  refKey_ends_with?: String
  refKey_not_ends_with?: String
  deletionMark?: Boolean
  deletionMark_not?: Boolean
  isFolder?: Boolean
  isFolder_not?: Boolean
  code?: String
  code_not?: String
  code_in?: String[] | String
  code_not_in?: String[] | String
  code_lt?: String
  code_lte?: String
  code_gt?: String
  code_gte?: String
  code_contains?: String
  code_not_contains?: String
  code_starts_with?: String
  code_not_starts_with?: String
  code_ends_with?: String
  code_not_ends_with?: String
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
  vendorCode?: String
  vendorCode_not?: String
  vendorCode_in?: String[] | String
  vendorCode_not_in?: String[] | String
  vendorCode_lt?: String
  vendorCode_lte?: String
  vendorCode_gt?: String
  vendorCode_gte?: String
  vendorCode_contains?: String
  vendorCode_not_contains?: String
  vendorCode_starts_with?: String
  vendorCode_not_starts_with?: String
  vendorCode_ends_with?: String
  vendorCode_not_ends_with?: String
  dateOfChange?: DateTime
  dateOfChange_not?: DateTime
  dateOfChange_in?: DateTime[] | DateTime
  dateOfChange_not_in?: DateTime[] | DateTime
  dateOfChange_lt?: DateTime
  dateOfChange_lte?: DateTime
  dateOfChange_gt?: DateTime
  dateOfChange_gte?: DateTime
  parentKey?: Nomenclature1CWhereInput
}

export interface UserCreateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  login?: String
  login_not?: String
  login_in?: String[] | String
  login_not_in?: String[] | String
  login_lt?: String
  login_lte?: String
  login_gt?: String
  login_gte?: String
  login_contains?: String
  login_not_contains?: String
  login_starts_with?: String
  login_not_starts_with?: String
  login_ends_with?: String
  login_not_ends_with?: String
  password?: String
  password_not?: String
  password_in?: String[] | String
  password_not_in?: String[] | String
  password_lt?: String
  password_lte?: String
  password_gt?: String
  password_gte?: String
  password_contains?: String
  password_not_contains?: String
  password_starts_with?: String
  password_not_starts_with?: String
  password_ends_with?: String
  password_not_ends_with?: String
  status?: UserStatus
  status_not?: UserStatus
  status_in?: UserStatus[] | UserStatus
  status_not_in?: UserStatus[] | UserStatus
  company?: CompanyWhereInput
}

export interface ClientCreateInput {
  name: String
  manager?: UserCreateOneInput
}

export interface CompanyWhereInput {
  AND?: CompanyWhereInput[] | CompanyWhereInput
  OR?: CompanyWhereInput[] | CompanyWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  officialName?: String
  officialName_not?: String
  officialName_in?: String[] | String
  officialName_not_in?: String[] | String
  officialName_lt?: String
  officialName_lte?: String
  officialName_gt?: String
  officialName_gte?: String
  officialName_contains?: String
  officialName_not_contains?: String
  officialName_starts_with?: String
  officialName_not_starts_with?: String
  officialName_ends_with?: String
  officialName_not_ends_with?: String
}

export interface OrderCreateInput {
  client: ClientCreateOneInput
  manager?: UserCreateOneInput
  positions?: OrderPositionsCreateManyInput
}

export interface LeadWhereInput {
  AND?: LeadWhereInput[] | LeadWhereInput
  OR?: LeadWhereInput[] | LeadWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
  note?: String
  note_not?: String
  note_in?: String[] | String
  note_not_in?: String[] | String
  note_lt?: String
  note_lte?: String
  note_gt?: String
  note_gte?: String
  note_contains?: String
  note_not_contains?: String
  note_starts_with?: String
  note_not_starts_with?: String
  note_ends_with?: String
  note_not_ends_with?: String
  state?: LeadStateWhereInput
  manager?: UserWhereInput
  contactDetails_every?: ContactDetailWhereInput
  contactDetails_some?: ContactDetailWhereInput
  contactDetails_none?: ContactDetailWhereInput
}

export interface ClientCreateOneInput {
  create?: ClientCreateInput
  connect?: ClientWhereUniqueInput
}

export interface ColorWhereInput {
  AND?: ColorWhereInput[] | ColorWhereInput
  OR?: ColorWhereInput[] | ColorWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  hexValue?: String
  hexValue_not?: String
  hexValue_in?: String[] | String
  hexValue_not_in?: String[] | String
  hexValue_lt?: String
  hexValue_lte?: String
  hexValue_gt?: String
  hexValue_gte?: String
  hexValue_contains?: String
  hexValue_not_contains?: String
  hexValue_starts_with?: String
  hexValue_not_starts_with?: String
  hexValue_ends_with?: String
  hexValue_not_ends_with?: String
}

export interface ClientUpdateDataInput {
  name?: String
  manager?: UserUpdateOneInput
}

export interface Nomenclature1CUpdateInput {
  refKey?: String
  deletionMark?: Boolean
  isFolder?: Boolean
  code?: String
  description?: String
  vendorCode?: String
  dateOfChange?: DateTime
  parentKey?: Nomenclature1CUpdateOneInput
}

export interface ClientUpdateOneInput {
  create?: ClientCreateInput
  connect?: ClientWhereUniqueInput
  delete?: Boolean
  update?: ClientUpdateDataInput
  upsert?: ClientUpsertNestedInput
}

export interface OrderPositionsCreateManyInput {
  create?: OrderPositionsCreateInput[] | OrderPositionsCreateInput
  connect?: OrderPositionsWhereUniqueInput[] | OrderPositionsWhereUniqueInput
}

export interface OrderUpdateInput {
  client?: ClientUpdateOneInput
  manager?: UserUpdateOneInput
  positions?: OrderPositionsUpdateManyInput
}

export interface CurrencySubscriptionWhereInput {
  AND?: CurrencySubscriptionWhereInput[] | CurrencySubscriptionWhereInput
  OR?: CurrencySubscriptionWhereInput[] | CurrencySubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: CurrencyWhereInput
}

export interface ClientUpdateInput {
  name?: String
  manager?: UserUpdateOneInput
}

export interface ClientWhereInput {
  AND?: ClientWhereInput[] | ClientWhereInput
  OR?: ClientWhereInput[] | ClientWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  manager?: UserWhereInput
}

export interface ColorUpdateInput {
  hexValue?: String
}

export interface OrderPositionsSubscriptionWhereInput {
  AND?: OrderPositionsSubscriptionWhereInput[] | OrderPositionsSubscriptionWhereInput
  OR?: OrderPositionsSubscriptionWhereInput[] | OrderPositionsSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: OrderPositionsWhereInput
}

export interface LeadStateUpdateInput {
  name?: String
  color?: ColorUpdateOneInput
}

export interface OrderPositionsWhereInput {
  AND?: OrderPositionsWhereInput[] | OrderPositionsWhereInput
  OR?: OrderPositionsWhereInput[] | OrderPositionsWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  quantity?: Float
  quantity_not?: Float
  quantity_in?: Float[] | Float
  quantity_not_in?: Float[] | Float
  quantity_lt?: Float
  quantity_lte?: Float
  quantity_gt?: Float
  quantity_gte?: Float
  price?: Float
  price_not?: Float
  price_in?: Float[] | Float
  price_not_in?: Float[] | Float
  price_lt?: Float
  price_lte?: Float
  price_gt?: Float
  price_gte?: Float
  amount?: Float
  amount_not?: Float
  amount_in?: Float[] | Float
  amount_not_in?: Float[] | Float
  amount_lt?: Float
  amount_lte?: Float
  amount_gt?: Float
  amount_gte?: Float
  nomenclature?: NomenclatureWhereInput
  currency?: CurrencyWhereInput
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface NomenclatureWhereInput {
  AND?: NomenclatureWhereInput[] | NomenclatureWhereInput
  OR?: NomenclatureWhereInput[] | NomenclatureWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  type?: NomenclatureType
  type_not?: NomenclatureType
  type_in?: NomenclatureType[] | NomenclatureType
  type_not_in?: NomenclatureType[] | NomenclatureType
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
}

export interface UserUpdateDataInput {
  login?: String
  password?: String
  status?: UserStatus
  company?: CompanyUpdateOneInput
}

export interface CurrencyWhereInput {
  AND?: CurrencyWhereInput[] | CurrencyWhereInput
  OR?: CurrencyWhereInput[] | CurrencyWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  code?: String
  code_not?: String
  code_in?: String[] | String
  code_not_in?: String[] | String
  code_lt?: String
  code_lte?: String
  code_gt?: String
  code_gte?: String
  code_contains?: String
  code_not_contains?: String
  code_starts_with?: String
  code_not_starts_with?: String
  code_ends_with?: String
  code_not_ends_with?: String
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
}

export interface UserUpdateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
  delete?: Boolean
  update?: UserUpdateDataInput
  upsert?: UserUpsertNestedInput
}

export interface ColorSubscriptionWhereInput {
  AND?: ColorSubscriptionWhereInput[] | ColorSubscriptionWhereInput
  OR?: ColorSubscriptionWhereInput[] | ColorSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ColorWhereInput
}

export interface LeadStateUpsertNestedInput {
  update: LeadStateUpdateDataInput
  create: LeadStateCreateInput
}

export interface LeadSubscriptionWhereInput {
  AND?: LeadSubscriptionWhereInput[] | LeadSubscriptionWhereInput
  OR?: LeadSubscriptionWhereInput[] | LeadSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: LeadWhereInput
}

export interface ColorUpsertNestedInput {
  update: ColorUpdateDataInput
  create: ColorCreateInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface ColorUpdateDataInput {
  hexValue?: String
}

export interface Partner1CSubscriptionWhereInput {
  AND?: Partner1CSubscriptionWhereInput[] | Partner1CSubscriptionWhereInput
  OR?: Partner1CSubscriptionWhereInput[] | Partner1CSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: Partner1CWhereInput
}

export interface ColorUpdateOneInput {
  create?: ColorCreateInput
  connect?: ColorWhereUniqueInput
  delete?: Boolean
  update?: ColorUpdateDataInput
  upsert?: ColorUpsertNestedInput
}

export interface Partner1CWhereUniqueInput {
  id?: ID_Input
  refKey?: String
}

export interface LeadStateUpdateDataInput {
  name?: String
  color?: ColorUpdateOneInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
}

export interface LeadStateUpdateOneInput {
  create?: LeadStateCreateInput
  connect?: LeadStateWhereUniqueInput
  delete?: Boolean
  update?: LeadStateUpdateDataInput
  upsert?: LeadStateUpsertNestedInput
}

export interface LeadStateWhereUniqueInput {
  id?: ID_Input
}

export interface LeadUpdateInput {
  description?: String
  note?: String
  state?: LeadStateUpdateOneInput
  manager?: UserUpdateOneInput
  contactDetails?: ContactDetailUpdateManyInput
}

export interface ClientWhereUniqueInput {
  id?: ID_Input
}

export interface CompanyUpsertNestedInput {
  update: CompanyUpdateDataInput
  create: CompanyCreateInput
}

export interface OrderPositionsWhereUniqueInput {
  id?: ID_Input
}

export interface CompanyUpdateDataInput {
  name?: String
  officialName?: String
}

export interface NomenclatureWhereUniqueInput {
  id?: ID_Input
}

export interface CompanyUpdateOneInput {
  create?: CompanyCreateInput
  connect?: CompanyWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: CompanyUpdateDataInput
  upsert?: CompanyUpsertNestedInput
}

export interface ContactDetailUpdateInput {
  kind?: ContactDetailsKind
  value?: String
  rawValue?: String
}

export interface UserUpdateInput {
  login?: String
  password?: String
  status?: UserStatus
  company?: CompanyUpdateOneInput
}

export interface CurrencyUpdateInput {
  code?: String
  name?: String
}

export interface CompanyUpdateInput {
  name?: String
  officialName?: String
}

export interface OrderPositionsUpsertWithWhereUniqueNestedInput {
  where: OrderPositionsWhereUniqueInput
  update: OrderPositionsUpdateDataInput
  create: OrderPositionsCreateInput
}

export interface Partner1CUpsertNestedInput {
  update: Partner1CUpdateDataInput
  create: Partner1CCreateInput
}

export interface CurrencyUpdateDataInput {
  code?: String
  name?: String
}

export interface ContactDetailUpdateManyInput {
  create?: ContactDetailCreateInput[] | ContactDetailCreateInput
}

export interface NomenclatureUpsertNestedInput {
  update: NomenclatureUpdateDataInput
  create: NomenclatureCreateInput
}

export interface Partner1CUpdateDataInput {
  refKey?: String
  deletionMark?: Boolean
  isFolder?: Boolean
  code?: String
  description?: String
  parentKey?: Partner1CUpdateOneInput
  contactDetails?: ContactDetailUpdateManyInput
}

export interface NomenclatureUpdateOneInput {
  create?: NomenclatureCreateInput
  connect?: NomenclatureWhereUniqueInput
  delete?: Boolean
  update?: NomenclatureUpdateDataInput
  upsert?: NomenclatureUpsertNestedInput
}

export interface Nomenclature1CCreateInput {
  refKey: String
  deletionMark?: Boolean
  isFolder?: Boolean
  code: String
  description: String
  vendorCode?: String
  dateOfChange?: DateTime
  parentKey?: Nomenclature1CCreateOneInput
}

export interface OrderPositionsUpdateWithWhereUniqueNestedInput {
  where: OrderPositionsWhereUniqueInput
  data: OrderPositionsUpdateDataInput
}

export interface Nomenclature1CCreateOneInput {
  create?: Nomenclature1CCreateInput
  connect?: Nomenclature1CWhereUniqueInput
}

export interface ClientUpsertNestedInput {
  update: ClientUpdateDataInput
  create: ClientCreateInput
}

export interface Partner1CCreateInput {
  refKey: String
  deletionMark?: Boolean
  isFolder?: Boolean
  code: String
  description: String
  parentKey?: Partner1CCreateOneInput
  contactDetails?: ContactDetailCreateManyInput
}

export interface ContactDetailWhereInput {
  AND?: ContactDetailWhereInput[] | ContactDetailWhereInput
  OR?: ContactDetailWhereInput[] | ContactDetailWhereInput
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  kind?: ContactDetailsKind
  kind_not?: ContactDetailsKind
  kind_in?: ContactDetailsKind[] | ContactDetailsKind
  kind_not_in?: ContactDetailsKind[] | ContactDetailsKind
  value?: String
  value_not?: String
  value_in?: String[] | String
  value_not_in?: String[] | String
  value_lt?: String
  value_lte?: String
  value_gt?: String
  value_gte?: String
  value_contains?: String
  value_not_contains?: String
  value_starts_with?: String
  value_not_starts_with?: String
  value_ends_with?: String
  value_not_ends_with?: String
  rawValue?: String
  rawValue_not?: String
  rawValue_in?: String[] | String
  rawValue_not_in?: String[] | String
  rawValue_lt?: String
  rawValue_lte?: String
  rawValue_gt?: String
  rawValue_gte?: String
  rawValue_contains?: String
  rawValue_not_contains?: String
  rawValue_starts_with?: String
  rawValue_not_starts_with?: String
  rawValue_ends_with?: String
  rawValue_not_ends_with?: String
}

export interface Partner1CCreateOneInput {
  create?: Partner1CCreateInput
  connect?: Partner1CWhereUniqueInput
}

export interface OrderWhereInput {
  AND?: OrderWhereInput[] | OrderWhereInput
  OR?: OrderWhereInput[] | OrderWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  client?: ClientWhereInput
  manager?: UserWhereInput
  positions_every?: OrderPositionsWhereInput
  positions_some?: OrderPositionsWhereInput
  positions_none?: OrderPositionsWhereInput
}

export interface ContactDetailCreateManyInput {
  create?: ContactDetailCreateInput[] | ContactDetailCreateInput
}

export interface LeadStateSubscriptionWhereInput {
  AND?: LeadStateSubscriptionWhereInput[] | LeadStateSubscriptionWhereInput
  OR?: LeadStateSubscriptionWhereInput[] | LeadStateSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: LeadStateWhereInput
}

export interface Partner1CUpdateOneInput {
  create?: Partner1CCreateInput
  connect?: Partner1CWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: Partner1CUpdateDataInput
  upsert?: Partner1CUpsertNestedInput
}

export interface CompanySubscriptionWhereInput {
  AND?: CompanySubscriptionWhereInput[] | CompanySubscriptionWhereInput
  OR?: CompanySubscriptionWhereInput[] | CompanySubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: CompanyWhereInput
}

export interface CompanyCreateInput {
  name: String
  officialName: String
}

export interface CompanyWhereUniqueInput {
  id?: ID_Input
}

export interface UserCreateInput {
  login: String
  password: String
  status?: UserStatus
  company?: CompanyCreateOneInput
}

export interface ColorWhereUniqueInput {
  id?: ID_Input
}

export interface CompanyCreateOneInput {
  create?: CompanyCreateInput
  connect?: CompanyWhereUniqueInput
}

export interface CurrencyWhereUniqueInput {
  id?: ID_Input
}

export interface LeadCreateInput {
  description: String
  note?: String
  state: LeadStateCreateOneInput
  manager: UserCreateOneInput
  contactDetails?: ContactDetailCreateManyInput
}

export interface NomenclatureUpdateInput {
  type?: NomenclatureType
  name?: String
  description?: String
}

export interface LeadStateCreateOneInput {
  create?: LeadStateCreateInput
  connect?: LeadStateWhereUniqueInput
}

export interface CurrencyUpsertNestedInput {
  update: CurrencyUpdateDataInput
  create: CurrencyCreateInput
}

export interface LeadStateCreateInput {
  name: String
  color: ColorCreateOneInput
}

export interface NomenclatureUpdateDataInput {
  type?: NomenclatureType
  name?: String
  description?: String
}

export interface ColorCreateOneInput {
  create?: ColorCreateInput
  connect?: ColorWhereUniqueInput
}

export interface OrderPositionsUpdateManyInput {
  create?: OrderPositionsCreateInput[] | OrderPositionsCreateInput
  connect?: OrderPositionsWhereUniqueInput[] | OrderPositionsWhereUniqueInput
  disconnect?: OrderPositionsWhereUniqueInput[] | OrderPositionsWhereUniqueInput
  delete?: OrderPositionsWhereUniqueInput[] | OrderPositionsWhereUniqueInput
  update?: OrderPositionsUpdateWithWhereUniqueNestedInput[] | OrderPositionsUpdateWithWhereUniqueNestedInput
  upsert?: OrderPositionsUpsertWithWhereUniqueNestedInput[] | OrderPositionsUpsertWithWhereUniqueNestedInput
}

export interface ColorCreateInput {
  hexValue: String
}

export interface Partner1CWhereInput {
  AND?: Partner1CWhereInput[] | Partner1CWhereInput
  OR?: Partner1CWhereInput[] | Partner1CWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  refKey?: String
  refKey_not?: String
  refKey_in?: String[] | String
  refKey_not_in?: String[] | String
  refKey_lt?: String
  refKey_lte?: String
  refKey_gt?: String
  refKey_gte?: String
  refKey_contains?: String
  refKey_not_contains?: String
  refKey_starts_with?: String
  refKey_not_starts_with?: String
  refKey_ends_with?: String
  refKey_not_ends_with?: String
  deletionMark?: Boolean
  deletionMark_not?: Boolean
  isFolder?: Boolean
  isFolder_not?: Boolean
  code?: String
  code_not?: String
  code_in?: String[] | String
  code_not_in?: String[] | String
  code_lt?: String
  code_lte?: String
  code_gt?: String
  code_gte?: String
  code_contains?: String
  code_not_contains?: String
  code_starts_with?: String
  code_not_starts_with?: String
  code_ends_with?: String
  code_not_ends_with?: String
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
  parentKey?: Partner1CWhereInput
  contactDetails_every?: ContactDetailWhereInput
  contactDetails_some?: ContactDetailWhereInput
  contactDetails_none?: ContactDetailWhereInput
}

export interface Partner1CUpdateInput {
  refKey?: String
  deletionMark?: Boolean
  isFolder?: Boolean
  code?: String
  description?: String
  parentKey?: Partner1CUpdateOneInput
  contactDetails?: ContactDetailUpdateManyInput
}

export interface ClientSubscriptionWhereInput {
  AND?: ClientSubscriptionWhereInput[] | ClientSubscriptionWhereInput
  OR?: ClientSubscriptionWhereInput[] | ClientSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ClientWhereInput
}

export interface Nomenclature1CUpsertNestedInput {
  update: Nomenclature1CUpdateDataInput
  create: Nomenclature1CCreateInput
}

export interface Nomenclature1CWhereUniqueInput {
  id?: ID_Input
  refKey?: String
}

export interface LeadStateWhereInput {
  AND?: LeadStateWhereInput[] | LeadStateWhereInput
  OR?: LeadStateWhereInput[] | LeadStateWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  color?: ColorWhereInput
}

export interface OrderWhereUniqueInput {
  id?: ID_Input
}

export interface Nomenclature1CUpdateDataInput {
  refKey?: String
  deletionMark?: Boolean
  isFolder?: Boolean
  code?: String
  description?: String
  vendorCode?: String
  dateOfChange?: DateTime
  parentKey?: Nomenclature1CUpdateOneInput
}

export interface OrderPositionsUpdateInput {
  quantity?: Float
  price?: Float
  amount?: Float
  nomenclature?: NomenclatureUpdateOneInput
  currency?: CurrencyUpdateOneInput
}

export interface Nomenclature1CUpdateOneInput {
  create?: Nomenclature1CCreateInput
  connect?: Nomenclature1CWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: Nomenclature1CUpdateDataInput
  upsert?: Nomenclature1CUpsertNestedInput
}

export interface OrderPositionsUpdateDataInput {
  quantity?: Float
  price?: Float
  amount?: Float
  nomenclature?: NomenclatureUpdateOneInput
  currency?: CurrencyUpdateOneInput
}

export interface OrderPositionsCreateInput {
  quantity: Float
  price: Float
  amount: Float
  nomenclature: NomenclatureCreateOneInput
  currency: CurrencyCreateOneInput
}

export interface OrderSubscriptionWhereInput {
  AND?: OrderSubscriptionWhereInput[] | OrderSubscriptionWhereInput
  OR?: OrderSubscriptionWhereInput[] | OrderSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: OrderWhereInput
}

export interface CurrencyCreateInput {
  code: String
  name: String
}

export interface CurrencyCreateOneInput {
  create?: CurrencyCreateInput
  connect?: CurrencyWhereUniqueInput
}

export interface NomenclatureCreateInput {
  type?: NomenclatureType
  name: String
  description: String
}

export interface NomenclatureCreateOneInput {
  create?: NomenclatureCreateInput
  connect?: NomenclatureWhereUniqueInput
}

export interface ContactDetailSubscriptionWhereInput {
  AND?: ContactDetailSubscriptionWhereInput[] | ContactDetailSubscriptionWhereInput
  OR?: ContactDetailSubscriptionWhereInput[] | ContactDetailSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ContactDetailWhereInput
}

export interface NomenclatureSubscriptionWhereInput {
  AND?: NomenclatureSubscriptionWhereInput[] | NomenclatureSubscriptionWhereInput
  OR?: NomenclatureSubscriptionWhereInput[] | NomenclatureSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: NomenclatureWhereInput
}

export interface CurrencyUpdateOneInput {
  create?: CurrencyCreateInput
  connect?: CurrencyWhereUniqueInput
  delete?: Boolean
  update?: CurrencyUpdateDataInput
  upsert?: CurrencyUpsertNestedInput
}

export interface Nomenclature1CSubscriptionWhereInput {
  AND?: Nomenclature1CSubscriptionWhereInput[] | Nomenclature1CSubscriptionWhereInput
  OR?: Nomenclature1CSubscriptionWhereInput[] | Nomenclature1CSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: Nomenclature1CWhereInput
}

export interface LeadWhereUniqueInput {
  id?: ID_Input
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface NomenclaturePreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  type: NomenclatureType
  name: String
  description: String
}

export interface BatchPayload {
  count: Long
}

export interface Lead extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  description: String
  state: LeadState
  note: String
  manager: User
  contactDetails?: ContactDetail[]
}

export interface LeadState extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  name: String
  color: Color
}

export interface User extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  login: String
  password: String
  company?: Company
  status: UserStatus
}

/*
 * An edge in a connection.

 */
export interface Nomenclature1CEdge {
  node: Nomenclature1C
  cursor: String
}

export interface OrderPositionsPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  quantity: Float
  price: Float
  amount: Float
}

export interface ContactDetail {
  createdAt: DateTime
  updatedAt: DateTime
  kind: ContactDetailsKind
  value: String
  rawValue: String
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface Company extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  name: String
  officialName: String
}

/*
 * A connection to a list of items.

 */
export interface NomenclatureConnection {
  pageInfo: PageInfo
  edges: NomenclatureEdge[]
  aggregate: AggregateNomenclature
}

export interface AggregateNomenclature {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface CurrencyEdge {
  node: Currency
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface Nomenclature1CConnection {
  pageInfo: PageInfo
  edges: Nomenclature1CEdge[]
  aggregate: AggregateNomenclature1C
}

export interface AggregateOrderPositions {
  count: Int
}

export interface NomenclatureSubscriptionPayload {
  mutation: MutationType
  node?: Nomenclature
  updatedFields?: String[]
  previousValues?: NomenclaturePreviousValues
}

/*
 * A connection to a list of items.

 */
export interface OrderPositionsConnection {
  pageInfo: PageInfo
  edges: OrderPositionsEdge[]
  aggregate: AggregateOrderPositions
}

export interface Nomenclature1CSubscriptionPayload {
  mutation: MutationType
  node?: Nomenclature1C
  updatedFields?: String[]
  previousValues?: Nomenclature1CPreviousValues
}

/*
 * An edge in a connection.

 */
export interface OrderEdge {
  node: Order
  cursor: String
}

export interface Nomenclature1CPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  refKey: String
  deletionMark: Boolean
  isFolder: Boolean
  code: String
  description: String
  vendorCode?: String
  dateOfChange?: DateTime
}

export interface AggregateClient {
  count: Int
}

export interface Color extends Node {
  id: ID_Output
  hexValue: String
}

/*
 * A connection to a list of items.

 */
export interface ClientConnection {
  pageInfo: PageInfo
  edges: ClientEdge[]
  aggregate: AggregateClient
}

export interface Partner1CSubscriptionPayload {
  mutation: MutationType
  node?: Partner1C
  updatedFields?: String[]
  previousValues?: Partner1CPreviousValues
}

/*
 * An edge in a connection.

 */
export interface ColorEdge {
  node: Color
  cursor: String
}

export interface Partner1CPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  refKey: String
  deletionMark: Boolean
  isFolder: Boolean
  code: String
  description: String
}

export interface AggregateLeadState {
  count: Int
}

export interface CurrencyPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  code: String
  name: String
}

/*
 * A connection to a list of items.

 */
export interface LeadStateConnection {
  pageInfo: PageInfo
  edges: LeadStateEdge[]
  aggregate: AggregateLeadState
}

export interface CompanySubscriptionPayload {
  mutation: MutationType
  node?: Company
  updatedFields?: String[]
  previousValues?: CompanyPreviousValues
}

/*
 * An edge in a connection.

 */
export interface LeadEdge {
  node: Lead
  cursor: String
}

export interface CompanyPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  name: String
  officialName: String
}

export interface AggregateContactDetail {
  count: Int
}

export interface Currency extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  code: String
  name: String
}

/*
 * A connection to a list of items.

 */
export interface ContactDetailConnection {
  pageInfo: PageInfo
  edges: ContactDetailEdge[]
  aggregate: AggregateContactDetail
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

export interface UserPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  login: String
  password: String
  status: UserStatus
}

export interface AggregateCompany {
  count: Int
}

export interface Nomenclature extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  type: NomenclatureType
  name: String
  description: String
}

/*
 * A connection to a list of items.

 */
export interface CompanyConnection {
  pageInfo: PageInfo
  edges: CompanyEdge[]
  aggregate: AggregateCompany
}

export interface ContactDetailSubscriptionPayload {
  mutation: MutationType
  node?: ContactDetail
  updatedFields?: String[]
  previousValues?: ContactDetailPreviousValues
}

/*
 * An edge in a connection.

 */
export interface Partner1CEdge {
  node: Partner1C
  cursor: String
}

export interface ContactDetailPreviousValues {
  createdAt: DateTime
  updatedAt: DateTime
  kind: ContactDetailsKind
  value: String
  rawValue: String
}

export interface AggregateNomenclature1C {
  count: Int
}

export interface OrderPositions extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  nomenclature: Nomenclature
  quantity: Float
  price: Float
  amount: Float
  currency: Currency
}

export interface AggregateCurrency {
  count: Int
}

export interface LeadSubscriptionPayload {
  mutation: MutationType
  node?: Lead
  updatedFields?: String[]
  previousValues?: LeadPreviousValues
}

/*
 * An edge in a connection.

 */
export interface OrderPositionsEdge {
  node: OrderPositions
  cursor: String
}

export interface LeadPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  description: String
  note: String
}

/*
 * A connection to a list of items.

 */
export interface OrderConnection {
  pageInfo: PageInfo
  edges: OrderEdge[]
  aggregate: AggregateOrder
}

export interface CurrencySubscriptionPayload {
  mutation: MutationType
  node?: Currency
  updatedFields?: String[]
  previousValues?: CurrencyPreviousValues
}

export interface AggregateColor {
  count: Int
}

export interface LeadStateSubscriptionPayload {
  mutation: MutationType
  node?: LeadState
  updatedFields?: String[]
  previousValues?: LeadStatePreviousValues
}

/*
 * An edge in a connection.

 */
export interface LeadStateEdge {
  node: LeadState
  cursor: String
}

export interface LeadStatePreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  name: String
}

/*
 * A connection to a list of items.

 */
export interface LeadConnection {
  pageInfo: PageInfo
  edges: LeadEdge[]
  aggregate: AggregateLead
}

export interface Order extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  client: Client
  manager?: User
  positions?: OrderPositions[]
}

export interface AggregateUser {
  count: Int
}

export interface ColorSubscriptionPayload {
  mutation: MutationType
  node?: Color
  updatedFields?: String[]
  previousValues?: ColorPreviousValues
}

/*
 * An edge in a connection.

 */
export interface CompanyEdge {
  node: Company
  cursor: String
}

export interface ColorPreviousValues {
  id: ID_Output
  hexValue: String
}

/*
 * A connection to a list of items.

 */
export interface Partner1CConnection {
  pageInfo: PageInfo
  edges: Partner1CEdge[]
  aggregate: AggregatePartner1C
}

export interface Nomenclature1C extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  refKey: String
  deletionMark: Boolean
  parentKey?: Nomenclature1C
  isFolder: Boolean
  code: String
  description: String
  vendorCode?: String
  dateOfChange?: DateTime
}

/*
 * A connection to a list of items.

 */
export interface CurrencyConnection {
  pageInfo: PageInfo
  edges: CurrencyEdge[]
  aggregate: AggregateCurrency
}

export interface ClientSubscriptionPayload {
  mutation: MutationType
  node?: Client
  updatedFields?: String[]
  previousValues?: ClientPreviousValues
}

/*
 * An edge in a connection.

 */
export interface ClientEdge {
  node: Client
  cursor: String
}

export interface ClientPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  name: String
}

export interface AggregateLead {
  count: Int
}

export interface Partner1C extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  refKey: String
  deletionMark: Boolean
  parentKey?: Partner1C
  isFolder: Boolean
  code: String
  description: String
  contactDetails?: ContactDetail[]
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

/*
 * An edge in a connection.

 */
export interface NomenclatureEdge {
  node: Nomenclature
  cursor: String
}

export interface OrderPositionsSubscriptionPayload {
  mutation: MutationType
  node?: OrderPositions
  updatedFields?: String[]
  previousValues?: OrderPositionsPreviousValues
}

export interface Client extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  name: String
  manager?: User
}

export interface OrderPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
}

export interface OrderSubscriptionPayload {
  mutation: MutationType
  node?: Order
  updatedFields?: String[]
  previousValues?: OrderPreviousValues
}

export interface AggregateOrder {
  count: Int
}

export interface AggregatePartner1C {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface ContactDetailEdge {
  node: ContactDetail
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface ColorConnection {
  pageInfo: PageInfo
  edges: ColorEdge[]
  aggregate: AggregateColor
}

/*
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

export type DateTime = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). 
*/
export type Float = number

export interface Schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type Query = {
  nomenclature1Cs: (args: { where?: Nomenclature1CWhereInput, orderBy?: Nomenclature1COrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Nomenclature1C[]>
  partner1Cs: (args: { where?: Partner1CWhereInput, orderBy?: Partner1COrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Partner1C[]>
  companies: (args: { where?: CompanyWhereInput, orderBy?: CompanyOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Company[]>
  users: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<User[]>
  contactDetails: (args: { where?: ContactDetailWhereInput, orderBy?: ContactDetailOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ContactDetail[]>
  leads: (args: { where?: LeadWhereInput, orderBy?: LeadOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Lead[]>
  leadStates: (args: { where?: LeadStateWhereInput, orderBy?: LeadStateOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<LeadState[]>
  colors: (args: { where?: ColorWhereInput, orderBy?: ColorOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Color[]>
  clients: (args: { where?: ClientWhereInput, orderBy?: ClientOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Client[]>
  orders: (args: { where?: OrderWhereInput, orderBy?: OrderOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Order[]>
  orderPositionses: (args: { where?: OrderPositionsWhereInput, orderBy?: OrderPositionsOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<OrderPositions[]>
  currencies: (args: { where?: CurrencyWhereInput, orderBy?: CurrencyOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Currency[]>
  nomenclatures: (args: { where?: NomenclatureWhereInput, orderBy?: NomenclatureOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Nomenclature[]>
  nomenclature1C: (args: { where: Nomenclature1CWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Nomenclature1C | null>
  partner1C: (args: { where: Partner1CWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Partner1C | null>
  company: (args: { where: CompanyWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Company | null>
  user: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  lead: (args: { where: LeadWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Lead | null>
  leadState: (args: { where: LeadStateWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<LeadState | null>
  color: (args: { where: ColorWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Color | null>
  client: (args: { where: ClientWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Client | null>
  order: (args: { where: OrderWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Order | null>
  orderPositions: (args: { where: OrderPositionsWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<OrderPositions | null>
  currency: (args: { where: CurrencyWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Currency | null>
  nomenclature: (args: { where: NomenclatureWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Nomenclature | null>
  nomenclature1CsConnection: (args: { where?: Nomenclature1CWhereInput, orderBy?: Nomenclature1COrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Nomenclature1CConnection>
  partner1CsConnection: (args: { where?: Partner1CWhereInput, orderBy?: Partner1COrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Partner1CConnection>
  companiesConnection: (args: { where?: CompanyWhereInput, orderBy?: CompanyOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<CompanyConnection>
  usersConnection: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<UserConnection>
  contactDetailsConnection: (args: { where?: ContactDetailWhereInput, orderBy?: ContactDetailOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ContactDetailConnection>
  leadsConnection: (args: { where?: LeadWhereInput, orderBy?: LeadOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<LeadConnection>
  leadStatesConnection: (args: { where?: LeadStateWhereInput, orderBy?: LeadStateOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<LeadStateConnection>
  colorsConnection: (args: { where?: ColorWhereInput, orderBy?: ColorOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ColorConnection>
  clientsConnection: (args: { where?: ClientWhereInput, orderBy?: ClientOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ClientConnection>
  ordersConnection: (args: { where?: OrderWhereInput, orderBy?: OrderOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<OrderConnection>
  orderPositionsesConnection: (args: { where?: OrderPositionsWhereInput, orderBy?: OrderPositionsOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<OrderPositionsConnection>
  currenciesConnection: (args: { where?: CurrencyWhereInput, orderBy?: CurrencyOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<CurrencyConnection>
  nomenclaturesConnection: (args: { where?: NomenclatureWhereInput, orderBy?: NomenclatureOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<NomenclatureConnection>
  node: (args: { id: ID_Output }, info?: GraphQLResolveInfo | string) => Promise<Node | null>
}

export type Mutation = {
  createNomenclature1C: (args: { data: Nomenclature1CCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Nomenclature1C>
  createPartner1C: (args: { data: Partner1CCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Partner1C>
  createCompany: (args: { data: CompanyCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Company>
  createUser: (args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  createContactDetail: (args: { data: ContactDetailCreateInput }, info?: GraphQLResolveInfo | string) => Promise<ContactDetail>
  createLead: (args: { data: LeadCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Lead>
  createLeadState: (args: { data: LeadStateCreateInput }, info?: GraphQLResolveInfo | string) => Promise<LeadState>
  createColor: (args: { data: ColorCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Color>
  createClient: (args: { data: ClientCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Client>
  createOrder: (args: { data: OrderCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Order>
  createOrderPositions: (args: { data: OrderPositionsCreateInput }, info?: GraphQLResolveInfo | string) => Promise<OrderPositions>
  createCurrency: (args: { data: CurrencyCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Currency>
  createNomenclature: (args: { data: NomenclatureCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Nomenclature>
  updateNomenclature1C: (args: { data: Nomenclature1CUpdateInput, where: Nomenclature1CWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Nomenclature1C | null>
  updatePartner1C: (args: { data: Partner1CUpdateInput, where: Partner1CWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Partner1C | null>
  updateCompany: (args: { data: CompanyUpdateInput, where: CompanyWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Company | null>
  updateUser: (args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  updateLead: (args: { data: LeadUpdateInput, where: LeadWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Lead | null>
  updateLeadState: (args: { data: LeadStateUpdateInput, where: LeadStateWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<LeadState | null>
  updateColor: (args: { data: ColorUpdateInput, where: ColorWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Color | null>
  updateClient: (args: { data: ClientUpdateInput, where: ClientWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Client | null>
  updateOrder: (args: { data: OrderUpdateInput, where: OrderWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Order | null>
  updateOrderPositions: (args: { data: OrderPositionsUpdateInput, where: OrderPositionsWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<OrderPositions | null>
  updateCurrency: (args: { data: CurrencyUpdateInput, where: CurrencyWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Currency | null>
  updateNomenclature: (args: { data: NomenclatureUpdateInput, where: NomenclatureWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Nomenclature | null>
  deleteNomenclature1C: (args: { where: Nomenclature1CWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Nomenclature1C | null>
  deletePartner1C: (args: { where: Partner1CWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Partner1C | null>
  deleteCompany: (args: { where: CompanyWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Company | null>
  deleteUser: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  deleteLead: (args: { where: LeadWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Lead | null>
  deleteLeadState: (args: { where: LeadStateWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<LeadState | null>
  deleteColor: (args: { where: ColorWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Color | null>
  deleteClient: (args: { where: ClientWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Client | null>
  deleteOrder: (args: { where: OrderWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Order | null>
  deleteOrderPositions: (args: { where: OrderPositionsWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<OrderPositions | null>
  deleteCurrency: (args: { where: CurrencyWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Currency | null>
  deleteNomenclature: (args: { where: NomenclatureWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Nomenclature | null>
  upsertNomenclature1C: (args: { where: Nomenclature1CWhereUniqueInput, create: Nomenclature1CCreateInput, update: Nomenclature1CUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Nomenclature1C>
  upsertPartner1C: (args: { where: Partner1CWhereUniqueInput, create: Partner1CCreateInput, update: Partner1CUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Partner1C>
  upsertCompany: (args: { where: CompanyWhereUniqueInput, create: CompanyCreateInput, update: CompanyUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Company>
  upsertUser: (args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  upsertLead: (args: { where: LeadWhereUniqueInput, create: LeadCreateInput, update: LeadUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Lead>
  upsertLeadState: (args: { where: LeadStateWhereUniqueInput, create: LeadStateCreateInput, update: LeadStateUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<LeadState>
  upsertColor: (args: { where: ColorWhereUniqueInput, create: ColorCreateInput, update: ColorUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Color>
  upsertClient: (args: { where: ClientWhereUniqueInput, create: ClientCreateInput, update: ClientUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Client>
  upsertOrder: (args: { where: OrderWhereUniqueInput, create: OrderCreateInput, update: OrderUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Order>
  upsertOrderPositions: (args: { where: OrderPositionsWhereUniqueInput, create: OrderPositionsCreateInput, update: OrderPositionsUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<OrderPositions>
  upsertCurrency: (args: { where: CurrencyWhereUniqueInput, create: CurrencyCreateInput, update: CurrencyUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Currency>
  upsertNomenclature: (args: { where: NomenclatureWhereUniqueInput, create: NomenclatureCreateInput, update: NomenclatureUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Nomenclature>
  updateManyNomenclature1Cs: (args: { data: Nomenclature1CUpdateInput, where?: Nomenclature1CWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyPartner1Cs: (args: { data: Partner1CUpdateInput, where?: Partner1CWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyCompanies: (args: { data: CompanyUpdateInput, where?: CompanyWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyUsers: (args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyContactDetails: (args: { data: ContactDetailUpdateInput, where?: ContactDetailWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyLeads: (args: { data: LeadUpdateInput, where?: LeadWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyLeadStates: (args: { data: LeadStateUpdateInput, where?: LeadStateWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyColors: (args: { data: ColorUpdateInput, where?: ColorWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyClients: (args: { data: ClientUpdateInput, where?: ClientWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyOrders: (args: { data: OrderUpdateInput, where?: OrderWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyOrderPositionses: (args: { data: OrderPositionsUpdateInput, where?: OrderPositionsWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyCurrencies: (args: { data: CurrencyUpdateInput, where?: CurrencyWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyNomenclatures: (args: { data: NomenclatureUpdateInput, where?: NomenclatureWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyNomenclature1Cs: (args: { where?: Nomenclature1CWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyPartner1Cs: (args: { where?: Partner1CWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyCompanies: (args: { where?: CompanyWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyUsers: (args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyContactDetails: (args: { where?: ContactDetailWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyLeads: (args: { where?: LeadWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyLeadStates: (args: { where?: LeadStateWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyColors: (args: { where?: ColorWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyClients: (args: { where?: ClientWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyOrders: (args: { where?: OrderWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyOrderPositionses: (args: { where?: OrderPositionsWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyCurrencies: (args: { where?: CurrencyWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyNomenclatures: (args: { where?: NomenclatureWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
}

export type Subscription = {
  nomenclature1C: (args: { where?: Nomenclature1CSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<Nomenclature1CSubscriptionPayload>>
  partner1C: (args: { where?: Partner1CSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<Partner1CSubscriptionPayload>>
  company: (args: { where?: CompanySubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<CompanySubscriptionPayload>>
  user: (args: { where?: UserSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<UserSubscriptionPayload>>
  contactDetail: (args: { where?: ContactDetailSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<ContactDetailSubscriptionPayload>>
  lead: (args: { where?: LeadSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<LeadSubscriptionPayload>>
  leadState: (args: { where?: LeadStateSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<LeadStateSubscriptionPayload>>
  color: (args: { where?: ColorSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<ColorSubscriptionPayload>>
  client: (args: { where?: ClientSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<ClientSubscriptionPayload>>
  order: (args: { where?: OrderSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<OrderSubscriptionPayload>>
  orderPositions: (args: { where?: OrderPositionsSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<OrderPositionsSubscriptionPayload>>
  currency: (args: { where?: CurrencySubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<CurrencySubscriptionPayload>>
  nomenclature: (args: { where?: NomenclatureSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<NomenclatureSubscriptionPayload>>
}

export class Prisma extends BasePrisma {
  
  constructor({ endpoint, secret, fragmentReplacements, debug }: BasePrismaOptions) {
    super({ typeDefs, endpoint, secret, fragmentReplacements, debug });
  }

  exists = {
    Nomenclature1C: (where: Nomenclature1CWhereInput): Promise<boolean> => super.existsDelegate('query', 'nomenclature1Cs', { where }, {}, '{ id }'),
    Partner1C: (where: Partner1CWhereInput): Promise<boolean> => super.existsDelegate('query', 'partner1Cs', { where }, {}, '{ id }'),
    Company: (where: CompanyWhereInput): Promise<boolean> => super.existsDelegate('query', 'companies', { where }, {}, '{ id }'),
    User: (where: UserWhereInput): Promise<boolean> => super.existsDelegate('query', 'users', { where }, {}, '{ id }'),
    ContactDetail: (where: ContactDetailWhereInput): Promise<boolean> => super.existsDelegate('query', 'contactDetails', { where }, {}, '{ id }'),
    Lead: (where: LeadWhereInput): Promise<boolean> => super.existsDelegate('query', 'leads', { where }, {}, '{ id }'),
    LeadState: (where: LeadStateWhereInput): Promise<boolean> => super.existsDelegate('query', 'leadStates', { where }, {}, '{ id }'),
    Color: (where: ColorWhereInput): Promise<boolean> => super.existsDelegate('query', 'colors', { where }, {}, '{ id }'),
    Client: (where: ClientWhereInput): Promise<boolean> => super.existsDelegate('query', 'clients', { where }, {}, '{ id }'),
    Order: (where: OrderWhereInput): Promise<boolean> => super.existsDelegate('query', 'orders', { where }, {}, '{ id }'),
    OrderPositions: (where: OrderPositionsWhereInput): Promise<boolean> => super.existsDelegate('query', 'orderPositionses', { where }, {}, '{ id }'),
    Currency: (where: CurrencyWhereInput): Promise<boolean> => super.existsDelegate('query', 'currencies', { where }, {}, '{ id }'),
    Nomenclature: (where: NomenclatureWhereInput): Promise<boolean> => super.existsDelegate('query', 'nomenclatures', { where }, {}, '{ id }')
  }

  query: Query = {
    nomenclature1Cs: (args, info): Promise<Nomenclature1C[]> => super.delegate('query', 'nomenclature1Cs', args, {}, info),
    partner1Cs: (args, info): Promise<Partner1C[]> => super.delegate('query', 'partner1Cs', args, {}, info),
    companies: (args, info): Promise<Company[]> => super.delegate('query', 'companies', args, {}, info),
    users: (args, info): Promise<User[]> => super.delegate('query', 'users', args, {}, info),
    contactDetails: (args, info): Promise<ContactDetail[]> => super.delegate('query', 'contactDetails', args, {}, info),
    leads: (args, info): Promise<Lead[]> => super.delegate('query', 'leads', args, {}, info),
    leadStates: (args, info): Promise<LeadState[]> => super.delegate('query', 'leadStates', args, {}, info),
    colors: (args, info): Promise<Color[]> => super.delegate('query', 'colors', args, {}, info),
    clients: (args, info): Promise<Client[]> => super.delegate('query', 'clients', args, {}, info),
    orders: (args, info): Promise<Order[]> => super.delegate('query', 'orders', args, {}, info),
    orderPositionses: (args, info): Promise<OrderPositions[]> => super.delegate('query', 'orderPositionses', args, {}, info),
    currencies: (args, info): Promise<Currency[]> => super.delegate('query', 'currencies', args, {}, info),
    nomenclatures: (args, info): Promise<Nomenclature[]> => super.delegate('query', 'nomenclatures', args, {}, info),
    nomenclature1C: (args, info): Promise<Nomenclature1C | null> => super.delegate('query', 'nomenclature1C', args, {}, info),
    partner1C: (args, info): Promise<Partner1C | null> => super.delegate('query', 'partner1C', args, {}, info),
    company: (args, info): Promise<Company | null> => super.delegate('query', 'company', args, {}, info),
    user: (args, info): Promise<User | null> => super.delegate('query', 'user', args, {}, info),
    lead: (args, info): Promise<Lead | null> => super.delegate('query', 'lead', args, {}, info),
    leadState: (args, info): Promise<LeadState | null> => super.delegate('query', 'leadState', args, {}, info),
    color: (args, info): Promise<Color | null> => super.delegate('query', 'color', args, {}, info),
    client: (args, info): Promise<Client | null> => super.delegate('query', 'client', args, {}, info),
    order: (args, info): Promise<Order | null> => super.delegate('query', 'order', args, {}, info),
    orderPositions: (args, info): Promise<OrderPositions | null> => super.delegate('query', 'orderPositions', args, {}, info),
    currency: (args, info): Promise<Currency | null> => super.delegate('query', 'currency', args, {}, info),
    nomenclature: (args, info): Promise<Nomenclature | null> => super.delegate('query', 'nomenclature', args, {}, info),
    nomenclature1CsConnection: (args, info): Promise<Nomenclature1CConnection> => super.delegate('query', 'nomenclature1CsConnection', args, {}, info),
    partner1CsConnection: (args, info): Promise<Partner1CConnection> => super.delegate('query', 'partner1CsConnection', args, {}, info),
    companiesConnection: (args, info): Promise<CompanyConnection> => super.delegate('query', 'companiesConnection', args, {}, info),
    usersConnection: (args, info): Promise<UserConnection> => super.delegate('query', 'usersConnection', args, {}, info),
    contactDetailsConnection: (args, info): Promise<ContactDetailConnection> => super.delegate('query', 'contactDetailsConnection', args, {}, info),
    leadsConnection: (args, info): Promise<LeadConnection> => super.delegate('query', 'leadsConnection', args, {}, info),
    leadStatesConnection: (args, info): Promise<LeadStateConnection> => super.delegate('query', 'leadStatesConnection', args, {}, info),
    colorsConnection: (args, info): Promise<ColorConnection> => super.delegate('query', 'colorsConnection', args, {}, info),
    clientsConnection: (args, info): Promise<ClientConnection> => super.delegate('query', 'clientsConnection', args, {}, info),
    ordersConnection: (args, info): Promise<OrderConnection> => super.delegate('query', 'ordersConnection', args, {}, info),
    orderPositionsesConnection: (args, info): Promise<OrderPositionsConnection> => super.delegate('query', 'orderPositionsesConnection', args, {}, info),
    currenciesConnection: (args, info): Promise<CurrencyConnection> => super.delegate('query', 'currenciesConnection', args, {}, info),
    nomenclaturesConnection: (args, info): Promise<NomenclatureConnection> => super.delegate('query', 'nomenclaturesConnection', args, {}, info),
    node: (args, info): Promise<Node | null> => super.delegate('query', 'node', args, {}, info)
  }

  mutation: Mutation = {
    createNomenclature1C: (args, info): Promise<Nomenclature1C> => super.delegate('mutation', 'createNomenclature1C', args, {}, info),
    createPartner1C: (args, info): Promise<Partner1C> => super.delegate('mutation', 'createPartner1C', args, {}, info),
    createCompany: (args, info): Promise<Company> => super.delegate('mutation', 'createCompany', args, {}, info),
    createUser: (args, info): Promise<User> => super.delegate('mutation', 'createUser', args, {}, info),
    createContactDetail: (args, info): Promise<ContactDetail> => super.delegate('mutation', 'createContactDetail', args, {}, info),
    createLead: (args, info): Promise<Lead> => super.delegate('mutation', 'createLead', args, {}, info),
    createLeadState: (args, info): Promise<LeadState> => super.delegate('mutation', 'createLeadState', args, {}, info),
    createColor: (args, info): Promise<Color> => super.delegate('mutation', 'createColor', args, {}, info),
    createClient: (args, info): Promise<Client> => super.delegate('mutation', 'createClient', args, {}, info),
    createOrder: (args, info): Promise<Order> => super.delegate('mutation', 'createOrder', args, {}, info),
    createOrderPositions: (args, info): Promise<OrderPositions> => super.delegate('mutation', 'createOrderPositions', args, {}, info),
    createCurrency: (args, info): Promise<Currency> => super.delegate('mutation', 'createCurrency', args, {}, info),
    createNomenclature: (args, info): Promise<Nomenclature> => super.delegate('mutation', 'createNomenclature', args, {}, info),
    updateNomenclature1C: (args, info): Promise<Nomenclature1C | null> => super.delegate('mutation', 'updateNomenclature1C', args, {}, info),
    updatePartner1C: (args, info): Promise<Partner1C | null> => super.delegate('mutation', 'updatePartner1C', args, {}, info),
    updateCompany: (args, info): Promise<Company | null> => super.delegate('mutation', 'updateCompany', args, {}, info),
    updateUser: (args, info): Promise<User | null> => super.delegate('mutation', 'updateUser', args, {}, info),
    updateLead: (args, info): Promise<Lead | null> => super.delegate('mutation', 'updateLead', args, {}, info),
    updateLeadState: (args, info): Promise<LeadState | null> => super.delegate('mutation', 'updateLeadState', args, {}, info),
    updateColor: (args, info): Promise<Color | null> => super.delegate('mutation', 'updateColor', args, {}, info),
    updateClient: (args, info): Promise<Client | null> => super.delegate('mutation', 'updateClient', args, {}, info),
    updateOrder: (args, info): Promise<Order | null> => super.delegate('mutation', 'updateOrder', args, {}, info),
    updateOrderPositions: (args, info): Promise<OrderPositions | null> => super.delegate('mutation', 'updateOrderPositions', args, {}, info),
    updateCurrency: (args, info): Promise<Currency | null> => super.delegate('mutation', 'updateCurrency', args, {}, info),
    updateNomenclature: (args, info): Promise<Nomenclature | null> => super.delegate('mutation', 'updateNomenclature', args, {}, info),
    deleteNomenclature1C: (args, info): Promise<Nomenclature1C | null> => super.delegate('mutation', 'deleteNomenclature1C', args, {}, info),
    deletePartner1C: (args, info): Promise<Partner1C | null> => super.delegate('mutation', 'deletePartner1C', args, {}, info),
    deleteCompany: (args, info): Promise<Company | null> => super.delegate('mutation', 'deleteCompany', args, {}, info),
    deleteUser: (args, info): Promise<User | null> => super.delegate('mutation', 'deleteUser', args, {}, info),
    deleteLead: (args, info): Promise<Lead | null> => super.delegate('mutation', 'deleteLead', args, {}, info),
    deleteLeadState: (args, info): Promise<LeadState | null> => super.delegate('mutation', 'deleteLeadState', args, {}, info),
    deleteColor: (args, info): Promise<Color | null> => super.delegate('mutation', 'deleteColor', args, {}, info),
    deleteClient: (args, info): Promise<Client | null> => super.delegate('mutation', 'deleteClient', args, {}, info),
    deleteOrder: (args, info): Promise<Order | null> => super.delegate('mutation', 'deleteOrder', args, {}, info),
    deleteOrderPositions: (args, info): Promise<OrderPositions | null> => super.delegate('mutation', 'deleteOrderPositions', args, {}, info),
    deleteCurrency: (args, info): Promise<Currency | null> => super.delegate('mutation', 'deleteCurrency', args, {}, info),
    deleteNomenclature: (args, info): Promise<Nomenclature | null> => super.delegate('mutation', 'deleteNomenclature', args, {}, info),
    upsertNomenclature1C: (args, info): Promise<Nomenclature1C> => super.delegate('mutation', 'upsertNomenclature1C', args, {}, info),
    upsertPartner1C: (args, info): Promise<Partner1C> => super.delegate('mutation', 'upsertPartner1C', args, {}, info),
    upsertCompany: (args, info): Promise<Company> => super.delegate('mutation', 'upsertCompany', args, {}, info),
    upsertUser: (args, info): Promise<User> => super.delegate('mutation', 'upsertUser', args, {}, info),
    upsertLead: (args, info): Promise<Lead> => super.delegate('mutation', 'upsertLead', args, {}, info),
    upsertLeadState: (args, info): Promise<LeadState> => super.delegate('mutation', 'upsertLeadState', args, {}, info),
    upsertColor: (args, info): Promise<Color> => super.delegate('mutation', 'upsertColor', args, {}, info),
    upsertClient: (args, info): Promise<Client> => super.delegate('mutation', 'upsertClient', args, {}, info),
    upsertOrder: (args, info): Promise<Order> => super.delegate('mutation', 'upsertOrder', args, {}, info),
    upsertOrderPositions: (args, info): Promise<OrderPositions> => super.delegate('mutation', 'upsertOrderPositions', args, {}, info),
    upsertCurrency: (args, info): Promise<Currency> => super.delegate('mutation', 'upsertCurrency', args, {}, info),
    upsertNomenclature: (args, info): Promise<Nomenclature> => super.delegate('mutation', 'upsertNomenclature', args, {}, info),
    updateManyNomenclature1Cs: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyNomenclature1Cs', args, {}, info),
    updateManyPartner1Cs: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyPartner1Cs', args, {}, info),
    updateManyCompanies: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyCompanies', args, {}, info),
    updateManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyUsers', args, {}, info),
    updateManyContactDetails: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyContactDetails', args, {}, info),
    updateManyLeads: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyLeads', args, {}, info),
    updateManyLeadStates: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyLeadStates', args, {}, info),
    updateManyColors: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyColors', args, {}, info),
    updateManyClients: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyClients', args, {}, info),
    updateManyOrders: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyOrders', args, {}, info),
    updateManyOrderPositionses: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyOrderPositionses', args, {}, info),
    updateManyCurrencies: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyCurrencies', args, {}, info),
    updateManyNomenclatures: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyNomenclatures', args, {}, info),
    deleteManyNomenclature1Cs: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyNomenclature1Cs', args, {}, info),
    deleteManyPartner1Cs: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyPartner1Cs', args, {}, info),
    deleteManyCompanies: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyCompanies', args, {}, info),
    deleteManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyUsers', args, {}, info),
    deleteManyContactDetails: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyContactDetails', args, {}, info),
    deleteManyLeads: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyLeads', args, {}, info),
    deleteManyLeadStates: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyLeadStates', args, {}, info),
    deleteManyColors: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyColors', args, {}, info),
    deleteManyClients: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyClients', args, {}, info),
    deleteManyOrders: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyOrders', args, {}, info),
    deleteManyOrderPositionses: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyOrderPositionses', args, {}, info),
    deleteManyCurrencies: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyCurrencies', args, {}, info),
    deleteManyNomenclatures: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyNomenclatures', args, {}, info)
  }

  subscription: Subscription = {
    nomenclature1C: (args, infoOrQuery): Promise<AsyncIterator<Nomenclature1CSubscriptionPayload>> => super.delegateSubscription('nomenclature1C', args, {}, infoOrQuery),
    partner1C: (args, infoOrQuery): Promise<AsyncIterator<Partner1CSubscriptionPayload>> => super.delegateSubscription('partner1C', args, {}, infoOrQuery),
    company: (args, infoOrQuery): Promise<AsyncIterator<CompanySubscriptionPayload>> => super.delegateSubscription('company', args, {}, infoOrQuery),
    user: (args, infoOrQuery): Promise<AsyncIterator<UserSubscriptionPayload>> => super.delegateSubscription('user', args, {}, infoOrQuery),
    contactDetail: (args, infoOrQuery): Promise<AsyncIterator<ContactDetailSubscriptionPayload>> => super.delegateSubscription('contactDetail', args, {}, infoOrQuery),
    lead: (args, infoOrQuery): Promise<AsyncIterator<LeadSubscriptionPayload>> => super.delegateSubscription('lead', args, {}, infoOrQuery),
    leadState: (args, infoOrQuery): Promise<AsyncIterator<LeadStateSubscriptionPayload>> => super.delegateSubscription('leadState', args, {}, infoOrQuery),
    color: (args, infoOrQuery): Promise<AsyncIterator<ColorSubscriptionPayload>> => super.delegateSubscription('color', args, {}, infoOrQuery),
    client: (args, infoOrQuery): Promise<AsyncIterator<ClientSubscriptionPayload>> => super.delegateSubscription('client', args, {}, infoOrQuery),
    order: (args, infoOrQuery): Promise<AsyncIterator<OrderSubscriptionPayload>> => super.delegateSubscription('order', args, {}, infoOrQuery),
    orderPositions: (args, infoOrQuery): Promise<AsyncIterator<OrderPositionsSubscriptionPayload>> => super.delegateSubscription('orderPositions', args, {}, infoOrQuery),
    currency: (args, infoOrQuery): Promise<AsyncIterator<CurrencySubscriptionPayload>> => super.delegateSubscription('currency', args, {}, infoOrQuery),
    nomenclature: (args, infoOrQuery): Promise<AsyncIterator<NomenclatureSubscriptionPayload>> => super.delegateSubscription('nomenclature', args, {}, infoOrQuery)
  }
}