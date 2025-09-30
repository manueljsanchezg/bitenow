import "dotenv/config"
import fastify, { FastifyReply, FastifyRequest } from "fastify"
import fastifySecureSession from "@fastify/secure-session"
import { Buffer } from "buffer"
import authRoutes from "./auth/auth.routes"
import userRoutes from "./user/user.routes"

export const app = fastify()

app.register(fastifySecureSession, {
    sessionName: 'session',
    cookieName: 'session',
    key: Buffer.from(process.env.SECRET!, 'hex'),
    expiry: 24*60*60,
    cookie: {
        path: '/',
        secure: false,
        httpOnly: true
    }
})

app.register(authRoutes, { prefix: '/api/v1/auth'})
app.register(userRoutes, { prefix: '/api/v1/users'})

app.get('/api/v1/test', async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.send("Ok")
})