import React, {useEffect, useState} from 'react';
import { Text, View, FlatList } from "react-native";
import { Avatar, ButtonGroup, ListItem } from "react-native-elements";

const initialTasks = [
  [
    {
      name: "Go do something",
    },
    {
      name: "Eat a cookie",
    },
    {
      name: "Go outside",
    },
  ],
  [
    {
      name: "Go do everything",
    },
    {
      name: "Eat a pizza",
    },
    {
      name: "Go to your basement",
    },
  ],
].map((() => {
  let id = 0;
  return function (timeframe) {
    return timeframe.map(task => {
      return { ...task, id: id++ };
    });
  };
})());

export default function ProfileScreen() {
  const [selectedTimeframe, setTimeframe] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState({});

  useEffect(() => {
    setTasks(initialTasks);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ alignItems: "center", padding: 40 }}>
        <Avatar
          rounded
          source={{
            uri:
              "https://media-exp1.licdn.com/dms/image/C4D03AQEUgiIGoubZSg/profile-displayphoto-shrink_200_200/0?e=1598486400&v=beta&t=oh7_PVEMdJXLN7GAbX4GsMskK1Y0aqXa43FtDe6VrDI",
          }}
          size="xlarge"
        />
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Leon Si</Text>
        <Text style={{ fontSize: 15 }}>Streak: 3 🔥</Text>
        <ButtonGroup
          containerStyle={{marginTop: 20, marginBottom: -20 }}
          buttons={["Day", "Week"]}
          onPress={setTimeframe}
          selectedIndex={selectedTimeframe}
        />
      </View>
      <FlatList
        data={tasks[selectedTimeframe]}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            contentContainerStyle={{ paddingLeft: 20 }}
            checkBox={{
              checked: checkedTasks[item.id],
              onPress: () => {
                setCheckedTasks({ ...checkedTasks, [item.id]: !checkedTasks[item.id] });
              }
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        bottomDivider
      />
    </View>
  );
}
