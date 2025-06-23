import { FastifyInstance } from 'fastify'

import { BadRequestError } from './routes/_errors/bad-request-error'
import { UnauthorizedError } from './routes/_errors/unauthorized-error'

type fastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: fastifyErrorHandler = (error, request, reply) => {
  if (error.validation && error.validationContext === 'body') {
    const errors: Record<string, string[]> = {}

    for (const err of error.validation) {
      const field = err.instancePath.replace(/^\//, '')
      if (!errors[field]) errors[field] = []
      errors[field].push(err.message ?? 'Unknown validation error')
    }

    return reply.status(400).send({
      statusCode: 400,
      errors,
      message: 'Validation error',
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      statusCode: 400,
      message: error.message,
    })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      statusCode: 401,
      message: error.message,
    })
  }

  console.error(error)

  return reply.status(500).send({
    statusCode: 500,
    message: 'Internal server error',
  })
}
