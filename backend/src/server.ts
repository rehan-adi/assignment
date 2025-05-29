import cors from "cors";
import cookie from "cookie";
import morgan from "morgan";
import express from "express";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { verifyToken } from "./utils/token.js";
import { fetchProductsData } from "./utils/getData.js";
import { authTypeDefs } from "./graphql/typeDefs/auth.js";
import { authResolvers } from "./graphql/resolvers/auth.js";
import type { Application, Request, Response } from "express";
import { productTypeDefs } from "./graphql/typeDefs/product.js";
import { productResolvers } from "./graphql/resolvers/product.js";

export type Context = {
    token?: string | string[];
    user?: { email: string } | null;
    req: Request;
    res: Response;
};

async function main() {

    const app: Application = express()

    // Middleware
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }));
    app.use(morgan('dev'))
    app.use(express.json())

    const server = new ApolloServer({
        typeDefs: [authTypeDefs, productTypeDefs],
        resolvers: [authResolvers, productResolvers],
        introspection: true,
    })

    await server.start()

    app.use(
        "/graphql",
        expressMiddleware(server, {
            context: async ({ req, res }): Promise<Context> => {
                let token: string | undefined;

                const authHeader = req.headers.authorization;
                if (authHeader?.startsWith("Bearer ")) {
                    token = authHeader.split(" ")[1];
                }

                if (!token && req.headers.cookie) {
                    const cookies = cookie.parse(req.headers.cookie);
                    token = cookies.token;
                }

                const user = token ? verifyToken(token) : null;

                return { token, user, req, res };
            },
        })
    );


    app.get("/api/v1/health", (req, res) => {
        res.status(200).json({ message: "Server is up and running" })
    })

    await fetchProductsData()

    app.listen(4000, () => {
        console.log('Server is running on port 4000')
    })
}


main()