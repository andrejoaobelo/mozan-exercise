/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../State';
import { SortType } from '../../types';
import './SortButton.scss';

const buttonLabel = 'Price Order';
const sortTypes = Object.entries(SortType);
export const defaultSortType = SortType.ORIGIN;

type Props = {
    onClickChange: (value: SortType) => void;
};

const SortButton: React.FunctionComponent<Props> = ({ onClickChange }) => {
    const { state } = useStateContext();
    const globalSortType = state.filters.sortType;
    const initialState = globalSortType && globalSortType !== defaultSortType ? globalSortType : defaultSortType;

    const [sortType, setSortType] = useState(initialState);

    useEffect(() => {
        onClickChange(sortType);
    }, [sortType]);

    const onSortClick = () => {
        const currentIndex = sortTypes.findIndex((element) => element[1] === sortType);
        const newIndex = currentIndex + 1 === sortTypes.length ? 0 : currentIndex + 1;

        setSortType(sortTypes[newIndex][1]);
        onClickChange(sortType);
    };

    const getSortIconClassName = () => {
        return sortType === SortType.ASC
            ? 'ri-arrow-up-line'
            : sortType === SortType.DESC
            ? 'ri-arrow-down-line'
            : 'ri-subtract-line';
    };

    return (
        <button className="sort-button btn btn-outline-primary" onClick={() => onSortClick()}>
            {buttonLabel}
            {sortType ? <span className={`sort-icon ${getSortIconClassName()}`}></span> : '-'}
        </button>
    );
};

export default SortButton;
