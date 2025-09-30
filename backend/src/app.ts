import fastify, { FastifyReply, FastifyRequest } from "fastify"
import fastifySecureSession from "@fastify/secure-session"
import { readFileSync } from "fs"
import path from "path"
import authRoutes from "./auth/auth.routes"

export const app = fastify()

app.register(fastifySecureSession, {
    sessionName: 'session',
    cookieName: 'session',
    key: readFileSync(path.join(__dirname, '..', 'secret-key')),
    expiry: 24*60*60,
    cookie: {
        path: '/',
        secure: false,
        httpOnly: true
    }
})

app.register(authRoutes, { prefix: '/api/v1/auth'})

app.get('/api/v1/test', async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.send("Ok")
})