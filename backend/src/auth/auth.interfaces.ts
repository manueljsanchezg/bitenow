import { Role } from "@prisma/client"

export interface registerUserI {
    name: string
    surname: string
    email: string
    password: string
    role: Role
    country: string
    zipCode: string
    address: string
}

export interface loginUserI {
    email: string
    password: string
}