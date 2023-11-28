import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
//recoil
import { useRecoilState } from 'recoil';
import { quotesState } from '../recoilState'

export default function AddQuote() {
  // global states
  const [quotes, setQuotes] = useRecoilState(quotesState);

  //local states
  const [newQuote, setNewQuote] = useState("");
  const [newAuthor, setNewAuthor] = useState("");


  /* -------------------------------- functions ------------------------------- */
  const storeData = async (newData) => {
    try {
      await AsyncStorage.setItem("quotes", JSON.stringify(newData));
    } catch (error) {
      // Error saving data
      console.error(error);
    }
  };

  const addNewQuote = () => {
    const newQuoteItem = {
      quote: newQuote,
      author: newAuthor,
    };

    const updatedQuotes = [...quotes, newQuoteItem];
    setQuotes(updatedQuotes);
    storeData(updatedQuotes);

    // Clear input fields after adding
    setNewQuote("");
    setNewAuthor("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter quote"
        value={newQuote}
        onChangeText={(text) => setNewQuote(text)}
        multiline={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter author"
        value={newAuthor}
        onChangeText={(text) => setNewAuthor(text)}
      />
      <TouchableOpacity style={styles.button} onPress={addNewQuote}>
        <Text style={styles.buttonText}>ENTER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#0d2477",
  },
  input: {
    color: "black",
    height: 40,
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
  },
  textArea: {
    height: 100,
  },
  button: {
    height: 40,
    width: "100%",
    backgroundColor: "#009688",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
