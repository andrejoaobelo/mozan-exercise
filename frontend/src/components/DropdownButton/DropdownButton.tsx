import React, { useEffect, useRef, useState } from 'react';
import { useStateContext } from '../../State';
import './Dropdown.scss';
import { TypeOptionInterface } from '../../types';

type Props = {
    options: TypeOptionInterface[];
    onSelectedChange: (value: string) => void;
    placeholder: string;
};

const DropdownButton: React.FunctionComponent<Props> = ({ options, onSelectedChange, placeholder }) => {
    const { state } = useStateContext();
    const globalType = state.filters.type;
    const initialState = globalType && globalType.length ? globalType : '';

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(initialState);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onBodyClick = (event: any) => {
            if (ref.current?.contains(event.target)) {
                return;
            }

            setOpen(false);
        };

        document.body.addEventListener('click', onBodyClick);

        return () => {
            document.body.removeEventListener('click', onBodyClick);
        };
    }, []);

    useEffect(() => {
        onSelectedChange(selected);
    }, [selected]);

    const onSelect = (option?: TypeOptionInterface) => {
        const value = option ? option.value : '';

        setSelected(value);
    };

    const renderedOptions = options.map((option: TypeOptionInterface) => {
        return (
            <div key={option.value} className="dropdown-item" onClick={() => onSelect(option)}>
                {option.label}
            </div>
        );
    });

    return (
        <div ref={ref} className={`dropdown ${open ? 'show' : ''}`} onClick={() => setOpen(!open)}>
            <button className="btn btn-primary dropdown-toggle" type="button">
                {selected ? selected : 'Select a type'}
            </button>
            <div className={`dropdown-menu ${open ? 'show' : ''}`}>
                <div className="dropdown-item placeholder-item" onClick={() => onSelect()}>
                    {placeholder}
                </div>
                {renderedOptions}
            </div>
        </div>
    );
};

export default DropdownButton;
