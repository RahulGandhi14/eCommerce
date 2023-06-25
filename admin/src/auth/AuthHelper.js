require('dotenv').config()
const jwt = require('jsonwebtoken')

export const isAuthenticated = () => {
    if (typeof window === 'undefined') return false

    if (localStorage.getItem('user')) {
        let user = JSON.parse(localStorage.getItem('user'))

        try {
            const verifyToken = jwt.verify(
                user.token,
                process.env.REACT_APP_JWT_SECRET
            )
            if (verifyToken) return user
        } catch {
            localStorage.removeItem('user')
            return false
        }
        return false
    }
}
