import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { loginUser, logoutUser, registerUser } from "./auth.controller";
import { checkRole, isLoggedIn } from "./auth.middleware";
import { Role } from "@prisma/client";

export default async function authRoutes(fastify: FastifyInstance) {

    fastify.post('/register', registerUser)

    fastify.post('/login', loginUser)
    
    fastify.post('logout', logoutUser)

    fastify.get('/profile/user', {
        preHandler: [
            isLoggedIn,
            checkRole(Role.USER)
        ]
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        const user = request.session.get('user')
        return reply.send(user)
    })

    fastify.get('/profile/admin', {
        preHandler: [
            isLoggedIn,
            checkRole(Role.ADMIN)
        ]
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        const user = request.session.get('user')
        return reply.send(user)
    })

    fastify.get('/profile/owner', {
        preHandler: [
            isLoggedIn,
            checkRole(Role.OWNER)
        ]
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        const user = request.session.get('user')
        return reply.send(user)
    })

}