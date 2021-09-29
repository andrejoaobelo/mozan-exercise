/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { StatePartInterface } from '../../types';
import { getParts } from '../HomePage/HomePage';
import StatePart from '../StatePart/StatePart';
import './PartPage.scss';

type UrlParams = {
    name: string;
};

const PartPage: React.FunctionComponent = () => {
    const [part, setPart] = useState({} as StatePartInterface);
    const { name } = useParams<UrlParams>();
    const history = useHistory();

    useEffect(() => {
        const getPart = async () => {
            const { data } = await getParts();
            const currentPart = data.filter((part: StatePartInterface) => part.name === name);
            if (currentPart) {
                setPart({ ...part, ...currentPart[0] });
            }
        };

        getPart();
    }, []);

    return (
        <div className="part-page">
            <button className="back-button btn btn-secondary" onClick={() => history.push(`/`)}>
                Back to parts list
            </button>
            <div className="content">
                <StatePart name={part.name} type={part.type} price={part.price} isTableCell={false} />
            </div>
        </div>
    );
};

export default PartPage;
