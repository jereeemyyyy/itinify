import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import createClique from "./createClique";

export default function addFriends() {
  const router = useRouter();
  const [userInput, setUserInput] = useState("");
  const [memberList, setMemberList] = useState<string[]>([]);
  const params = useLocalSearchParams();
  const groupName = Array.isArray(params.groupName)
    ? params.groupName[0]
    : params.groupName;

  const handleAddFriend = () => {
    if (userInput.trim()) {
      setMemberList((prevItem) => [...prevItem, userInput.trim()]);
      setUserInput("");
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.questions}>Who do you want to add</Text>
      <TextInput
        placeholder="Friend"
        onChangeText={setUserInput}
        value={userInput}
        style={styles.answerContainers}
      />
      <Button title="Add Friend" onPress={handleAddFriend} />
      {memberList.length > 0 && (
        <FlatList
          data={memberList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.Friends}>{item}</Text>}
          style={styles.list}
        />
      )}
      <Button
        title="Confirm"
        onPress={async () => {
          try {
            await createClique(groupName, memberList, router);
          } catch (error: any) {
            alert(error.message);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  questions: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: 500,
    paddingTop: 50,
  },
  answerContainers: {
    borderRadius: 5,
    borderWidth: 3,
    height: 50,
    width: 260,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 25,
  },
  Friends: {
    textAlign: "center",
    fontSize: 25,
    backgroundColor: "aquamarine",
    margin: 5,
    borderWidth: 2,
    paddingVertical: 20,
  },
  list: {
    marginTop: 30,
  },
});