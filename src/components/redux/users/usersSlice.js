export const StatusUsers = {
    NORMAL: 'normal',
    SUCCESS: 'success',
    LOADING: 'loading',
}

const users = JSON.parse(localStorage.getItem('users'))

const initialState = {
    search: users?.search ?? '',
    currPage: users?.currPage ?? 1,
    pageSize: users?.pageSize ?? 10,
    count: users?.count ?? 0,
    data: users?.data ? users.data.slice((users.currPage - 1) * users.pageSize, users.currPage * users.pageSize) : [],
    errors: [],
    status: StatusUsers.NORMAL
}

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case 'users/get': {
            return {
                ...state,
                status: StatusUsers.LOADING
            }
        }
        case 'users/add': {
            return {
                ...state,
                status: StatusUsers.LOADING
            }
        }
        case 'users/modify': {
            return {
                ...state,
                status: StatusUsers.LOADING
            }
        }
        case 'users/remove': {
            return {
                ...state,
                status: StatusUsers.LOADING
            }
        }
        case 'users/success': {
            return {
                ...state,
                search: action.payload.search,
                pageSize: action.payload.pageSize,
                currPage: action.payload.currPage,
                count: action.payload.count,
                data: action.payload.data,
                errors: [],
                status: StatusUsers.SUCCESS,
            }
        }
        case 'users/failed': {
            return {
                ...state,
                errors: [{field: action.payload.errorField, message: action.payload.errorMessage}],
            }
        }
        case 'users/finish': {
            return {
                ...state,
                status: StatusUsers.NORMAL,
                errors: []
            }
        }
        default:
            return state
    }
}
