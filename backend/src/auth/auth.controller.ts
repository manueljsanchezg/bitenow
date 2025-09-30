import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt"
import { registerUserI } from "./auth.interfaces";
import { prisma } from "../db/db";
import { Role } from "@prisma/client";

export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { name, surname, email, password, role, country, zipCode, address } = request.body as registerUserI

        const user = await prisma.user.findUnique({ where: { email } })

        if (user) {
            return reply.status(403).send({ message: "This email is already used" })
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const normalizedRole = (role.toUpperCase() as Role)

        await prisma.user.create({
            data: {
                name,
                surname,
                email,
                password: hashedPassword,
                role: normalizedRole,
                country,
                zipCode,
                address
            }
        })

        return reply.status(201).send({ message: "User created" })
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error", error })
    }
}

export const loginUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { email, password } = request.body as { email: string, password: string }

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return reply.status(401).send({ message: "Invalid email or password " })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return reply.status(403).send({ message: "Invalid email or password" })
        }

        (request.session as any).set('user', { userId: user.id, role: user.role })

        return reply.send({ message: "User logged" })
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error", error })

    }
}

export const logoutUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        request.session.delete()

        return reply.send({ message: "Logged out successfully" })
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error", error })

    }
}