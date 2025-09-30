import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../db/db";


export const getUserProfile = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const user = await prisma.user.findUnique({ 
            where: { 
                id: request.session.get('user').userId
            },
            select: {
                name: true,
                surname: true,
                email: true,
                country: true,
                zipCode: true,
                address: true,
            }
        })

        if(!user) return reply.status(404).send({ message: "User not found" })

        return reply.send(user)
    } catch (error) {
        console.log(error)
        return reply.status(500).send({ message: "Internal Server Error", error })
    }
}