const INITIAL_STATE = {
    authToken : '',
    tags : '',
    searchMode : false,
    searchResult : {}
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'authToken':
            return {...state, authToken : action.payload }
        case 'tagsChanged':
            return {...state, tags: action.payload}
        case 'toggleSearchMode' : 
            return {...state, searchMode : !state.searchMode}
        case 'storeSearchResult' : 
            return {...state, searchResult : action.payload}
        default:
            return state;
    }
}