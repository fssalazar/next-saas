import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function requestPasswordRecover(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password/recover',
    {
      schema: {
        tags: ['auth'],
        summary: 'Request password recover',
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        return reply.status(201).send()
      }

      const { id: tokenId } = await prisma.token.create({
        data: {
          type: 'PASSWORD_RECOVER',
          userId: user.id,
        },
      })

      console.log(tokenId)

      return reply.status(201).send()
    },
  )
}
