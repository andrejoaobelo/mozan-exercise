import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../State';

type Props = {
    onSearchChange: (value: string) => void;
};

const SearchBar: React.FC<Props> = ({ onSearchChange }) => {
    const { state } = useStateContext();
    const globalSearch = state.filters.search;
    const initialState = globalSearch && globalSearch.length ? globalSearch : '';

    const [searchValue, setSearch] = useState(initialState);

    useEffect(() => {
        const timerId = setTimeout(() => {
            onSearchChange(searchValue);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchValue]);

    return (
        <input className="form-control" type="text" value={searchValue} onChange={(e) => setSearch(e.target.value)} />
    );
};

export default SearchBar;
