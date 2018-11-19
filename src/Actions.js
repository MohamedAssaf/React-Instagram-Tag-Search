export const AuthTokenChanged = (AuthToken) => {
    return {
        type: 'authToken',
        payload: AuthToken
    }
}

export const TagsChanged = (tags) =>{
    return {
        type: 'tagsChanged',
        payload: tags
    }
}

export const ToggleSearchMode = () =>{
    return {
        type: 'toggleSearchMode'
    }
}

export const StoreSearchResult = (result) => {
    return {
        type: 'storeSearchResult',
        payload : result
    }
}
