import { FastifyInstance } from "fastify"
import { isLoggedIn } from "../auth/auth.middleware"
import { getUserProfile } from "./user.controller"


export default async function userRoutes(fastify: FastifyInstance) {



    fastify.get('/profile', {
        preHandler: [
            isLoggedIn,
        ]
    },
        getUserProfile
    )

}