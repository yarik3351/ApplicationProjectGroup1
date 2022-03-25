import { ReduxAction } from '../../types/reducers'

export enum DATA_ACTIONS {
    SET_CURRENTUSER = 'dataActions/setCurrentUser'
}

export const setCurrentUser: ReduxAction<string[]> = (currentUser) => {
    return {
        type: DATA_ACTIONS.SET_CURRENTUSER,
        payload: currentUser
    }
}
