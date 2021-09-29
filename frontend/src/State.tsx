/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useContext, useReducer } from 'react';
import Reducer from './Reducer';
import { ActionType, FiltersInterface, StatePartInterface } from './types';

export interface GlobalState {
    searchData: StatePartInterface[];
    filters: FiltersInterface;
}

export interface Store {
    state: GlobalState;
    dispatch?: React.Dispatch<ActionType>;
}

const defaultState: GlobalState = { searchData: [], filters: {} as FiltersInterface };

export const Context = React.createContext<Store>({ state: defaultState });

export const useStateContext = () => useContext(Context);

export const StateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, defaultState);

    return <Context.Provider value={{ state, dispatch }} children={children} />;
};
