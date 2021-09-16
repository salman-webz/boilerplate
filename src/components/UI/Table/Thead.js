import React from 'react';

const Thead = ({headConfigs}) => {
    return (
        <thead className="bg-primary">
            <tr className="text-left color-white capitalize fw-500">
                {headConfigs.map((item, i) => {
                    return (
                        <th key={i} style={{width: item.width}} colSpan={item.colSpan && '2'}>{item.title}</th>
                    )
                })}
            </tr>
        </thead>
    )
}

export default Thead;