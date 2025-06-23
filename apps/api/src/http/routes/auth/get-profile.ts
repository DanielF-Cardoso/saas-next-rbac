import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import * as z from 'zod/v4'

import { prisma } from '@/lib/prisma'

export async function getProfile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/profile',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Get authenticated user profile',
        response: {
          200: z.object({
            user: z.object({
              id: z.uuid(),
              name: z.string().nullable(),
              email: z.email(),
              avatarUrl: z.url().nullable(),
            }),
          }),
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { sub } = await request.jwtVerify<{ sub: string }>()

      const user = await prisma.user.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
        },
        where: { id: sub },
      })

      if (!user) {
        return reply.status(401).send({ message: 'Unauthorized' })
      }

      return reply.status(200).send({ user })
    },
  )
}
