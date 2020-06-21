import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import {VictoryChart, VictoryLine, VictoryPie} from 'victory-native';

const graphicColor = ['#388087', '#6fb3b8', '#badfe7']; // Colors
const wantedGraphicData = [{ y: 10 }, { y: 50 }, { y: 40 }]; // Data that we want to display
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }]; // Data used to make the animate prop work

export default function AnalyticsScreen() {
  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useEffect(() => {
    setGraphicData(wantedGraphicData); // Setting the data that we want to
    // display
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <VictoryPie
        animate={{ easing: 'exp' }}
        data={graphicData}
        width={250}
        height={250}
        colorScale={graphicColor}
        innerRadius={50}
      />
      <VictoryChart>
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 }
          ]}
        />
      </VictoryChart>
    </View>
  );
}
