import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
//fontawesome
import { FontAwesome } from "@expo/vector-icons";
//components
import QuoteList from "./QuoteList";


export default function Home() {
  /* -------------------------------- constants ------------------------------- */
  const navigation = useNavigation();


  return (
    <View style={styles.container}>

      <QuoteList />

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
