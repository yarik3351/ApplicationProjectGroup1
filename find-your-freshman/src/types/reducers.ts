export interface ReducerData {
    currentUser: Record<string, unknown>
}

export type ReduxActionData<T> = {
    type: any
    payload?: T
}

export type ReduxAction<T> = (data: T) => ReduxActionData<T>
