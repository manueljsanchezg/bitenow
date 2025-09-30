import { Role } from "@prisma/client"
import { FastifyReply, FastifyRequest } from "fastify"

export const isLoggedIn = async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.session.get('user')

    if(!user) {
        return reply.status(401).send({ error: 'Not authorized' })
    }
}

export const checkRole = (role: Role) => async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.session.get('user')

  if(user.role !== role) {
    return reply.status(403).send({ error: 'Not enough privileges' })
  }
}