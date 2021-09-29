import { Dispatch } from 'react';

export enum SortType {
    ASC = 'ascendent order',
    DESC = 'descedent order',
    ORIGIN = 'original'
}

export interface StatePartInterface {
    name: string;
    type: string;
    price: string;
}

export interface FiltersInterface {
    search: string;
    type: string;
    sortType: SortType;
}

export interface GlobalStateInterface {
    searchData: StatePartInterface[];
}

export interface TypeOptionInterface {
    label: string;
    value: string;
}

export type ActionType = {
    type: string;
    payload?: any;
};

export type ContextType = {
    globalState: GlobalStateInterface;
    dispatch: Dispatch<ActionType>;
};