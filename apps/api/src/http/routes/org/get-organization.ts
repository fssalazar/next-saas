import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'

import { NotFoundError } from '../_errors/not-found-error'

export async function getOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug',
      {
        schema: {
          tags: ['organizations'],
          summary: 'Get organizations by slug',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              organization: z.object({
                id: z.string(),
                name: z.string(),
                slug: z.string(),
                domain: z.string().nullable(),
                shouldAttachUsersByDomain: z.boolean(),
                avatarUrl: z.string().nullable(),
                createdAt: z.date(),
                updatedAt: z.date(),
                ownerId: z.string(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params

        const { organization } = await request.getUserMembership(slug)

        if (!organization) {
          throw new NotFoundError('Organization not found')
        }

        return reply.status(200).send({ organization })
      },
    )
}
