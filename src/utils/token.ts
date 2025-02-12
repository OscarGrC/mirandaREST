import jwt from "jsonwebtoken"

export const signToken = (email: string, password: string) => {
    const token = jwt.sign({
        email,
        password
    }, 'Volveran las oscuras golondriñas', {
        expiresIn: "1w"
    })
    return token;
}

export const verifyToken = (token: string) => {
    try {
        jwt.verify(token, 'Volveran las oscuras golondriñas')
        return true
    } catch (error) {
        return false
    }
}