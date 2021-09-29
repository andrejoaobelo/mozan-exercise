import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../State';
import StatePart from '../StatePart/StatePart';
import Filters from '../Filters/Filters';
import './HomePage.scss';
import axios from 'axios';
import { ActionTypeName } from '../../Reducer';
import { StatePartInterface } from '../../types';

export const getParts = async (query?: string, type?: string): Promise<any> => {
    return await axios.get('/store/parts', {
        params: {
            query: query,
            type: type,
        },
    });
};

const HomePage: React.FunctionComponent = () => {
    const { state, dispatch } = useStateContext();
    const [types, setTypes] = useState([]);

    const callDispatch = (value: StatePartInterface[]) => {
        dispatch
            ? dispatch({
                  type: ActionTypeName.UPDATE_SEARCH,
                  payload: value,
              })
            : null;
    };

    useEffect(() => {
        const getInitialTypes = async () => {
            const { data } = await axios.get('/store/part-types');

            const options = data.map((typeValue: string) => {
                return { value: typeValue, label: typeValue };
            });

            setTypes(options);
        };

        getInitialTypes();

        const getInitialData = async () => {
            const { data } = await getParts();

            callDispatch(data);
        };

        if (!state.searchData.length) {
            getInitialData();
        }
    }, []);

    const renderedStateParts = state.searchData.map(({ name, type, price }, index) => {
        return <StatePart key={index} name={name} type={type} price={price} isTableCell={true} />;
    });

    return (
        <div className="homepage">
            <Filters types={types} />
            <div className="content">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>{renderedStateParts}</tbody>
                </table>
            </div>
        </div>
    );
};

export default HomePage;
