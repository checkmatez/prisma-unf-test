import { importSchema } from 'graphql-import'
import { GraphQLServer } from 'graphql-yoga'
import * as winston from 'winston'

import { Prisma } from './generated/prisma'
import { IContext } from './utils'

winston.configure({
  transports: [new winston.transports.Console({ colorize: true })],
})

const resolvers = {
  Query: {
    nomenclatures: (parent, { first, skip }, { db }: IContext, info) =>
      db.query.nomenclature1Cs({ first, skip }, info),
    nomenclature: (parent, { id }, { db }: IContext, info) =>
      db.query.nomenclature1C({ where: { id } }, info),
    partners: (parent, { first, skip, isFolder }, { db }: IContext, info) =>
      db.query.partner1CsConnection(
        { first, skip, where: { isFolder }, orderBy: 'description_ASC' },
        info
      ),
    partner: (parent, { id }, { db }: IContext, info) =>
      db.query.partner1C({ where: { id } }, info),
  },
  // Mutation: {
  //   createDraft(parent, { title, text }, context: Context, info) {
  //     return context.db.mutation.createPost({ data: { title, text } }, info)
  //   },
  //   deletePost(parent, { id }, context: Context, info) {
  //     return context.db.mutation.deletePost({ where: { id } }, info)
  //   },
  //   publish(parent, { id }, context: Context, info) {
  //     return context.db.mutation.updatePost(
  //       {
  //         where: { id },
  //         data: { isPublished: true },
  //       },
  //       info
  //     )
  //   },
  // },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      endpoint: 'http://localhost:4466/prisma-unf-test/dev', // the endpoint of the Prisma DB service
      secret: 'mysecret123', // specified in database/prisma.yml
      debug: true, // log all GraphQL queries & mutations
    }),
  }),
})

server.start(() => winston.info('Server is running on http://localhost:4000'))
