import jwt from "jsonwebtoken"

export const signToken = (email: string, password: string) => {
    const token = jwt.sign({
        email,
        password
    }, 'Volaran las oscuras golondriñas', {
        expiresIn: "1d"
    })
    return token;
}

export const verifyToken = (token: string) => {
    try {
        jwt.verify(token, 'Volaran las oscuras golondriñas')
        return true
    } catch (error) {
        return false
    }
}