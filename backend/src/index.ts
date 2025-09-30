import 'dotenv/config'
import { prisma } from './db/db'
import { app } from './app'
import bcrypt from "bcrypt"

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000

async function seedData() {

  console.log('Deleting data')

  await prisma.orderProduct.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.restaurant.deleteMany()
  await prisma.restaurantCategory.deleteMany()
  await prisma.productCategory.deleteMany()
  await prisma.user.deleteMany()

  console.log('Seeding initial data...')

  // Hasheamos contraseñas
  const pass = await bcrypt.hash('password123', 10)

  // Usuarios
  await prisma.user.createMany({
    data: [
      {
        name: 'User1',
        surname: 'Test',
        email: 'user1@test.com',
        password: pass,
        role: 'USER',
        country: 'ES',
        zipCode: '28001',
        address: 'Address 1'
      },
      {
        name: 'User2',
        surname: 'Test',
        email: 'user2@test.com',
        password: pass,
        role: 'ADMIN',
        country: 'US',
        zipCode: '90210',
        address: 'Address 2'
      },
      {
        name: 'User3',
        surname: 'Test',
        email: 'user3@test.com',
        password: pass,
        role: 'OWNER',
        country: 'IT',
        zipCode: '00184',
        address: 'Address 3'
      }
    ]
  })

  // Categorías de restaurante
  const restCategory = await prisma.restaurantCategory.create({
    data: { name: 'Category 1' }
  })

  // Restaurante de User3 (OWNER)
  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'Restaurant 1',
      description: 'Description Restaurant 1',
      email: 'restaurant1@test.com',
      phone: '+111111111',
      url: 'https://restaurant1.com',
      status: 'ONLINE',
      country: 'IT',
      zipCode: '00184',
      address: 'Address Restaurant 1',
      shippingCosts: 5.0,
      owner: { connect: { email: 'user3@test.com' } },
      category: { connect: { id: restCategory.id } }
    }
  })

  // Categoría de productos
  const prodCategory = await prisma.productCategory.create({
    data: { name: 'Category 1' }
  })

  // Productos del restaurante
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Product 1',
        description: 'Description Product 1',
        price: 10.0,
        categoryId: prodCategory.id,
        restaurantId: restaurant.id
      },
      {
        name: 'Product 2',
        description: 'Description Product 2',
        price: 15.0,
        categoryId: prodCategory.id,
        restaurantId: restaurant.id
      }
    ]
  })

  // Recuperamos productos para usarlos en el pedido
  const productList = await prisma.product.findMany()

  // Pedido de User1 con orderProducts
  const order = await prisma.order.create({
    data: {
      name: 'Order 1',
      description: 'Description Order 1',
      totalPrice: 25.0,
      shippingCosts: 5.0,
      address: 'Address Order 1',
      user: { connect: { email: 'user1@test.com' } },
      orderProducts: {
        create: [
          {
            quantity: 1,
            price: productList[0]!.price,
            product: { connect: { id: productList[0]!.id } }
          },
          {
            quantity: 1,
            price: productList[1]!.price,
            product: { connect: { id: productList[1]!.id } }
          }
        ]
      }
    }
  })

  console.log('Seed data loaded')
}

const start = async () => {
  try {
    await prisma.$connect()
    await seedData()
    console.log(`Prisma connected`)
    app.listen({ port: PORT });
    console.log(`Server running on PORT ${PORT}`)
  } catch (error) {
    console.error("Error al iniciar el servidor:", error)
    process.exit(1)
  }
}

start()