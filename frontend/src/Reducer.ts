import { ActionType, GlobalStateInterface } from './types';

export enum ActionTypeName {
    UPDATE_SEARCH = 'Update search',
    UPDATE_FILTERS = 'Update filters'
}

const Reducer = (state: GlobalStateInterface, action: ActionType): any => {
    switch (action.type) {
        case ActionTypeName.UPDATE_SEARCH:
            return {
                ...state,
                searchData: action.payload
            };
        case ActionTypeName.UPDATE_FILTERS:
            return {
                ...state,
                filters: action.payload
            }
        default:
            return state;
    }
};

export default Reducer;