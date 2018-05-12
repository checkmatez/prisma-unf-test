import { Prisma } from './generated/prisma'

export interface IContext {
  db: Prisma
  request: any
}

export interface IBasicAuth {
  username: string
  password: string
}
