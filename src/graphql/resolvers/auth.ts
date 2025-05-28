import { Context } from "../../server.js"
import { db } from "../../database/database.js"
import { generateToken } from "../../utils/token.js"
import { comparePassword, hashPassword } from "../../utils/password.js"

export const authResolvers = {
    Mutation: {
        signup: async (_: any, args: { email: string, username: string, password: string }) => {

            const { email, username, password } = args

            const user = db.some((user) => user.email === email)

            if (user) {
                throw new Error("User already exists")
            }

            const hashedPassword = await hashPassword(password)

            const newUser = {
                email,
                username,
                password: hashedPassword
            }

            db.push(newUser)

            return {
                data: {
                    email,
                    username,
                }
            };
        },
        signin: async (_: any, args: { email: string, password: string }, context: Context) => {

            const { res } = context
            const { email, password } = args

            const user = db.find((user) => user.email === email)

            if (!user) {
                throw new Error("User not found")
            }

            const isPasswordValid = await comparePassword(password, user.password)

            if (!isPasswordValid) {
                throw new Error("Invalid password")
            }

            const token = generateToken(user.email, user.username)

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 72 * 60 * 60 * 1000,
            });

            return {
                token,
                data: {
                    email: user.email,
                    username: user.username,
                }
            }

        }
    }
}