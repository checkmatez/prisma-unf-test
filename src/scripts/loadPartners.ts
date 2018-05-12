import fetch from 'node-fetch'
import { stringify } from 'querystring'
import * as winston from 'winston'

import { Prisma } from '../generated/prisma'
import { IBasicAuth } from '../utils'

const HOST_1C = `http://192.168.1.67`
const PUBLICATION_NAME = `UNF_16_TEST`

async function loadPartners(db: Prisma, { username, password }: IBasicAuth) {
  try {
    const resourceName = `Контрагенты`
    const urlParams = { $format: 'application/json' }
    const url = `${HOST_1C}/${PUBLICATION_NAME}/odata/standard.odata/Catalog_${encodeURIComponent(
      resourceName
    )}?${stringify(urlParams)}`
    const basicAuth = `${username}:${password}`
    const authorization = `Basic ${Buffer.from(basicAuth).toString('base64')}`
    winston.info('authorization', authorization)
    const response = await fetch(url, {
      headers: {
        authorization,
      },
    })
    const result = await response.json()
    winston.info('result', JSON.stringify(result, null, 2))
    if (result[`odata.error`]) {
      winston.error(result[`odata.error`].message.value, result[`odata.error`])
    }

    for (const partner of result.value) {
      const node = {
        refKey: partner.Ref_Key,
        deletionMark: partner.DeletionMark,
        parentKey: null,
        isFolder: partner.IsFolder,
        code: partner.Code,
        description: partner.Description,
      }
      const partnerResult = await db.mutation.upsertPartner1C({
        where: { refKey: partner.Ref_Key },
        create: node,
        update: node,
      })
    }
    winston.info('count = ', result.value.length)
  } catch (error) {
    throw error
  }
}

loadPartners(
  new Prisma({
    endpoint: 'http://localhost:4466/prisma-unf-test/dev', // the endpoint of the Prisma DB service
    secret: 'mysecret123', // specified in database/prisma.yml
    // debug: true, // log all GraphQL queries & mutations
  }),
  { username: `Абдулов`, password: '' }
)
