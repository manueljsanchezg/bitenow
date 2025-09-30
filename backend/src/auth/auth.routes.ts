import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { loginUser, logoutUser, registerUser } from "./auth.controller";
import { checkRole, isLoggedIn } from "./auth.middleware";
import { Role } from "@prisma/client";

export default async function authRoutes(fastify: FastifyInstance) {

    fastify.post('/register', registerUser)

    fastify.post('/login', loginUser)
    
    fastify.post('logout', logoutUser)

}