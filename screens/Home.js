import React, { useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

//recoil
import { useRecoilState } from 'recoil';
import { quotesState } from '../recoilState'

import { FontAwesome } from "@expo/vector-icons";


export default function Home() {
  /* -------------------------------- constants ------------------------------- */
  const navigation = useNavigation();
  const [quotes, setQuotes] = useRecoilState(quotesState);

  useEffect(() => {
    // Load data from AsyncStorage when component mounts
    retrieveData();
  }, []);

  /* -------------------------------- functions ------------------------------- */
  const retrieveData = async () => {
    try {
      const storedQuotes = await AsyncStorage.getItem("quotes");
      if (storedQuotes !== null) {
        setQuotes(JSON.parse(storedQuotes));
      }
    } catch (error) {
      // Error retrieving data
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={quotes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <FontAwesome
              name="quote-left"
              size={24}
              color="black"
              style={styles.icon}
            />
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteText}>{item.quote}</Text>
              <View style={styles.authorContainer}>
                <Text style={styles.authorText}>- {item.author}</Text>
              </View>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.plusButton} // Apply styles for the cross button
        onPress={() => {
          navigation.navigate("AddQuote");
        }}
      >
        <FontAwesome name="plus" size={50} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0d2477",
  },
  flatList: {
    width: "100%",
  },
  icon: {
    marginRight: 10,
    color: "white",
  },
  quoteContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "column",
  },
  quoteText: {
    color: "white",
    fontSize: 18,
    fontStyle: "italic",
  },
  authorContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  authorText: {
    color: "white",
    fontSize: 16,
    alignSelf: "flex-end", // Align the author text to the right
    width: "100%", // Take the full width available
    textAlign: "right", // Align text to the right within the width
  },
  plusButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 50,

    borderWidth: 1,
    borderColor: "green",
  },
});
