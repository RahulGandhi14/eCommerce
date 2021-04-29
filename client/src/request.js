const authRequests = {
    loginUser: "/auth/login",
    register: "/auth/userRegister",
}

const userDetailRequests = {
    address: "/address",
}

const productRequests = {
    product: "/product",
}

const paymentRequests = {
    createPayment: "/stripe/create-payment-intent",
}

const orderRequests = {
    Order: "/order",
}

const wishlistRequests = {
    wishlist: "/wishlist"
}

module.exports = {
    authRequests,
    userDetailRequests,
    productRequests,
    paymentRequests,
    orderRequests,
    wishlistRequests,
}