import * as winston from 'winston'

import { Prisma } from '../generated/prisma'

const seed = async (db: Prisma) => {
  const colorRed = await db.mutation.createColor(
    { data: { hexValue: '#ff0000' } },
    '{ id }'
  )
  const colorBlue = await db.mutation.createColor(
    { data: { hexValue: '#0000ff' } },
    '{ id }'
  )
  const colorGreen = await db.mutation.createColor(
    { data: { hexValue: '#00ff00' } },
    '{ id }'
  )
  const leadStateInitial = await db.mutation.createLeadState({
    data: {
      color: { connect: { id: colorRed.id } },
      name: 'начальное состояние',
    },
  })
  const leadStateConverted = await db.mutation.createLeadState({
    data: {
      color: { connect: { id: colorBlue.id } },
      name: 'конвертирован',
    },
  })
  const leadStateProcessing = await db.mutation.createLeadState({
    data: {
      color: { connect: { id: colorGreen.id } },
      name: 'в обработке',
    },
  })
}

seed(
  new Prisma({
    endpoint: 'http://localhost:4466/prisma-unf-test/dev', // the endpoint of the Prisma DB service
    secret: 'mysecret123', // specified in database/prisma.yml
    // debug: true, // log all GraphQL queries & mutations
  })
)
