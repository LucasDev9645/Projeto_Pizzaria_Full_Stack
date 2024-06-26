import { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { AuthContext } from "../contexts/AuthContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useContext(AuthContext);

  function handleLogin() {
    if (email === "" || password === "") {
      return;
    }

    console.log(email);
    console.log(password);
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/Logo.png")} />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite seu Email"
          style={styles.input}
          placeholderTextColor="#f0f0f0"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Digite sua Senha"
          style={styles.input}
          placeholderTextColor="#f0f0f0"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d1d2e",
  },

  logo: {
    marginBottom: 18,
  },

  inputContainer: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 14,
  },

  input: {
    width: "95%",
    height: 40,
    backgroundColor: "#101026",
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: "#FFF",
  },

  button: {
    width: "95%",
    height: 40,
    marginTop: 12,
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#101026",
  },
});
