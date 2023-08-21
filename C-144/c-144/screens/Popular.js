import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ImageBackground
} from "react-native";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";
import Star from "react-native-star-view";

export default class PopularScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      ngrok_url: ""
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const response = await axios.get(`${this.state.ngrok_url}/api/articles`);
      this.setState({ data: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  keyExtractor = (item, index) => item.id.toString();

  renderItem = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <ImageBackground
          source={{ uri: item.posterImage }}
          style={styles.posterImage}
        >
          <View style={styles.movieTitleContainer}>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Star
              score={item.rating}
              style={styles.starStyle}
              emptyStarColor="white"
            />
          </View>
        </ImageBackground>
      </View>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/bg.png")}
          style={{ flex: 1 }}
        >
          <FlatList
            data={data}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
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
  cardContainer: {
    width: RFValue(280),
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: RFValue(10),
    margin: RFValue(10),
    padding: RFValue(10),
    borderColor: "#182854",
    borderWidth: RFValue(2),
  },
  posterImage: {
    flex: 1,
    borderRadius: RFValue(10),
  },
  title: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    color: "#182854",
    fontFamily: "monospace",
    marginVertical: RFValue(5),
  },
  subtitle: {
    fontSize: RFValue(10),
    fontWeight: "bold",
    color: "white",
    fontFamily: "monospace",
    marginVertical: RFValue(2),
  },
  movieTitleContainer: {
    position: "absolute",
    backgroundColor: "#3c8ed9",
    opacity: 0.7,
    padding: RFValue(10),
    bottom: RFValue(10),
    left: RFValue(10),
    borderRadius: RFValue(10),
  },
  starStyle: {
    width: RFValue(200),
    height: RFValue(40),
  },
});