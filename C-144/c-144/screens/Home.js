import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
import WebView from "react-native-webview";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      articleDetails: {},
      ngrok_url: "https://b3c2-121-241-7-122.ngrok.io",
    };
  }

  componentDidMount() {
    this.getArticle();
  }

  getArticle = () => {
    const url = this.state.ngrok_url + "/get-article";
    axios
      .get(url)
      .then((response) => {
        let details = response.data.data;
        this.setState({ articleDetails: details });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  likedArticle = () => {
    const url = this.state.ngrok_url + "/liked-article";
    axios
      .get(url)
      .then((response) => {
        this.getArticle();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  unlikedArticle = () => {
    const url = this.state.ngrok_url + "/unliked-article";
    axios
      .get(url)
      .then((response) => {
        this.getArticle();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    const { articleDetails } = this.state;
    const { url } = articleDetails;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/bg.png")}
          style={{ flex: 1 }}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Articles to Read</Text>
            <Icon
              name="chevron-right"
              type="feather"
              color={"white"}
              size={RFValue(30)}
              containerStyle={{ position: "absolute", right: RFValue(5) }}
              onPress={() => {
                this.props.navigation.navigate("Articles");
              }}
            />
          </View>

          <View style={styles.subContainer}>
            <WebView source={{ uri: url }} />

            <View style={styles.iconButtonContainer}>
              <TouchableOpacity onPress={this.likedArticle}>
                <Image
                  style={styles.iconImage}
                  source={require("../assets/like.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.unlikedArticle}>
                <Image
                  style={styles.iconImage}
                  source={require("../assets/dislike.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3D550C",
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(15),
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFValue(18),
    fontFamily: "monospace",
  },
  subContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: RFValue(20),
  },
  iconImage: {
    width: RFValue(50),
    height: RFValue(50),
  },
});