import React from 'react';

export function RowComponent(props) {
    const {data, onClick} = props;

    function handleClick() {
        onClick(data);
    }

    return (
        <tr onClick={handleClick}>
            <td data-title="Date">{data.date}</td>
            <td data-title="City">{data.city}</td>
            <td data-title="Country">{data.state}</td>
        </tr>
    );
}