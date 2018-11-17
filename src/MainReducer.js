const INITIAL_STATE = {
    authToken : ''
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'authToken':
            return {...state, authToken : action.payload }
        default:
            return state;
    }
}