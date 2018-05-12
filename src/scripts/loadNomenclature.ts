import fetch from 'node-fetch'
import { stringify } from 'querystring'
import * as winston from 'winston'

import { Prisma } from '../generated/prisma'
import { IBasicAuth } from '../utils'

winston.configure({
  transports: [new winston.transports.Console({ colorize: true })],
})
winston.cli()

const HOST_1C = `http://192.168.1.67`
const PUBLICATION_NAME = `UNF_16_TEST`

async function loadNomeclature(db: Prisma, { username, password }: IBasicAuth) {
  try {
    const resourceName = encodeURIComponent(`Номенклатура`)
    const url = `${HOST_1C}/${PUBLICATION_NAME}/odata/standard.odata/Catalog_${resourceName}?${stringify(
      { $format: 'application/json;odata=fullmetadata' }
    )}`
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
    for (const nom of result.value) {
      const data = {
        refKey: nom.Ref_Key,
        deletionMark: nom.DeletionMark,
        isFolder: nom.IsFolder,
        code: nom.Code,
        description: nom.Description,
        vendorCode: nom.Артикул,
        dateOfChange: nom.ДатаИзменения,
        parentKey: null,
      }
      const res = await db.mutation.upsertNomenclature1C({
        where: { refKey: nom.Ref_Key },
        create: { ...data },
        update: { ...data },
      })
    }
    winston.info('count = ', result.value.length)
  } catch (error) {
    throw error
  }
}

loadNomeclature(
  new Prisma({
    endpoint: 'http://localhost:4466/prisma-unf-test/dev', // the endpoint of the Prisma DB service
    secret: 'mysecret123', // specified in database/prisma.yml
    debug: true, // log all GraphQL queries & mutations
  }),
  { username: `Абдулов`, password: '' }
)
