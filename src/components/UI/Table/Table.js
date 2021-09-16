import React from 'react';
import Thead from './Thead';
import Tbody from './Tbody';
import Styles from './Styles';

const Table = ({ 
    headConfigs,
    data,
    RowsComponent
}) => {
    return (
        <>
            <table className={`fs-12 content-table ${!data.length && 'table-no-data'}`}>
                <Thead headConfigs={headConfigs}/>
                <Tbody 
                    data={data}
                    RowsComponent={RowsComponent}
                />
                <Styles /> 
            </table>  
        </>
    )
}

export default Table;