import React, {useEffect, useState} from 'react';
import { Text, View, FlatList } from "react-native";
import { Avatar, ButtonGroup, ListItem } from "react-native-elements";

const initialTasks = [
  [
    {
      name: "Go do something",
			id: 1,
    },
    {
      name: "Eat a cookie",
      id: 2,
    },
    {
      name: "Go outside",
      id: 3,
    },
  ],
  [
    {
      name: "Go do everything",
      id: 4,
    },
    {
      name: "Eat a pizza",
      id: 5,
    },
    {
      name: "Go to your basement",
      id: 6
    },
  ],
];

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
          buttons={["Day", "Week"]}
          onPress={setTimeframe}
          selectedIndex={selectedTimeframe}
        />
      </View>
      <FlatList
        data={tasks[selectedTimeframe]}
        renderItem={({ item }) => (
          <ListItem title={item.task} checkBox={{ checked: checkedTasks[item.id] }} />
        )}
        keyExtractor={(item, index) => index.toString()}
        bottomDivider
      />
    </View>
  );
}
