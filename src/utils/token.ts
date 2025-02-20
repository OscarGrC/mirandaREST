import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const signToken = (email: string, password: string) => {
    const token = jwt.sign({
        email,
        password
    }, process.env.TOKEN_SECRET || "undefined", {
        expiresIn: "1w"
    })
    return token;
}

export const verifyToken = (token: string) => {
    try {
        jwt.verify(token, process.env.TOKEN_SECRET || "undefined")
        return true
    } catch (error) {
        return false
    }
}
export const generateHash = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}