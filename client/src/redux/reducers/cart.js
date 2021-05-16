const initialState = {
    cartProducts: [],
    deliveryAddress: '',
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'addProduct':
            return {
                ...state,
                cartProducts: action.res,
            }
        case 'deliveryAddress':
            return {
                ...state,
                deliveryAddress: action.res,
            }
        default:
            return state
    }
}

export default cartReducer
