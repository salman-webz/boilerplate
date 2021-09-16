import React from 'react';

const Tbody = ({
    data,
    RowsComponent
}) => {

    return (
        <tbody>
            <RowsComponent data={data}/>
        </tbody>
    )
}

export default Tbody;