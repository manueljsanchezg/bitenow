import 'dotenv/config'
import { prisma } from './db/db'
import { app } from './app'

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000

const start = async () => {
  try {
    await prisma.$connect()
    console.log(`Prisma connected`)
    app.listen({ port: PORT });
    console.log(`Server running on PORT ${PORT}`)
  } catch (error) {
    console.error("Error al iniciar el servidor:", error)
    process.exit(1)
  }
}

start()