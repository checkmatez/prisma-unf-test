import fetch from 'node-fetch'
import { stringify } from 'querystring'
import * as winston from 'winston'

import { Prisma } from '../generated/prisma'
import { IBasicAuth } from '../utils'

const HOST_1C = `http://192.168.1.67`
const PUBLICATION_NAME = `UNF_16_TEST`

async function loadMetadata(db: Prisma, { username, password }: IBasicAuth) {
  try {
    const resourceName = `$metadata`
    const url = `${HOST_1C}/${PUBLICATION_NAME}/odata/standard.odata/${resourceName}?${stringify(
      { $format: 'application/json' }
    )}`
    const basicAuth = `${username}:${password}`
    const authorization = `Basic ${Buffer.from(basicAuth).toString('base64')}`
    winston.info('authorization', authorization)
    const response = await fetch(url, {
      headers: {
        authorization,
        accept: 'application/json',
      },
    })
    console.log(await response.text())
    const result = await response.json()
    winston.info('result', JSON.stringify(result, null, 2))
    if (result[`odata.error`]) {
      winston.error(result[`odata.error`].message.value, result[`odata.error`])
    }
    // const data = {
    //   refKey: result.value[0].Ref_Key,
    //   deletionMark: result.value[0].DeletionMark,
    //   isFolder: result.value[0].IsFolder,
    //   code: result.value[0].Code,
    //   description: result.value[0].Description,
    //   vendorCode: result.value[0].Артикул,
    // }
    // winston.info('data', data)
    // const res = await db.mutation.createNomenclature1C({ data })
    // winston.info('res', res)
  } catch (error) {
    throw error
  }
}

loadMetadata(
  new Prisma({
    endpoint: 'http://localhost:4466/prisma-unf-test/dev', // the endpoint of the Prisma DB service
    secret: 'mysecret123', // specified in database/prisma.yml
    debug: true, // log all GraphQL queries & mutations
  }),
  { username: `Абдулов`, password: '' }
)
