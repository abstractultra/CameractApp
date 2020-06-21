import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {VictoryChart, VictoryLine, VictoryPie} from 'victory-native';
import { Calendar } from 'react-native-calendars';
import Pie from 'react-native-pie';

const graphicColor = ['#388087', '#6fb3b8', '#badfe7']; // Colors
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 0 }, { y: 100 }]; // Data
// used
// to make the animate prop work

const moodCount = {
  joy: 10,
  angry: 5,
  sad: 62,
  surprised: 1
};

export default function AnalyticsScreen() {
  const [graphicData, setGraphicData] = useState(defaultGraphicData);
  const [, refresh] = useState(null);

  useEffect(() => {
    const moodData = Object.keys(moodCount).map(mood => {
      return {
        y: moodCount[mood],
      };
    })
    setGraphicData(moodData);
    // display
  }, []);



  return (
    <ScrollView style={{ flex: 1 }}>
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
      <Calendar
        onDayPress={(day) => {console.log(day)}}
        onDayLongPress={(day) => {console.log('selected day', day)}}
        onMonthChange={(month) => {console.log('month changed', month)}}
        hideExtraDays={true}
        firstDay={0}
        hideDayNames={true}
        onPressArrowLeft={substractMonth => substractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        disableAllTouchEventsForDisabledDays={true}
				dayComponent={({ date, state }) => {
				  return (
            <View style={{
              height: 50,
              width: 50,
              position: 'relative',
              flex: -1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <View style={StyleSheet.absoluteFill}>
                <Pie
									radius={50}
									sections={[
                    {
                      percentage: 15,
                      color: 'orange'
                    },
                    {
                      percentage: 35,
                      color: 'blue',
                    },
                    {
                      percentage: 50,
                      color: 'green'
                    }
                  ]}
                />
              </View>
              <Text>{ date.day }</Text>
            </View>
          )
        }}
      />
    </ScrollView>
  );
}
