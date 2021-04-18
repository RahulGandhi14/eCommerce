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

module.exports = {
    authRequests,
    userDetailRequests,
    productRequests,
    paymentRequests,
    orderRequests
}