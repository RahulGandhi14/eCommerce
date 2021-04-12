const initialState = {
    cartProducts: [],
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'addProduct':
            return {
                ...state,
                cartProducts: action.res
            };
        default:
            return state;
    }
}

export default cartReducer