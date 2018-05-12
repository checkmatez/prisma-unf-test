import fetch from 'node-fetch'
import { stringify } from 'querystring'
import * as winston from 'winston'

import { Prisma } from '../generated/prisma'
import { IBasicAuth } from '../utils'

const HOST_1C = `http://192.168.1.67`
const PUBLICATION_NAME = `UNF_16_TEST`

const typeToKindMapper = {
  АдресЭлектроннойПочты: 'EMAIL',
  Телефон: 'PHONE',
  Адрес: 'ADDRESS',
}

async function loadPartnersCI(db: Prisma, { username, password }: IBasicAuth) {
  try {
    const resourceName = `Контрагенты`
    const suffixName = 'КонтактнаяИнформация'
    const urlParams = { $format: 'application/json' }
    const url = `${HOST_1C}/${PUBLICATION_NAME}/odata/standard.odata/Catalog_${encodeURIComponent(
      resourceName
    )}_${encodeURIComponent(suffixName)}?${stringify(urlParams)}`
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
    for (const CI of result.value) {
      const node = {
        kind: typeToKindMapper[CI.Тип],
        value: CI.Представление,
        lineNumber: parseInt(CI.LineNumber, 10),
      }

      const found = await db.mutation.updateManyContactDetails({
        where: { owner: { refKey: CI.Ref_Key }, lineNumber: CI.LineNumber },
        data: node,
      })
      if (parseInt(found.count, 10) === 0) {
        await db.mutation.createContactDetail({
          data: { ...node, owner: { connect: { refKey: CI.Ref_Key } } },
        })
      }
    }
    winston.info('count = ', result.value.length)
  } catch (error) {
    throw error
  }
}

loadPartnersCI(
  new Prisma({
    endpoint: 'http://localhost:4466/prisma-unf-test/dev', // the endpoint of the Prisma DB service
    secret: 'mysecret123', // specified in database/prisma.yml
    // debug: true, // log all GraphQL queries & mutations
  }),
  { username: `Абдулов`, password: '' }
)
