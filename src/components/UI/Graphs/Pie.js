import React from "react";
import PieChart, {
    Legend,
    Series,
    Tooltip,
    Format,
    Label,
    Connector
} from 'devextreme-react/pie-chart';

const Pie = ({data, centerRender, colorArray}) => {
  return (
    <PieChart
        id="pie"
        type="doughnut"
        palette={colorArray}
        dataSource={data}
        innerRadius={0.7}
        centerRender={centerRender}
        resolveLabelOverlapping={'shift'}
    >
        <Series argumentField="name" valueField="tag_count">
        <Label visible={true} position="outside" backgroundColor="" font={{size: '11', weight: '500'}}>
          <Connector visible={true} width={1}/>
        </Label>
        </Series>
        <Legend visible={false}/>

        <Tooltip enabled={true}>
        <Format format="percent"/>
        </Tooltip>
    </PieChart>
  );
};

export default Pie;
