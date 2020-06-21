import React, { useState } from "react";
import { Text, View, FlatList } from "react-native";
import { Avatar, ButtonGroup, ListItem } from "react-native-elements";

export default function ProfileScreen() {
  const [selectedTimeframe, setTimeframe] = useState(0);
  const tasks = [
    [
      {
        task: "Go do something",
        checked: false,
      },
      {
        task: "Eat a cookie",
        checked: true,
      },
      {
        task: "Go outside",
        checked: false,
      },
    ],
    [
      {
        task: "Go do everything",
        checked: false,
      },
      {
        task: "Eat a pizza",
        checked: true,
      },
      {
        task: "Go to your basement",
        checked: false,
      },
    ],
    [
      {
        task: "Go make a million dollars",
        checked: false,
      },
      {
        task: "Go to MIT",
        checked: true,
      },
      {
        task: "Go to the park",
        checked: false,
      },
    ],
  ];
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
          <ListItem title={item.task} checkBox={{ checked: item.checked }} />
        )}
        keyExtractor={(item, index) => index.toString()}
        bottomDivider
      />
    </View>
  );
}
