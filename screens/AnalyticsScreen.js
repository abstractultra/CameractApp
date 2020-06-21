import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
	VictoryChart,
	VictoryLegend,
	VictoryLine,
	VictoryPie
} from 'victory-native';
import { Calendar } from 'react-native-calendars';
import { PieChart } from 'react-native-chart-kit';
import dateFormat from 'dateformat';
import {ButtonGroup} from 'react-native-elements';
import { iOSUIKit } from 'react-native-typography';

const JOY_COLOR = 'orange';
const ANGRY_COLOR = 'red';
const SAD_COLOR = 'lightblue';

const graphicColor = [JOY_COLOR, SAD_COLOR, ANGRY_COLOR];
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 0 }, { y: 100 }];

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

Date.prototype.addDays = function(days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export default function AnalyticsScreen() {
  const [currentMoodData, setCurrentMoodData] = useState(defaultGraphicData);
  const [currentDate, setCurrentDate] = useState(dateFormat(new Date(), "isoDate"));
  const [selectedMoodIndex, setSelectedMoodIndex] = useState(0);
  const [moodGraphData, setMoodGraphData] = useState([]);

  const dateMoodData = useRef({
    [currentDate]: {
			joy: Math.floor(Math.random() * 20),
			sorrow: Math.floor(Math.random() * 3),
			angry: Math.floor(Math.random() * 3)
		}
  });

  function dateDataToPieData(dateData) {
    return Object.keys(dateData).map(mood => {
      const color = mood === 'joy' ? JOY_COLOR : mood === 'angry' ? ANGRY_COLOR : SAD_COLOR;
      return {
        name: '',
        value: dateData[mood],
        color: color
      };
    });
  }

  useEffect(() => {
    const moodData = Object.keys(dateMoodData.current[currentDate]).map(mood => {
      return {
        y: dateMoodData.current[currentDate][mood],
      };
    });
    setCurrentMoodData(moodData);
    // display
  }, [currentDate]);

  useEffect(() => {
    const startingMonth = new Date(currentDate).getMonth();
    const newMoodGraphData = [];
    const mood = ['joy', 'sorrow', 'angry'][selectedMoodIndex];
    let curDate = new Date(currentDate);
    curDate.setDate(1);
    while (curDate.getMonth() === startingMonth) {
      newMoodGraphData.push({
        x: curDate.getDate(),
        y: dateMoodData.current[dateFormat(curDate, "isoDate")][mood]
      });
      curDate = curDate.addDays(1);
    }
    setMoodGraphData(newMoodGraphData);
  }, [selectedMoodIndex, currentDate]);

  function updateIndex(selectedIndex) {
    setSelectedMoodIndex(selectedIndex);
  }

  return (
    <ScrollView style={styles.container}>
			<Text style={styles.title}>Mood Circle for {currentDate}</Text>
			<View style={styles.piContainer}>
      <VictoryPie
        animate={{ easing: 'exp' }}
        data={currentMoodData}
        width={250}
        height={250}
        colorScale={graphicColor}
        innerRadius={50}
				labels={() => null}
      />
				<VictoryLegend
				  width={100}
				  x={0}
					y={60}
				  height={200}
				  title="Legend"
				  centerTitle
				  orientation="vertical"
				  gutter={20}
					colorScale={[ JOY_COLOR, SAD_COLOR, ANGRY_COLOR ]}
				  style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
				  data={[
					  { name: "Joy" }, { name: "Sad" }, { name: "Angry" }
				  ]}
				/>
			</View>
			<Calendar
				onDayPress={(day) => {
					setCurrentDate(day.dateString);
				}}
				onDayLongPress={(day) => {
					setCurrentDate(day.dateString);
				}}
				onMonthChange={(date) => {
					setCurrentDate(date.dateString);
				}}
				hideExtraDays={true}
				firstDay={0}
				hideDayNames={true}
				style={{ width: '100%' }}
				onPressArrowLeft={substractMonth => substractMonth()}
				onPressArrowRight={addMonth => addMonth()}
				dayComponent={({ date, state }) => {
					if (!dateMoodData.current[date.dateString]) {
						dateMoodData.current[date.dateString] = {
							joy: Math.floor(Math.random() * 20),
							sorrow: Math.floor(Math.random() * 3),
							angry: Math.floor(Math.random() * 3)
						};
					}

					return (
						<TouchableOpacity
							onPress={() => {
								setCurrentDate(date.dateString);
							}}
						>
							<View style={{
								height: 50,
								width: 50,
								position: 'relative',
								flex: -1,
								alignItems: 'center',
								justifyContent: 'center'
							}}>
								<View style={StyleSheet.absoluteFill}>
									<PieChart
										data={dateDataToPieData(dateMoodData.current[date.dateString])}
										width={50}
										height={50}
										paddingLeft={12}
										chartConfig={chartConfig}
										hasLegend={false}
										accessor="value"
										backgroundColor="transparent"
									/>
								</View>
								<View style={{
									flex: -1,
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: 15,
									backgroundColor: 'white',
									width: 30,
									height: 30
								}}>
									<Text>{date.day}</Text>
								</View>
							</View>
						</TouchableOpacity>
					)
				}}
			/>
			<ButtonGroup
				buttons={['Joy', 'Sorrow', 'Anger']}
				selectedIndex={selectedMoodIndex}
				onPress={updateIndex}
				containerStyle={{ marginTop: 20 }}
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
          data={moodGraphData}
        />
      </VictoryChart>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
  	marginTop: 20,
    textAlign: 'center',
		...iOSUIKit.largeTitleEmphasized
  },
	container: {
  	flex: 1
	},
	piContainer: {
		flex: -1,
		marginLeft: 15,
		flexDirection: 'row',
		justifyContent: 'flex-start'
	}
});


