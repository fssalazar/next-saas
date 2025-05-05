import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { BadRequestError } from './routes/_errors/bad-request-error'
import { UnauthorizedError } from './routes/_errors/unauthorized-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  console.log('Error type:', error.constructor.name)
  console.log('Is ZodError:', error instanceof ZodError)
  console.log('Error details:', error)

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.flatten().fieldErrors,
    })
  }

  // Handle Fastify validation errors from Zod type provider
  if (error.code === 'FST_ERR_VALIDATION' && error.validation) {
    const zodError = error.validation[0]?.message
    if (zodError) {
      return reply.status(400).send({
        message: 'Validation error',
        errors: {
          [error.validation[0].instancePath.slice(1)]: [zodError],
        },
      })
    }
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({ message: error.message })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({ message: error.message })
  }

  console.error(error)
  return reply.status(500).send({ message: 'Internal server error' })
}
