const INITIAL_STATE = {
    authToken : '',
    tags : '',
    searchMode : false
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'authToken':
            return {...state, authToken : action.payload }
        case 'tagsChanged':
            return {...state, tags: action.payload}
        case 'toggleSearchMode' : 
            return {...state, searchMode : !state.searchMode}
        default:
            return state;
    }
}