export const AuthTokenChanged = (AuthToken) => {
    return {
        type: 'authToken',
        payload: AuthToken
    }
}