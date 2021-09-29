import React, { useEffect, useState } from 'react';
import { ActionTypeName } from '../../Reducer';
import { useStateContext } from '../../State';
import { FiltersInterface, SortType, StatePartInterface, TypeOptionInterface } from '../../types';
import DropdownButton from '../DropdownButton/DropdownButton';
import { getParts } from '../HomePage/HomePage';
import SearchBar from '../SearchBar/SearchBar';
import SortButton, { defaultSortType } from '../SortButton/SortButton';
import './Filters.scss';

type Props = {
    types: TypeOptionInterface[];
};

const typeDropdownPlaceholder = 'Select a type';

const Filters: React.FC<Props> = ({ types }) => {
    const [isMounted, setIsMounted] = useState(true);
    const { state, dispatch } = useStateContext();

    const callDispatch = (value: FiltersInterface, type: ActionTypeName) => {
        dispatch
            ? dispatch({
                  type: type,
                  payload: value,
              })
            : null;
    };

    const updateGlobalSearch = (value: string) => {
        const newFilters: FiltersInterface = { ...state.filters };

        newFilters.search = value;

        callDispatch(newFilters, ActionTypeName.UPDATE_FILTERS);
    };

    const updateGlobalType = (value: string) => {
        const newFilters: FiltersInterface = { ...state.filters };

        newFilters.type = value;

        callDispatch(newFilters, ActionTypeName.UPDATE_FILTERS);
    };

    const updateGlobalSortType = (value: SortType) => {
        const newFilters: FiltersInterface = { ...state.filters };

        newFilters.sortType = value;
        callDispatch(newFilters, ActionTypeName.UPDATE_FILTERS);
    };

    useEffect(() => {
        const search = async () => {
            let { data } = await getParts(state.filters.search, state.filters.type);

            if (data.length && state.filters.sortType !== defaultSortType) {
                data = data.sort(function (a: StatePartInterface, b: StatePartInterface) {
                    return state.filters.sortType === SortType.ASC
                        ? parseFloat(a.price) < parseFloat(b.price)
                            ? -1
                            : 1
                        : parseFloat(a.price) > parseFloat(b.price)
                        ? -1
                        : 1;
                });
            }

            callDispatch(data, ActionTypeName.UPDATE_SEARCH);
        };

        if (!isMounted) {
            search();
        }

        setIsMounted(false);
    }, [state.filters]);

    return (
        <div className="filters">
            <div className="filter">
                <SearchBar onSearchChange={updateGlobalSearch} />
            </div>
            <div className="filter">
                <DropdownButton
                    options={types}
                    onSelectedChange={updateGlobalType}
                    placeholder={typeDropdownPlaceholder}
                />
            </div>
            <div className="filter">
                <SortButton onClickChange={updateGlobalSortType} />
            </div>
        </div>
    );
};

export default Filters;
