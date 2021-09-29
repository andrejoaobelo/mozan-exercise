/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { useHistory } from 'react-router-dom';
import './StatePart.scss';

type Props = {
    name: string;
    type: string;
    price: string;
    isTableCell: boolean;
};

const StatePart: React.FunctionComponent<Props> = ({ name, type, price, isTableCell }) => {
    const history = useHistory();

    const statePartElement = isTableCell ? (
        <tr className="state-part state-part--table-row" onClick={() => history.push(`part-page/${name}`)}>
            <td className="state-part__name">{name}</td>
            <td className="state-part__name">{type}</td>
            <td className="state-part__name">{price}</td>
        </tr>
    ) : (
        <div className="state-part state-part--detail">
            <div className="detail-info detail-info--name">
                <div className="detail-info__label">Name</div>
                <span className="detail-info__value">{name}</span>
            </div>
            <div className="detail-info detail-info--type">
                <div className="detail-info__label">Type</div>
                <span className="detail-info__value">{type}</span>
            </div>
            <div className="detail-info detail-info--price">
                <div className="detail-info__label">Price</div>
                <span className="detail-info__value">{price}</span>
            </div>
        </div>
    );
    return statePartElement;
};

export default StatePart;
