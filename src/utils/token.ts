import jwt from "jsonwebtoken"

const JWT_SECRET = "secret"

export const generateToken = (email: string, username: string) => {
    return jwt.sign({ email, username }, JWT_SECRET, { expiresIn: "1h" })
}

export function verifyToken(token: string) {
    if (!token) {
        return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET!);

    return decoded as { email: string };
}